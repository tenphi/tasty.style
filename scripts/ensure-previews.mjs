/**
 * Generates app/playground/lib/previews.ts if it is missing.
 *
 * previews.ts is generated (and gitignored) but imported by
 * app/playground/components/PlaygroundClient.tsx, so a fresh clone cannot
 * typecheck or lint until the previews build has run once. `predev` and
 * `prebuild` already cover `pnpm dev` / `pnpm build`; this covers bare
 * `pnpm lint` and `pnpm typecheck` without paying for a rebuild every time.
 *
 * Use `pnpm build:previews` to force a regeneration.
 */
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PREVIEWS_TS = join(ROOT, 'app/playground/lib/previews.ts');

if (existsSync(PREVIEWS_TS)) {
  process.exit(0);
}

console.log('previews.ts missing — running build:previews…');
execFileSync(
  process.execPath,
  [join(ROOT, 'scripts/build-playground-previews.mjs')],
  {
    cwd: ROOT,
    stdio: 'inherit',
  },
);
