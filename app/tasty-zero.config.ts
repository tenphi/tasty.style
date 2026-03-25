import { generateTypographyTokens } from '@tenphi/tasty';

import { states } from './states';
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
  h5: {
    fontSize: '16px',
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
    fontWeight: '400',
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
  states,
  tokens: {
    ...colorTokens,
    ...typographyTokens,
    $font: 'var(--font-sans), sans-serif',
    '$monospace-font': 'var(--font-mono), monospace',
    $gap: '8px',
    $radius: '10px',
    '$card-radius': '20px',
    '$border-width': '1px',
    '$outline-width': '2px',
    '$bold-font-weight': 600,
    $transition: '0.2s',
    '$content-width': '1200px',
    '$header-height': '64px',
    '$default-font-size': '16px',
    '$default-line-height': 1.5,
    '$default-letter-spacing': '0.02em',
    '$default-font-weight': '400',
    '$default-font-style': 'normal',
    '$t2-line-height': '1.5',
  },
};

export default config;
