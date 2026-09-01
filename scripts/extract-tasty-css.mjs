/**
 * Extract Tasty's inline Next.js SSR styles into cacheable stylesheets.
 *
 * Tasty 3.6 ships build-wide shared/page extraction for Astro, but its Next.js
 * registry still emits inline styles. Since this site uses Next's static export,
 * the same cascade contract can be applied after `next build`:
 *
 *   1. CSS present on every styled Next page becomes the shared base.
 *   2. Each page's strict remainder becomes its override stylesheet.
 *
 * Generated playground previews are intentionally ignored. They are standalone
 * documents copied from `public/`, not pages emitted by Next's App Router.
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const OUTPUT_DIR = join(process.cwd(), 'out');
const ASSET_PATH = '_next/static/css';
const ASSET_DIR = join(OUTPUT_DIR, ASSET_PATH);
const ASSET_HREF = `/${ASSET_PATH}`;
const NEXT_PAGE_MARKER = 'self.__next_f';
const TASTY_ATTRIBUTE_PATTERN =
  /\bdata-tasty-ssr(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=\s|>)/i;
const STYLE_TAG_PATTERN = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
const GENERATED_ASSET_PATTERN = /^tasty\.(?:shared|page)\.[a-f\d]{12}\.css$/;

async function findHTMLFiles(directory) {
  const paths = [];
  const entries = await readdir(directory, { withFileTypes: true });

  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      paths.push(...(await findHTMLFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      paths.push(path);
    }
  }

  return paths;
}

/**
 * Split generated CSS at top-level rule boundaries.
 *
 * The scanner deliberately understands strings, comments, and nested blocks so
 * braces or semicolons in data URLs and declarations never become boundaries.
 * Keeping each complete top-level rule intact gives us deterministic artifacts
 * without rewriting the CSS itself.
 */
