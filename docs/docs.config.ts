import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineDocsConfig } from '@tenphi/cookbook/config';

// The documentation lives in the tasty repository, checked out next to this
// one (see the deploy and bump workflows).
const TASTY_ROOT = '../../tasty';

const config = defineDocsConfig({
  site: {
    title: 'Tasty',
    description:
      'Guides and reference for Tasty, the CSS-in-JS engine for React design systems.',
    url: 'https://tasty.style',
    repository: 'https://github.com/tenphi/tasty',
    logo: { src: '../public/tasty.svg', href: 'https://tasty.style/' },
    favicon: '../public/favicon.svg',
    seo: {
      // The landing page's social card (public/og-image.png).
      image: {
        src: 'https://tasty.style/og-image.png',
        alt: 'Tasty — Predictable CSS-in-JS for React design systems',
        width: 1200,
        height: 630,
      },
    },
    headerLinks: [
      {
        label: 'Playground',
        link: 'https://tasty.style/playground',
        variant: 'primary',
      },
    ],
  },
  head: [
    {
      tag: 'script',
      attrs: {
        defer: true,
        src: 'https://umami.tenphi.me/script.js',
        'data-website-id': 'ce86ad56-979e-4eb6-aaaa-6751dad7302a',
      },
    },
  ],
  theme: { brand: { from: 'okhsl(210 75% 50%)' } },
  editLink: { baseUrl: 'https://github.com/tenphi/tasty/edit/main/' },
  redirects: { '/introduction': '/' },
  content: {
    allowOutsideRoot: true,
    sources: [
      {
        id: 'intro',
        root: TASTY_ROOT,
        file: 'README.md',
        route: '/',
        title: 'Introduction',
      },
      {
        id: 'hub',
        root: TASTY_ROOT,
        file: 'docs/README.md',
        route: '/docs-hub',
        title: 'Docs Hub',
      },
      {
        id: 'docs',
        root: TASTY_ROOT,
        glob: 'docs/*.md',
        base: 'docs',
        exclude: ['docs/README.md'],
      },
    ],
  },
  navigation: {
    items: [
      {
        label: 'Start Here',
        items: [
          { label: 'Introduction', link: '/' },
          { label: 'Docs Hub', link: '/docs-hub' },
          { label: 'Getting Started', link: '/getting-started' },
          { label: 'Methodology', link: '/methodology' },
          { label: 'Comparison', link: '/comparison' },
          { label: 'Adoption Guide', link: '/adoption' },
          { label: 'Migration Guide (v2 → v3)', link: '/migration-v3' },
        ],
      },
      {
        label: 'Styling',
        items: [
          { label: 'Style DSL', link: '/dsl' },
          { label: 'Style Properties', link: '/styles' },
          { label: 'Style Rules for AI Agents', link: '/ai-agents' },
          { label: 'Configuration', link: '/configuration' },
          { label: 'Plugins & Extension Points', link: '/plugins' },
        ],
      },
      {
        label: 'Rendering',
        items: [
          { label: 'React API', link: '/react-api' },
          { label: 'Zero Runtime', link: '/tasty-static' },
          { label: 'Server-Side Rendering', link: '/ssr' },
        ],
      },
      {
        label: 'Design Systems',
        items: [{ label: 'Building a Design System', link: '/design-system' }],
      },
      {
        label: 'Internals',
        items: [
          { label: 'Style Rendering Pipeline', link: '/pipeline' },
          { label: 'Style Injector', link: '/injector' },
          { label: 'Debug Utilities', link: '/debug' },
          { label: 'Runtime Benchmarks', link: '/runtime-benchmarks' },
        ],
      },
      {
        label: 'Ecosystem',
        items: [
          { label: 'Playground', link: 'https://tasty.style/playground' },
          {
            label: 'ESLint Plugin',
            link: 'https://github.com/tenphi/eslint-plugin-tasty',
          },
          {
            label: 'VSCode Extension',
            link: 'https://github.com/tenphi/tasty-vscode-extension',
          },
          { label: 'Glaze', link: 'https://github.com/tenphi/glaze' },
          {
            label: 'Website Repo',
            link: 'https://github.com/tenphi/tasty.style',
          },
        ],
      },
    ],
  },
});

/** Routes a navigation tree links to, including group links. */
function navigationRoutes(node: unknown): string[] {
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap(navigationRoutes);
  if (!node || typeof node !== 'object') return [];

  const { link, items } = node as { link?: unknown; items?: unknown };

  return [
    ...(typeof link === 'string' ? [link] : []),
    ...navigationRoutes(items),
  ];
}

// Cookbook builds a doc that the sidebar does not list without complaint, so
// fail CI (which clones tasty/main) when tasty gains one. A developer's
// adjacent checkout may be a feature branch with unreleased docs, which must
// not break local builds.
if (process.env.CI === 'true') {
  const listed = new Set(navigationRoutes(config.navigation));
  const docsDir = fileURLToPath(
    new URL(`${TASTY_ROOT}/docs/`, import.meta.url),
  );
  const unlisted = readdirSync(docsDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) =>
      name === 'README.md' ? '/docs-hub' : `/${name.slice(0, -3)}`,
    )
    .filter((route) => !listed.has(route));

  if (unlisted.length) {
    throw new Error(
      `Add ${unlisted.join(', ')} to the sidebar in docs/docs.config.ts.`,
    );
  }
}

export default config;
