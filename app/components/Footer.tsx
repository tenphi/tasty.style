'use client';

import { tasty } from '@tenphi/tasty';
import Space from '@/app/ui/Space';
import Grid from '@/app/ui/Grid';
import Text from '@/app/ui/Text';
import Link from '@/app/ui/Link';

const FooterWrapper = tasty({
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
  },
});

const FooterBrand = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1.5x',
    placeItems: 'center',
  },
});

const FooterLogo = tasty({
  as: 'img',
  styles: {
    width: '24px',
    height: 'auto',
  },
});

const FooterTitle = tasty({
  as: 'h4',
  styles: {
    preset: 't3 strong',
    color: '#primary-text',
    margin: 0,
  },
});

const FooterBottom = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    placeContent: 'space-between',
    gap: '2x',
    padding: '3x 0 0 0',
    border: 'top',
  },
});

const COLUMNS = [
  {
    title: 'Documentation',
    links: [
      {
        label: 'Usage Guide',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/usage.md',
      },
      {
        label: 'Configuration',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/configuration.md',
      },
      {
        label: 'Style Properties',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/styles.md',
      },
      {
        label: 'SSR Guide',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/ssr.md',
      },
      {
        label: 'Zero Runtime',
        href: 'https://github.com/tenphi/tasty/blob/main/docs/tasty-static.md',
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
    <FooterWrapper>
      <Grid
        gridColumns={{ '': '1sf 1sf 1sf', '@mobile': '1sf' }}
        gap={{ '': '4x', '@mobile': '6x' }}
      >
        {COLUMNS.map((col) => (
          <Space key={col.title} gap="1.5x">
            <FooterTitle>{col.title}</FooterTitle>
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
      </Grid>
      <FooterBottom>
        <FooterBrand>
          <FooterLogo src="/tasty.svg" alt="Tasty" />
          <Text preset="t3 strong" color="#primary-text">
            Tasty
          </Text>
        </FooterBrand>
        <Text preset="t4" color="#primary-text-soft">
          MIT License &copy; {new Date().getFullYear()} Tenphi
        </Text>
      </FooterBottom>
    </FooterWrapper>
  );
}
