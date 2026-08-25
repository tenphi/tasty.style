import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT_DIR = path.join(ROOT, 'out');
const SITE_ORIGIN = 'https://tasty.style';

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = path.join(directory, entry);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

function routeForFile(file) {
  const relative = path.relative(OUT_DIR, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) {
    return `/${relative.slice(0, -'/index.html'.length)}`;
  }
  return `/${relative.slice(0, -'.html'.length)}`;
}

function htmlFileForPath(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '');
  const candidates = decoded
    ? [
        path.join(OUT_DIR, decoded),
        path.join(OUT_DIR, `${decoded}.html`),
        path.join(OUT_DIR, decoded, 'index.html'),
      ]
    : [path.join(OUT_DIR, 'index.html')];

  return candidates.find(
    (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
  );
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

if (!existsSync(OUT_DIR)) {
  throw new Error('Missing out/. Run `pnpm build` before `pnpm check:links`.');
}

const pages = walk(OUT_DIR).filter((file) => file.endsWith('.html'));
const idCache = new Map();
const errors = [];
let checkedLinks = 0;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const route = routeForFile(page);
  const hrefPattern = /<a\b[^>]*\bhref=(?:"([^"]*)"|'([^']*)')[^>]*>/gi;

  for (const match of html.matchAll(hrefPattern)) {
    const href = decodeHtml(match[1] ?? match[2] ?? '').trim();
    if (!href || href === '#' || /^(?:mailto:|tel:|javascript:)/i.test(href)) {
      continue;
    }

    const target = new URL(href, `${SITE_ORIGIN}${route}`);
    if (target.origin !== SITE_ORIGIN) continue;
    checkedLinks += 1;

    if (/\.md$/i.test(target.pathname)) {
      errors.push(`${route}: Markdown URL leaked into output: ${href}`);
      continue;
    }

    const targetFile = htmlFileForPath(target.pathname);
    if (!targetFile) {
      errors.push(`${route}: missing route for ${href}`);
      continue;
    }

    const fragment = decodeURIComponent(target.hash.slice(1));
    if (!fragment) continue;

    let ids = idCache.get(targetFile);
    if (!ids) {
      const targetHtml = readFileSync(targetFile, 'utf8');
      ids = new Set(
        [...targetHtml.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/gi)].map(
          (idMatch) => decodeHtml(idMatch[1] ?? idMatch[2] ?? ''),
        ),
      );
      idCache.set(targetFile, ids);
    }

    if (!ids.has(fragment)) {
      errors.push(`${route}: missing fragment ${href}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} broken internal link(s):`);
  for (const error of [...new Set(errors)].sort()) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Checked ${checkedLinks} internal links across ${pages.length} generated HTML pages.`,
  );
}
