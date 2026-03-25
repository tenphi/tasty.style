export interface NavItem {
  title: string;
  slug: string;
  href?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const INTRODUCTION: NavItem = {
  title: 'Introduction',
  slug: 'introduction',
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Start Here',
    items: [
      INTRODUCTION,
      { title: 'Getting Started', slug: 'getting-started' },
      { title: 'Methodology', slug: 'methodology' },
      { title: 'Comparison', slug: 'comparison' },
      { title: 'Adoption Guide', slug: 'adoption' },
    ],
  },
  {
    title: 'Styling',
    items: [
      { title: 'Style DSL', slug: 'dsl' },
      { title: 'Style Properties', slug: 'styles' },
      { title: 'Configuration', slug: 'configuration' },
    ],
  },
  {
    title: 'Rendering',
    items: [
      { title: 'Runtime API', slug: 'runtime' },
      { title: 'Zero Runtime', slug: 'tasty-static' },
      { title: 'Server-Side Rendering', slug: 'ssr' },
    ],
  },
  {
    title: 'Design Systems',
    items: [{ title: 'Building a Design System', slug: 'design-system' }],
  },
  {
    title: 'Internals',
    items: [
      { title: 'Style Rendering Pipeline', slug: 'PIPELINE' },
      { title: 'Style Injector', slug: 'injector' },
      { title: 'Debug Utilities', slug: 'debug' },
    ],
  },
  {
    title: 'Ecosystem',
    items: [
      {
        title: 'ESLint Plugin',
        slug: 'eslint-plugin',
        href: 'https://github.com/tenphi/eslint-plugin-tasty',
      },
      {
        title: 'VSCode Extension',
        slug: 'vscode-extension',
        href: 'https://github.com/tenphi/tasty-vscode-extension',
      },
      {
        title: 'Glaze',
        slug: 'glaze',
        href: 'https://github.com/tenphi/glaze',
      },
      {
        title: 'Website Repo',
        slug: 'website-repo',
        href: 'https://github.com/tenphi/tasty.style',
      },
    ],
  },
];

export function getAllSlugs(): string[] {
  return NAV_GROUPS.flatMap((group) =>
    group.items.filter((item) => !item.href).map((item) => item.slug),
  );
}

export function findNavItem(slug: string): NavItem | undefined {
  if (slug === INTRODUCTION.slug) return INTRODUCTION;

  for (const group of NAV_GROUPS) {
    const item = group.items.find((i) => i.slug === slug);
    if (item) return item;
  }

  return undefined;
}
