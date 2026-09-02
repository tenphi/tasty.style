// Resolves the version a pinned @tenphi/* dependency should move to.
//
// The registry remains the source of truth, making scheduled runs idempotent and
// able to catch missed releases. A release dispatch may also supply the version
// it just published. That version is a visibility floor rather than the target:
// wait until npm exposes it, then still select the newest eligible release. This
// closes the propagation race where the dispatch can arrive before npm's
// package metadata includes the new version.
//
// Usage: node scripts/ci/resolve-dependency-bump.mjs <package-name> [expected-version]

import { execFileSync } from 'node:child_process';
import { readFileSync, appendFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

const SECTIONS = ['dependencies', 'devDependencies'];
const STABLE = /^(\d+)\.(\d+)\.(\d+)$/;
const REGISTRY_ATTEMPTS = 18;
const REGISTRY_RETRY_MS = 10_000;

const packageName = process.argv[2];
const expectedVersion = process.argv[3]?.trim() || null;

if (!packageName) {
  fail(
    'Usage: node scripts/ci/resolve-dependency-bump.mjs <package-name> [expected-version]',
  );
}

if (expectedVersion && !STABLE.test(expectedVersion)) {
  fail(`Expected version "${expectedVersion}" is not a stable X.Y.Z release.`);
}

function fail(message) {
  console.log(`::error::${message}`);
  process.exit(1);
}

/** Splits `^3.0.0` into its range prefix and version, so the pin style survives a bump. */
function parseSpec(spec) {
  const match = /^(\D*)(\d+\.\d+\.\d+.*)$/.exec(spec);

  return match ? { prefix: match[1], version: match[2] } : null;
}

function compare(a, b) {
  const left = a.split('.').map(Number);
  const right = b.split('.').map(Number);

  return left[0] - right[0] || left[1] - right[1] || left[2] - right[2];
}

const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
const section = SECTIONS.find((name) => manifest[name]?.[packageName]);

if (!section) {
  fail(`${packageName} is not listed in package.json.`);
}

const spec = manifest[section][packageName];
const installed = parseSpec(spec);

if (!installed) {
  fail(`Cannot parse the version range "${spec}" pinned for ${packageName}.`);
}

const installedMajor = Number(installed.version.split('.')[0]);

// `npm view` (rather than a direct registry fetch) so any registry or proxy
// configured for the runner is honoured.
function view(...args) {
  return execFileSync(
    'npm',
    ['view', packageName, ...args, '--prefer-online'],
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
    },
  ).trim();
}

let published;
const awaitExpected =
  expectedVersion && compare(expectedVersion, installed.version) > 0;
const attempts = awaitExpected ? REGISTRY_ATTEMPTS : 1;

for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    const raw = JSON.parse(view('versions', '--json'));

    published = Array.isArray(raw) ? raw : [raw];
  } catch (error) {
    if (attempt === attempts) {
      fail(
        `Cannot read published versions for ${packageName}: ${error.message}`,
      );
    }

    console.log(
      `Registry lookup failed (attempt ${attempt}/${attempts}); retrying in ${REGISTRY_RETRY_MS / 1000}s.`,
    );
    await delay(REGISTRY_RETRY_MS);
    continue;
  }

  if (!awaitExpected || published.includes(expectedVersion)) {
    break;
  }

  if (attempt === attempts) {
    fail(
      `${packageName}@${expectedVersion} was dispatched but is still not visible on the registry after ${attempts} attempts.`,
    );
  }

  console.log(
    `${packageName}@${expectedVersion} is not visible on the registry yet (attempt ${attempt}/${attempts}); retrying in ${REGISTRY_RETRY_MS / 1000}s.`,
  );
  await delay(REGISTRY_RETRY_MS);
}

// Snapshot/prerelease tags (`0.0.0-snapshot.<sha>`) are published on every PR in
// these repos, so only clean X.Y.Z releases are eligible.
const registryTarget = published
  .filter(
    (version) =>
      STABLE.test(version) && Number(version.split('.')[0]) === installedMajor,
  )
  .sort(compare)
  .pop();

if (!registryTarget) {
  fail(
    `No stable ${installedMajor}.x release of ${packageName} found on the registry.`,
  );
}

// A stale registry response must never turn an automatic bump into a downgrade.
const target =
  compare(registryTarget, installed.version) >= 0
    ? registryTarget
    : installed.version;

const latest = view('version');
const latestMajor = Number(
  parseSpec(latest)?.version.split('.')[0] ?? installedMajor,
);
const changed = installed.version !== target;

const outputs = {
  section,
  installed: installed.version,
  target,
  spec: `${installed.prefix}${target}`,
  changed: String(changed),
  // Underscored so the workflow can read it with plain property access; a hyphen
  // in an output name is ambiguous with subtraction in GitHub expressions.
  major_pending: String(latestMajor > installedMajor),
  latest,
};

console.log(
  `${packageName}: installed ${installed.version}, latest ${installedMajor}.x release ${target}, registry latest ${latest}`,
);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    Object.entries(outputs)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n') + '\n',
  );
}

// Crossing a major carries breaking changes, so it stays a manual migration —
// but say so loudly instead of exiting quietly the way the old guard did.
if (latestMajor > installedMajor) {
  console.log(
    `::warning::${packageName} ${installedMajor}.x -> ${latestMajor}.x is a major release and must be migrated manually. Staying on the ${installedMajor}.x line (${target}).`,
  );
}

if (!changed) {
  console.log(
    `::notice::${packageName} is already at ${target}; nothing to bump.`,
  );
}
