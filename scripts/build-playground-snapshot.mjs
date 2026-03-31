/**
 * Builds a binary WebContainer snapshot of the playground project
 * (including node_modules) so that npm install can be skipped at runtime.
 * This makes the playground work in Safari and speeds up boot everywhere.
 */
import { snapshot } from '@webcontainer/snapshot';
import {
  mkdtempSync,
  writeFileSync,
  readFileSync,
  rmSync,
  existsSync,
  mkdirSync,
  readdirSync,
  lstatSync,
  readlinkSync,
  copyFileSync,
  chmodSync,
  statSync,
} from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = join(__dirname, '..');
const outPath = join(projectRoot, 'public', 'playground-snapshot.bin');
const cacheMetaPath = join(
  projectRoot,
  'public',
  'playground-snapshot.meta.json',
);
const CACHE_VERSION = 1;

const SYNCED_DEPS = ['@tenphi/tasty', '@tenphi/glaze'];

function readSyncedVersions() {
  const pkg = JSON.parse(
    readFileSync(join(projectRoot, 'package.json'), 'utf8'),
  );
  const versions = {};
  for (const name of SYNCED_DEPS) {
    const v = pkg.dependencies?.[name] ?? pkg.devDependencies?.[name];
    if (!v) {
      throw new Error(
        `${name} not found in project package.json — ` +
          'the playground snapshot must stay in sync',
      );
    }
    versions[name] = v;
  }
  return versions;
}

function buildPackageJson() {
  const synced = readSyncedVersions();
  return {
    name: 'tasty-playground',
    private: true,
    type: 'module',
    scripts: { dev: 'vite' },
    dependencies: {
      react: '^19.1.0',
      'react-dom': '^19.1.0',
      ...synced,
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.5.2',
      vite: '^6.3.5',
      'esbuild-wasm': '^0.25.0',
      '@rollup/wasm-node': '^4.60.0',
      typescript: '^5.8.3',
    },
  };
}

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tasty Playground</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