export function splitTopLevelCSS(css) {
  const artifacts = [];
  let blockDepth = 0;
  let comment = false;
  let quote = null;
  let start = 0;

  const append = (end) => {
    const artifact = css.slice(start, end).trim();

    if (artifact) artifacts.push(artifact);
    start = end;
  };

  for (let index = 0; index < css.length; index++) {
    const character = css[index];
    const next = css[index + 1];

    if (comment) {
      if (character === '*' && next === '/') {
        comment = false;
        index++;
      }
      continue;
    }

    if (quote) {
      if (character === '\\') {
        index++;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === '/' && next === '*') {
      comment = true;
      index++;
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === '{') {
      blockDepth++;
    } else if (character === '}') {
      blockDepth--;

      if (blockDepth < 0) {
        throw new Error(
          '[Tasty] Cannot extract malformed CSS: unexpected `}`.',
        );
      }

      if (blockDepth === 0) append(index + 1);
    } else if (character === ';' && blockDepth === 0) {
      append(index + 1);
    }
  }

  if (quote || comment || blockDepth !== 0) {
    throw new Error('[Tasty] Cannot extract malformed or incomplete CSS.');
  }

  append(css.length);

  return artifacts;
}

function skipCSSString(css, start, quote) {
  for (let index = start + 1; index < css.length; index++) {
    if (css[index] === '\\') {
      index++;
    } else if (css[index] === quote) {
      return index + 1;
    }
  }

  return css.length;
}

function decodeCSSEscapes(value) {
  return value.replace(
    /\\(?:([\da-f]{1,6})\s?|\r\n|[\n\r\f]|(.))/gi,
    (_match, hex, escaped) => {
      if (hex) {
        const codePoint = Number.parseInt(hex, 16);

        return codePoint === 0 || codePoint > 0x10ffff
          ? '�'
          : String.fromCodePoint(codePoint);
      }

      return escaped ?? '';
    },
  );
}

function readCSSIdentifier(css, start) {
  let name = '';
  let index = start;

  while (index < css.length) {
    const character = css[index];

    if (/[-_a-z\d]/i.test(character) || character.charCodeAt(0) >= 128) {
      name += character;
      index++;
      continue;
    }

    if (character !== '\\' || index + 1 >= css.length) break;

    const hex = css.slice(index + 1).match(/^[\da-f]{1,6}/i)?.[0];

    if (hex) {
      name += decodeCSSEscapes(`\\${hex}`);
      index += hex.length + 1;
      if (/\s/.test(css[index] ?? '')) index++;
      continue;
    }

    if (/\r|\n|\f/.test(css[index + 1])) break;

    name += css[index + 1];
    index += 2;
  }

  return index === start ? null : { name, end: index };
}

function skipCSSWhitespaceAndComments(css, start) {
  let index = start;

  for (;;) {
    while (/\s/.test(css[index] ?? '')) index++;

    if (css[index] !== '/' || css[index + 1] !== '*') return index;

    const commentEnd = css.indexOf('*/', index + 2);

    if (commentEnd === -1) return css.length;
    index = commentEnd + 2;
  }
}

function relativeCSSResource(rawURL) {
  const url = decodeCSSEscapes(rawURL).trim();

  if (!url || url.startsWith('/') || /^[a-z][a-z\d+.-]*:/i.test(url)) {
    return null;
  }

  return rawURL;
}

/**
 * Find URLs whose target would change when CSS moves from a page to /_next/.
 * This follows the resource-bearing syntax covered by Tasty 3.6's Astro pass.
 */
function findRelativeCSSResource(css) {
  const functionStack = [];
  const stringResourceFunctions = new Set([
    'image',
    'image-set',
    '-webkit-image-set',
    'src',
  ]);

  for (let index = 0; index < css.length; index++) {
    if (css[index] === '/' && css[index + 1] === '*') {
      const commentEnd = css.indexOf('*/', index + 2);

      index = commentEnd === -1 ? css.length : commentEnd + 1;
      continue;
    }

    const quote = css[index];

    if (quote === '"' || quote === "'") {
      const stringEnd = skipCSSString(css, index, quote);

      if (stringResourceFunctions.has(functionStack.at(-1) ?? '')) {
        const unsafe = relativeCSSResource(css.slice(index + 1, stringEnd - 1));

        if (unsafe) return unsafe;
      }

      index = stringEnd - 1;
      continue;
    }

    if (css[index] === ')') {
      functionStack.pop();
      continue;
    }

    if (css[index] === '(') {
      functionStack.push(null);
      continue;
    }

    if (css[index] === '@') {
      const atRule = readCSSIdentifier(css, index + 1);

      if (atRule?.name.toLowerCase() === 'import') {
        const valueStart = skipCSSWhitespaceAndComments(css, atRule.end);
        const importQuote = css[valueStart];

        if (importQuote === '"' || importQuote === "'") {
          const valueEnd = skipCSSString(css, valueStart, importQuote);
          const unsafe = relativeCSSResource(
            css.slice(valueStart + 1, valueEnd - 1),
          );

          if (unsafe) return unsafe;
        }
      }

      continue;
    }

    const identifier = readCSSIdentifier(css, index);

    if (!identifier || css[identifier.end] !== '(') continue;

    const functionName = identifier.name.toLowerCase();

    if (functionName !== 'url') {
      functionStack.push(functionName);
      index = identifier.end;
      continue;
    }

    const valueStart = skipCSSWhitespaceAndComments(css, identifier.end + 1);
    const urlQuote = css[valueStart];
    const quoted = urlQuote === '"' || urlQuote === "'";
    let valueEnd;

    if (quoted) {
      valueEnd = skipCSSString(css, valueStart, urlQuote) - 1;
      index = css.indexOf(')', valueEnd + 1);
    } else {
      valueEnd = valueStart;

      while (valueEnd < css.length && css[valueEnd] !== ')') {
        if (css[valueEnd] === '\\') valueEnd++;
        valueEnd++;
      }

      index = valueEnd;
    }

    if (index === -1) return null;

    const unsafe = relativeCSSResource(
      css.slice(valueStart + (quoted ? 1 : 0), valueEnd),
    );

    if (unsafe) return unsafe;
  }

  return null;
}

function parsePage(path, html) {
  if (!html.includes(NEXT_PAGE_MARKER)) return null;

  const styleTags = [];

  for (const match of html.matchAll(STYLE_TAG_PATTERN)) {
    const tag = match[0];
    const openingEnd = tag.indexOf('>');
    const opening = tag.slice(0, openingEnd + 1);

    if (!TASTY_ATTRIBUTE_PATTERN.test(opening)) continue;

    styleTags.push({
      css: tag.slice(openingEnd + 1, -'</style>'.length),
      opening,
    });
  }

  if (styleTags.length === 0) return null;

  const artifacts = styleTags.flatMap(({ css }) => splitTopLevelCSS(css));
  const relativeResource = artifacts.map(findRelativeCSSResource).find(Boolean);

  if (relativeResource) {
    throw new Error(
      `[Tasty] CSS extraction cannot preserve relative URL "${relativeResource}" in ${relative(OUTPUT_DIR, path)}. Use an absolute, root-relative, or data URL.`,
    );
  }

  return { path, html, artifacts, styleTags };
}

function hashCSS(css) {
  return createHash('sha256').update(css).digest('hex').slice(0, 12);
}

async function writeStylesheet(scope, artifacts) {
  if (artifacts.length === 0) return null;

  const css = artifacts.join('\n');
  const filename = `tasty.${scope}.${hashCSS(css)}.css`;

  await writeFile(join(ASSET_DIR, filename), css);

  return { filename, bytes: Buffer.byteLength(css) };
}

function stylesheetLink(page, filename) {
  const nonce = page.styleTags[0].opening.match(
    /\snonce=(?:"[^"]*"|'[^']*')/i,
  )?.[0];

  return `<link rel="stylesheet" href="${ASSET_HREF}/${filename}" data-tasty-ssr=""${nonce ?? ''}>`;
}

function transformPage(page, stylesheets) {
  let replaced = false;

  return page.html.replace(STYLE_TAG_PATTERN, (tag) => {
    const opening = tag.slice(0, tag.indexOf('>') + 1);

    if (!TASTY_ATTRIBUTE_PATTERN.test(opening)) return tag;
    if (replaced) return '';

    replaced = true;
    return stylesheets
      .map(({ filename }) => stylesheetLink(page, filename))
      .join('');
  });
}

async function removeStaleStylesheets() {
  let entries = [];

  try {
    entries = await readdir(ASSET_DIR, { withFileTypes: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  await Promise.all(
    entries
      .filter(
        (entry) => entry.isFile() && GENERATED_ASSET_PATTERN.test(entry.name),
      )
      .map((entry) => unlink(join(ASSET_DIR, entry.name))),
  );
}

async function extractTastyCSS() {
  const paths = await findHTMLFiles(OUTPUT_DIR);
  const pages = (
    await Promise.all(
      paths.map(async (path) => parsePage(path, await readFile(path, 'utf8'))),
    )
  ).filter(Boolean);

  if (pages.length === 0) {
    console.log('Tasty CSS extraction: no styled Next.js pages found.');
    return;
  }

  const otherArtifactSets = pages
    .slice(1)
    .map(({ artifacts }) => new Set(artifacts));
  const sharedArtifacts =
    pages.length < 2
      ? []
      : pages[0].artifacts.filter((artifact) =>
          otherArtifactSets.every((artifacts) => artifacts.has(artifact)),
        );
  const sharedSet = new Set(sharedArtifacts);

  await mkdir(ASSET_DIR, { recursive: true });
  await removeStaleStylesheets();

  const sharedStylesheet = await writeStylesheet('shared', sharedArtifacts);
  const stylesheetsByContent = new Map();
  let inlineBytes = 0;

  for (const page of pages) {
    inlineBytes += page.styleTags.reduce(
      (total, { css }) => total + Buffer.byteLength(css),
      0,
    );

    const pageArtifacts = page.artifacts.filter(
      (artifact) => !sharedSet.has(artifact),
    );
    const contentKey = pageArtifacts.join('\n');
    let pageStylesheet = stylesheetsByContent.get(contentKey);

    if (pageArtifacts.length > 0 && !pageStylesheet) {
      pageStylesheet = await writeStylesheet('page', pageArtifacts);
      stylesheetsByContent.set(contentKey, pageStylesheet);
    }

    const stylesheets = [sharedStylesheet, pageStylesheet].filter(Boolean);

    await writeFile(page.path, transformPage(page, stylesheets));
  }

  const stylesheetBytes =
    (sharedStylesheet?.bytes ?? 0) +
    [...stylesheetsByContent.values()].reduce(
      (total, { bytes }) => total + bytes,
      0,
    );

  console.log(
    `Tasty CSS extraction: ${pages.length} pages, ${sharedStylesheet?.bytes ?? 0} shared bytes, ${inlineBytes - stylesheetBytes} duplicate inline bytes removed.`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await extractTastyCSS();
}
