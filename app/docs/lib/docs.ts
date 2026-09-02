import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

const TASTY_ROOT = path.resolve(process.cwd(), '..', 'tasty');
const DOCS_DIR = path.join(TASTY_ROOT, 'docs');

export function getDocSourcePath(slug: string): string {
  if (slug === 'introduction') return 'README.md';
  if (slug === 'docs-hub') return 'docs/README.md';

  return `docs/${slug}.md`;
}

function resolveFilePath(slug: string): string {
  return path.join(TASTY_ROOT, getDocSourcePath(slug));
}

export function assertAllDocsAreRouted(routedSlugs: string[]): void {
  const sourceSlugs = [
    'introduction',
    ...fs
      .readdirSync(DOCS_DIR)
      .filter((name) => name.endsWith('.md'))
      .map((name) => (name === 'README.md' ? 'docs-hub' : name.slice(0, -3))),
  ];
  const routed = new Set(routedSlugs);
  const sources = new Set(sourceSlugs);
  const missingRoutes = sourceSlugs.filter((slug) => !routed.has(slug));
  const missingSources = routedSlugs.filter((slug) => !sources.has(slug));
  // CI clones canonical tasty/main. A developer's adjacent checkout may be a
  // feature branch with unreleased docs, which must not break local builds.
  const requireCompleteNavigation = process.env.CI === 'true';

  if (
    (requireCompleteNavigation && missingRoutes.length) ||
    missingSources.length
  ) {
    const details = [
      requireCompleteNavigation && missingRoutes.length
        ? `not routed: ${missingRoutes.join(', ')}`
        : undefined,
      missingSources.length
        ? `missing source: ${missingSources.join(', ')}`
        : undefined,
    ]
      .filter(Boolean)
      .join('; ');

    throw new Error(
      `Tasty documentation navigation is out of sync (${details}).`,
    );
  }
}

function preprocessForMdx(markdown: string): string {
  let result = markdown;

  // Close void HTML elements for MDX compatibility (<img ...> -> <img ... />)
  result = result.replace(/<(img|br|hr|input)(\s[^>]*?)?\s*>/gi, '<$1$2 />');

  // Strip GitHub-only HTML header blocks (centered logos, badges, etc.)
  result = result.replace(
    /^(?:<(?:p|h1|h2|h3|div)\s[^>]*>[\s\S]*?<\/(?:p|h1|h2|h3|div)>\s*\n*)+---\n*/,
    '',
  );

  return result;
}

export function getDocContent(slug: string): string {
  const filePath = resolveFilePath(slug);
  const raw = fs.readFileSync(filePath, 'utf-8');

  return preprocessForMdx(raw);
}

export function extractDescription(markdown: string): string {
  let inCodeBlock = false;

  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock || !trimmed || trimmed.startsWith('#')) continue;

    const plain = trimmed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/<[^>]+>/g, '');

    if (plain.length < 20) continue;

    return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
  }

  return '';
}

export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const slugger = new GithubSlugger();
  let inCodeBlock = false;

  for (const line of markdown.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)/);

    if (match) {
      const depth = match[1].length;
      const rawText = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1');

      headings.push({
        depth,
        text: rawText,
        id: slugger.slug(rawText),
      });
    }
  }

  return headings;
}
