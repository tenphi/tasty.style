'use client';

import { tasty } from '@tenphi/tasty';
import Space from '@/app/ui/Space';
import Text from '@/app/ui/Text';
import Title from '@/app/ui/Title';
import Link from '@/app/ui/Link';

const FooterEl = tasty({
  as: 'footer',
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '6x',
    padding: {
      '': '8x 4x',
      '@mobile': '6x 2x',
    },
    width: 'max ($content-width, 1200px)',
    margin: 'auto left right',
    Nav: {
      $: '>',
      display: 'grid',
      gridColumns: {
        '': '1sf 1sf 1sf',
        '@mobile': '1sf',
      },
      gap: {
        '': '4x',
        '@mobile': '6x',
      },
    },
    Bottom: {
      $: '>',
      display: 'flex',
      flow: 'row',
      placeItems: 'center',
      placeContent: 'space-between',
      gap: '2x',
      padding: '3x 0 0 0',
      border: 'top',
    },
  },
  elements: {
    Nav: 'nav',
    Bottom: 'div',
  },
});

const Logo = tasty({
  as: 'img',
  styles: {
    width: '24px',
    height: 'auto',
  },
});

const COLUMNS = [
  {
    title: 'Documentation',
    links: [
      {
        label: 'Docs Hub',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/README.md',
      },
      {
        label: 'Getting Started',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/getting-started.md',
      },
      {
        label: 'Comparison',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/comparison.md',
      },
      {
        label: 'Adoption Guide',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/adoption.md',
      },
      {
        label: 'Runtime API',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/runtime.md',
      },
      {
        label: 'Server-Side Rendering',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/ssr.md',
      },
      {
        label: 'Zero Runtime',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/tasty-static.md',
      },
      {
        label: 'Methodology',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/methodology.md',
      },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      {
        label: 'Glaze',
        href: 'https://github.com/tenphi/glaze',
      },
      {
        label: 'ESLint Plugin',
        href: 'https://github.com/tenphi/eslint-plugin-tasty',
      },
      {
        label: 'VS Code Extension',
        href: 'https://github.com/tenphi/tasty-vscode-extension',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/tenphi/tasty' },
      {
        label: 'NPM',
        href: 'https://www.npmjs.com/package/@tenphi/tasty',
      },
      {
        label: 'Issues',
        href: 'https://github.com/tenphi/tasty/issues',
      },
    ],
  },
];

export default function Footer() {
  return (
    <FooterEl>
      <FooterEl.Nav>
        {COLUMNS.map((col) => (
          <Space key={col.title} gap="1.5x">
            <Title as="h3" preset="h5">
              {col.title}
            </Title>
            {col.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Link>
            ))}
          </Space>
        ))}
      </FooterEl.Nav>
      <FooterEl.Bottom>
        <Space flow="row" gap="1.5x" placeItems="center">
          <Logo src="/tasty.svg" alt="Tasty" />
          <Text as="span" preset="t3 strong" color="#primary-text">
            Tasty
          </Text>
        </Space>
        <Text as="span" preset="t4" color="#primary-text-soft">
          MIT License &copy; {new Date().getFullYear()} Tenphi
        </Text>
      </FooterEl.Bottom>
    </FooterEl>
  );
}
