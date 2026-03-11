'use client';

import { configure, generateTypographyTokens } from '@tenphi/tasty';
import type { RecipeStyles } from '@tenphi/tasty';

import { colorTokens } from './theme';

const builtInTokens = generateTypographyTokens();

const displayTokens = generateTypographyTokens({
  d1: {
    fontSize: '64px',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    fontWeight: '700',
  },
  d2: {
    fontSize: '48px',
    lineHeight: '1.15',
    letterSpacing: '-0.01em',
    fontWeight: '700',
  },
});

const typographyTokens = {
  ...builtInTokens,
  ...displayTokens,
} as RecipeStyles;

configure({
  states: {
    '@mobile': '@media(w < 768px)',
    '@tablet': '@media(w < 1024px)',
    '@desktop': '@media(w >= 1024px)',
    '@dark':
      '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',
    '@reduce-motion': '@media(prefers-reduced-motion: reduce)',
  },
  recipes: {
    palette: colorTokens,
    typography: typographyTokens,
  },
});
