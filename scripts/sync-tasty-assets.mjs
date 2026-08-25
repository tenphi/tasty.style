import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const tastyRoot = process.env.TASTY_DOCS_ROOT
  ? path.resolve(process.env.TASTY_DOCS_ROOT)
  : path.resolve(ROOT, '..', 'tasty');
const source = path.join(tastyRoot, 'assets');
const destination = path.join(ROOT, 'public', 'assets');

if (!existsSync(source)) {
  throw new Error(
    `Tasty assets not found at ${source}. Clone the package repository next to this one or set TASTY_DOCS_ROOT.`,
  );
}

mkdirSync(destination, { recursive: true });
cpSync(source, destination, { recursive: true });
console.log(`Synced Tasty assets from ${source}.`);
