import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const EXAMPLES_DIR = join(ROOT, 'app/playground/examples');
const OUTPUT_FILE = join(ROOT, 'app/playground/lib/examples.ts');

const files = readdirSync(EXAMPLES_DIR)
  .filter((f) => f.endsWith('.tsx') && f !== 'icons.tsx')
  .sort();

if (files.length === 0) {
  console.error('No .tsx files found in', EXAMPLES_DIR);
  process.exit(1);
}

const CONFIG_FILE = join(EXAMPLES_DIR, 'default-config.ts');
const ICONS_FILE = join(EXAMPLES_DIR, 'icons.tsx');
const defaultConfig = readFileSync(CONFIG_FILE, 'utf-8');
const iconsCode = readFileSync(ICONS_FILE, 'utf-8');

function fileToSlugAndLabel(filename) {
  const raw = basename(filename, '.tsx');
  const slug = raw.replace(/^\d+-/, '');
  const label = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return { slug, label };
}

const examples = files
  .map((file) => {
    const { slug, label } = fileToSlugAndLabel(file);
    const code = readFileSync(join(EXAMPLES_DIR, file), 'utf-8');
    return { slug, label, code };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

const lines = [
  '// @generated — do not edit by hand. Edit files in app/playground/examples/ instead.',
  '// Regenerate with: pnpm build:examples',
  '',
  'export interface PlaygroundExample {',
  '  slug: string;',
  '  label: string;',
  '  code: string;',
  '}',
  '',
];

for (const ex of examples) {
  const varName =
    ex.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).toUpperCase() +
    '_CODE';
  lines.push(`const ${varName} = ${JSON.stringify(ex.code)};`);
  lines.push('');
}

lines.push('export const EXAMPLES: PlaygroundExample[] = [');
for (const ex of examples) {
  const varName =
    ex.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).toUpperCase() +
    '_CODE';
  lines.push(
    `  { slug: '${ex.slug}', label: '${ex.label}', code: ${varName} },`,
  );
}
lines.push('];');
lines.push('');
lines.push('export const DEFAULT_EXAMPLE = EXAMPLES[0];');
lines.push('');
lines.push(
  'export function findExample(slug: string): PlaygroundExample | undefined {',
);
lines.push('  return EXAMPLES.find((e) => e.slug === slug);');
lines.push('}');
lines.push('');
lines.push(`export const DEFAULT_CONFIG = ${JSON.stringify(defaultConfig)};`);
lines.push('');
lines.push(`export const ICONS_CODE = ${JSON.stringify(iconsCode)};`);
lines.push('');

writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf-8');

try {
  execSync(`npx prettier --write "${OUTPUT_FILE}"`, { stdio: 'ignore' });
} catch {
  // Prettier not available — skip formatting
}

console.log(`Generated ${OUTPUT_FILE} with ${examples.length} example(s).`);
