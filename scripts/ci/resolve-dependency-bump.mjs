// Resolves the version a pinned @tenphi/* dependency should move to.
//
// The bump workflows used to trust `client_payload.version` from the release
// dispatch verbatim. That made them one-shot: a dispatch that arrived while a
// major migration was pending (or that never arrived at all) was lost forever,
// leaving package.json behind the registry with every run still reporting
// success. Resolving the target from the registry instead makes the bump
// idempotent, so a scheduled run always catches up to whatever was missed.
//
// Usage: node scripts/ci/resolve-dependency-bump.mjs <package-name>

import { execFileSync } from 'node:child_process';
import { readFileSync, appendFileSync } from 'node:fs';

const SECTIONS = ['dependencies', 'devDependencies'];
const STABLE = /^(\d+)\.(\d+)\.(\d+)$/;

const packageName = process.argv[2];

if (!packageName) {
  fail('Usage: node scripts/ci/resolve-dependency-bump.mjs <package-name>');
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
  return execFileSync('npm', ['view', packageName, ...args], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  }).trim();
}

let published;

try {
  const raw = JSON.parse(view('versions', '--json'));

  published = Array.isArray(raw) ? raw : [raw];
} catch (error) {
  fail(`Cannot read published versions for ${packageName}: ${error.message}`);
}

// Snapshot/prerelease tags (`0.0.0-snapshot.<sha>`) are published on every PR in
// these repos, so only clean X.Y.Z releases are eligible.
const target = published
  .filter(
    (version) =>
      STABLE.test(version) && Number(version.split('.')[0]) === installedMajor,
  )
  .sort(compare)
  .pop();

if (!target) {
  fail(
    `No stable ${installedMajor}.x release of ${packageName} found on the registry.`,
  );
}

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
