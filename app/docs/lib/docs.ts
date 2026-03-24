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

function resolveFilePath(slug: string): string {
  if (slug === 'introduction') {
    return path.join(TASTY_ROOT, 'README.md');
  }

  return path.join(DOCS_DIR, `${slug}.md`);
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
