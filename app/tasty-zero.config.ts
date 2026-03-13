import { generateTypographyTokens } from '@tenphi/tasty';

import { colorTokens } from './theme';

const typographyTokens = generateTypographyTokens({
  d1: {
    fontSize: '64px',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    fontWeight: '700',
  },
  h1: {
    fontSize: '42px',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    fontWeight: '700',
  },
  h2: {
    fontSize: '32px',
    lineHeight: '1.2',
    letterSpacing: '-0.01em',
    fontWeight: '700',
  },
  h3: {
    fontSize: '24px',
    lineHeight: '1.3',
    letterSpacing: '0',
    fontWeight: '600',
  },
  h4: {
    fontSize: '20px',
    lineHeight: '1.4',
    letterSpacing: '0',
    fontWeight: '600',
  },
  t1: {
    fontSize: '20px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    boldFontWeight: '600',
  },
  t2: {
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    boldFontWeight: '600',
  },
  t3: {
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    boldFontWeight: '600',
  },
  t4: {
    fontSize: '12px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '500',
    boldFontWeight: '700',
  },
  strong: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    fontFamily: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'var(--bold-font-weight, 600)',
  },
});

const config = {
  states: {
    '@mobile': '@media(w < 768px)',
    '@tablet': '@media(w < 1024px)',
    '@desktop': '@media(w >= 1024px)',
    '@dark':
      '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',
    '@high-contrast':
      '@root(contrast=more) | (!@root(contrast) & @media(prefers-contrast: more))',
    '@reduce-motion': '@media(prefers-reduced-motion: reduce)',
  },
  recipes: {
    palette: colorTokens,
    typography: typographyTokens,
  },
};

export default config;
