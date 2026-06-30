/**
 * Prebuilds a hydrated, interactive preview for each pristine playground
 * example so the playground can show it instantly without booting WebContainer.
 *
 * For every example in app/playground/examples/*.tsx:
 *   1. SSR-render it (ServerStyleCollector + renderToString) in an isolated
 *      Node realm configured with the playground's default-config.ts tokens.
 *   2. Emit public/playground/preview/<slug>.html containing the SSR HTML,
 *      the full CSS in <style data-tasty-ssr>, and the rendered class list in
 *      window.__TASTY__ for client hydration.
 *   3. Emit a browser hydration bundle (hydrate.js) that re-uses the Tasty
 *      runtime + the example component to hydrate the iframe interactively.
 *
 * Also emits app/playground/lib/previews.ts with per-slug CSS/HTML output-panel
 * data so those panels render instantly too.
 *
 * Run with: pnpm build:previews
 */
import { build } from 'esbuild';
import { readdirSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const EXAMPLES_DIR = join(ROOT, 'app/playground/examples');
const PREVIEW_SRC = join(ROOT, 'app/playground/preview-src');
const EXAMPLE_MAP_TS = join(PREVIEW_SRC, 'example-map.ts');
const OUT_DIR = join(ROOT, 'public/playground/preview');
const PREVIEWS_TS = join(ROOT, 'app/playground/lib/previews.ts');

function slugOf(filename) {
  return basename(filename, '.tsx').replace(/^\d+-/, '');
}

function varFor(slug) {
  return 'ex_' + slug.replace(/[^a-zA-Z0-9]/g, '_');
}

// 1. Scan examples and generate the example-map (static imports so both the
//    SSR bundle and the browser hydration bundle share one source of truth).
const exampleFiles = readdirSync(EXAMPLES_DIR)
  .filter((f) => f.endsWith('.tsx') && f !== 'icons.tsx')
  .sort();

if (exampleFiles.length === 0) {
  console.error('No .tsx examples found in', EXAMPLES_DIR);
  process.exit(1);
}

const examples = exampleFiles.map((file) => ({
  slug: slugOf(file),
  file,
}));

const mapLines = [
  '// @generated — do not edit by hand. Regenerate with: pnpm build:previews',
  '',
  "import type { ComponentType } from 'react';",
  '',
];
for (const ex of examples) {
  mapLines.push(
    `import * as ${varFor(ex.slug)} from '../examples/${ex.file.replace(/\.\w+$/, '')}';`,
  );
}
mapLines.push('');
mapLines.push(
  `export const exampleSlugs: string[] = [${examples
    .map((e) => JSON.stringify(e.slug))
    .join(', ')}];`,
);
mapLines.push('');
mapLines.push(
  'export const exampleModules: Record<string, { App: ComponentType }> = {',
);
for (const ex of examples) {
  mapLines.push(`  ${JSON.stringify(ex.slug)}: ${varFor(ex.slug)},`);
}
mapLines.push('};');
mapLines.push('');

writeFileSync(EXAMPLE_MAP_TS, mapLines.join('\n'), 'utf-8');

// 2. Clean the output directory.
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

// 3. Build the SSR bundle into a cache dir under node_modules (platform=node,
//    node_modules external so @tenphi/tasty / @tenphi/glaze / react resolve
//    from node_modules at runtime; only local TS/TSX is bundled). The cache
//    dir lives under node_modules so externalized bare imports resolve, and
//    it's excluded from tsconfig/eslint.
const ssrCacheDir = join(ROOT, 'node_modules/.cache/playground-previews');
rmSync(ssrCacheDir, { recursive: true, force: true });
mkdirSync(ssrCacheDir, { recursive: true });
const ssrOut = join(ssrCacheDir, 'ssr-render.mjs');

try {
  await build({
    entryPoints: [join(PREVIEW_SRC, 'ssr-render.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    packages: 'external',
    jsx: 'automatic',
    outfile: ssrOut,
    logLevel: 'warning',
  });

  // 4. Import the SSR bundle and render every example.
  const { renderAll } = await import(ssrOut);
  const results = await renderAll();

  // 5. Build the browser hydration bundle (everything bundled — the iframe
  //    is its own JS realm and can't reach the host's node_modules).
  await build({
    entryPoints: [join(PREVIEW_SRC, 'hydrate.tsx')],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    jsx: 'automatic',
    minify: true,
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    legalComments: 'none',
    define: { 'process.env.NODE_ENV': '"production"' },
    outfile: join(OUT_DIR, 'hydrate.js'),
    logLevel: 'warning',
  });

  // 6. Emit one static HTML file per non-liveOnly example.
  let emitted = 0;
  let liveOnly = 0;
  for (const ex of examples) {
    const r = results[ex.slug];
    if (!r || r.liveOnly) {
      liveOnly++;
      continue;
    }
    const classListJson = JSON.stringify(r.classList).replace(/</g, '\\u003c');
    const doc = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<style data-tasty-ssr>${r.css}</style>
<script>window.__TASTY__ = ${classListJson};</script>
<script>window.__PLAYGROUND_SLUG__ = ${JSON.stringify(r.slug)};</script>
<script type="module" src="/playground/preview/hydrate.js"></script>
</head>
<body>
<div id="app">${r.html}</div>
</body>
</html>`;
    writeFileSync(join(OUT_DIR, `${ex.slug}.html`), doc, 'utf-8');
    emitted++;
  }

  // 7. Emit app/playground/lib/previews.ts (instant output-panel data).
  const previewLines = [
    '// @generated — do not edit by hand. Regenerate with: pnpm build:previews',
    '',
    "import type { CssSections } from './reorder-css';",
    '',
    'export interface PreviewData {',
    '  cssSections: CssSections;',
    '  htmlOutput: string;',
    '  liveOnly: boolean;',
    '}',
    '',
    'export const PREVIEWS: Record<string, PreviewData> = {',
  ];
  for (const ex of examples) {
    const r = results[ex.slug];
    const data = {
      cssSections: r
        ? r.cssSections
        : { elements: '', tokens: '', utility: '' },
      htmlOutput: r ? r.htmlOutput : '',
      liveOnly: r ? r.liveOnly : true,
    };
    previewLines.push(`  ${JSON.stringify(ex.slug)}: ${JSON.stringify(data)},`);
  }
  previewLines.push('};');
  previewLines.push('');
  writeFileSync(PREVIEWS_TS, previewLines.join('\n'), 'utf-8');

  try {
    execSync(`npx prettier --write "${PREVIEWS_TS}" "${EXAMPLE_MAP_TS}"`, {
      stdio: 'ignore',
    });
  } catch {
    // Prettier not available — skip formatting
  }

  console.log(
    `Previews: ${emitted} static, ${liveOnly} live-only, ${examples.length} total.`,
  );
  console.log(`  HTML -> ${OUT_DIR}`);
  console.log(`  data  -> ${PREVIEWS_TS}`);
} finally {
  rmSync(ssrCacheDir, { recursive: true, force: true });
}