const VITE_CONFIG = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`;

const PRUNE_EXTENSIONS = new Set([
  '.map',
  '.md',
  '.markdown',
  '.txt',
  '.ts',
  '.mts',
  '.cts',
  '.flow',
]);
const PRUNE_NAMES = new Set([
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
  'LICENCE',
  'LICENCE.md',
  'CHANGELOG.md',
  'HISTORY.md',
  'CHANGES.md',
  'README.md',
  'readme.md',
  '.npmignore',
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.json',
  '.prettierrc',
  '.editorconfig',
  'tsconfig.json',
  '.travis.yml',
  'Makefile',
]);

function shouldPrune(name) {
  if (PRUNE_NAMES.has(name)) return true;
  const dot = name.lastIndexOf('.');
  if (dot === -1) return false;
  const ext = name.slice(dot);
  // Keep .d.ts files (type declarations are needed at dev time)
  if (
    name.endsWith('.d.ts') ||
    name.endsWith('.d.mts') ||
    name.endsWith('.d.cts')
  )
    return false;
  return PRUNE_EXTENSIONS.has(ext);
}

const PRUNE_DIRS = new Set(['@esbuild', '@rollup']);

const TS_LIB_PRUNE = new Set([
  '_tsc.js',
  '_tsserver.js',
  '_typingsInstaller.js',
]);
const TS_LIB_LOCALE_DIRS = new Set([
  'cs',
  'de',
  'es',
  'fr',
  'it',
  'ja',
  'ko',
  'pl',
  'pt-br',
  'ru',
  'tr',
  'zh-cn',
  'zh-tw',
]);

function pruneDir(dir, depth = 0) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = lstatSync(fullPath);
    if (stats.isSymbolicLink()) continue;
    if (stats.isDirectory()) {
      if (depth === 0 && PRUNE_DIRS.has(entry)) {
        rmSync(fullPath, { recursive: true, force: true });
        continue;
      }
      pruneDir(fullPath, depth + 1);
    } else if (shouldPrune(entry)) {
      rmSync(fullPath, { force: true });
    }
  }
}

function pruneTypescript(libDir) {
  if (!existsSync(libDir)) return;
  for (const entry of readdirSync(libDir)) {
    const fullPath = join(libDir, entry);
    const stats = lstatSync(fullPath);
    if (stats.isDirectory() && TS_LIB_LOCALE_DIRS.has(entry)) {
      rmSync(fullPath, { recursive: true, force: true });
    } else if (stats.isFile() && TS_LIB_PRUNE.has(entry)) {
      rmSync(fullPath, { force: true });
    }
  }
}

/**
 * Replace symlinks with copies of their targets so @webcontainer/snapshot
 * can serialize the tree (it does not support symlinks).
 */
function resolveSymlinksRecursive(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = lstatSync(fullPath);

    if (stats.isSymbolicLink()) {
      const target = resolve(dir, readlinkSync(fullPath));

      rmSync(fullPath, { force: true });

      if (!existsSync(target)) continue;

      const targetStats = lstatSync(target);
      if (targetStats.isDirectory()) {
        cpDirSync(target, fullPath);
      } else {
        copyFileSync(target, fullPath);
        chmodSync(fullPath, statSync(target).mode);
      }
    } else if (stats.isDirectory()) {
      resolveSymlinksRecursive(fullPath);
    }
  }
}

function cpDirSync(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stats = lstatSync(srcPath);
    if (stats.isSymbolicLink()) {
      const target = resolve(src, readlinkSync(srcPath));
      if (!existsSync(target)) continue;
      const targetStats = lstatSync(target);
      if (targetStats.isDirectory()) {
        cpDirSync(target, destPath);
      } else {
        copyFileSync(target, destPath);
        chmodSync(destPath, targetStats.mode);
      }
    } else if (stats.isDirectory()) {
      cpDirSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
      chmodSync(destPath, stats.mode);
    }
  }
}

function computeSnapshotCacheHash(packageJson) {
  const hash = createHash('sha256');
  hash.update(`cache-version:${CACHE_VERSION}`);
  hash.update(readFileSync(fileURLToPath(import.meta.url), 'utf8'));
  hash.update(JSON.stringify(packageJson));
  hash.update(INDEX_HTML);
  hash.update(VITE_CONFIG);
  hash.update(JSON.stringify([...PRUNE_EXTENSIONS].sort()));
  hash.update(JSON.stringify([...PRUNE_NAMES].sort()));
  hash.update(JSON.stringify([...PRUNE_DIRS].sort()));
  hash.update(JSON.stringify([...TS_LIB_PRUNE].sort()));
  hash.update(JSON.stringify([...TS_LIB_LOCALE_DIRS].sort()));
  return hash.digest('hex');
}

function shouldRebuildSnapshot(cacheHash) {
  if (process.argv.includes('--force')) return true;
  if (process.env.FORCE_PLAYGROUND_SNAPSHOT === '1') return true;
  if (!existsSync(outPath) || !existsSync(cacheMetaPath)) return true;

  try {
    const cacheMeta = JSON.parse(readFileSync(cacheMetaPath, 'utf8'));
    return (
      cacheMeta.cacheVersion !== CACHE_VERSION ||
      cacheMeta.cacheHash !== cacheHash
    );
  } catch {
    return true;
  }
}

/**
 * Replace native packages with their WASM equivalents so they work inside
 * WebContainer (which can't run native binaries).
 */
function swapNativeForWasm(nodeModulesDir, nativePkg, wasmPkg) {
  const nativeDir = join(nodeModulesDir, nativePkg);
  const wasmDir = join(nodeModulesDir, wasmPkg);

  if (!existsSync(wasmDir)) {
    throw new Error(`${wasmPkg} not found — add it to devDependencies`);
  }

  rmSync(nativeDir, { recursive: true, force: true });
  cpDirSync(wasmDir, nativeDir);
}

async function main() {
  const packageJson = buildPackageJson();

  console.log(
    'Playground dependency versions:',
    Object.fromEntries(
      SYNCED_DEPS.map((name) => [name, packageJson.dependencies[name]]),
    ),
  );

  const cacheHash = computeSnapshotCacheHash(packageJson);
  if (!shouldRebuildSnapshot(cacheHash)) {
    console.log('Playground snapshot is up to date; skipping rebuild.');
    return;
  }

  const tmpDir = mkdtempSync(join(tmpdir(), 'playground-snapshot-'));

  try {
    console.log('Creating temp project in', tmpDir);

    writeFileSync(
      join(tmpDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    );
    writeFileSync(join(tmpDir, 'index.html'), INDEX_HTML);
    writeFileSync(join(tmpDir, 'vite.config.ts'), VITE_CONFIG);

    mkdirSync(join(tmpDir, 'src'));
    writeFileSync(join(tmpDir, 'src', 'main.tsx'), '// placeholder\n');

    console.log('Installing dependencies…');
    execSync('npm install', { cwd: tmpDir, stdio: 'inherit' });

    console.log('Swapping native packages for WASM…');
    swapNativeForWasm(join(tmpDir, 'node_modules'), 'esbuild', 'esbuild-wasm');
    swapNativeForWasm(
      join(tmpDir, 'node_modules'),
      'rollup',
      '@rollup/wasm-node',
    );

    console.log('Removing node_modules/.bin (recreated at runtime)…');
    rmSync(join(tmpDir, 'node_modules', '.bin'), {
      recursive: true,
      force: true,
    });

    console.log('Pruning unnecessary files…');
    pruneDir(join(tmpDir, 'node_modules'));
    pruneTypescript(join(tmpDir, 'node_modules', 'typescript', 'lib'));

    console.log('Resolving symlinks…');
    resolveSymlinksRecursive(join(tmpDir, 'node_modules'));

    console.log('Creating snapshot…');
    const snap = await snapshot(tmpDir);

    if (!existsSync(join(projectRoot, 'public'))) {
      mkdirSync(join(projectRoot, 'public'), { recursive: true });
    }

    writeFileSync(outPath, snap);
    writeFileSync(
      cacheMetaPath,
      JSON.stringify(
        {
          cacheVersion: CACHE_VERSION,
          cacheHash,
          generatedAt: new Date().toISOString(),
        },
        null,
        2,
      ),
    );
    const sizeMB = (snap.byteLength / 1024 / 1024).toFixed(1);
    console.log(`Snapshot written to ${outPath} (${sizeMB} MB)`);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('Failed to build playground snapshot:', err);
  process.exit(1);
});
