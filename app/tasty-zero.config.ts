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
  t1m: {
    fontSize: '20px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '500',
    boldFontWeight: '700',
  },
  t2: {
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    boldFontWeight: '600',
  },
  t2m: {
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '500',
    boldFontWeight: '700',
  },
  t3: {
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    boldFontWeight: '600',
  },
  t3m: {
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '500',
    boldFontWeight: '700',
  },
  t4: {
    fontSize: '12px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '400',
    boldFontWeight: '700',
  },
  t4m: {
    fontSize: '12px',
    lineHeight: '1.5',
    letterSpacing: '0',
    fontWeight: '500',
    boldFontWeight: '800',
  },
  c1: {
    fontSize: '15px',
    lineHeight: '1.4',
    letterSpacing: '0',
    fontWeight: '400',
    boldFontWeight: '600',
  },
  tag: {
    fontSize: '10px',
    lineHeight: '1.4',
    letterSpacing: '0.04em',
    fontWeight: '600',
  },
  label: {
    fontSize: '12px',
    lineHeight: '1.5',
    letterSpacing: '0.05em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

const config = {
  states,
  tokens: {
    ...colorTokens,
    ...typographyTokens,
    $gap: '8px',
    $radius: '10px',
    '$button-radius': '6px',
    '$card-radius': '20px',
    '$border-width': '1px',
    '$outline-width': '2px',
    '$bold-font-weight': 600,
    $transition: '80ms',
    '$content-width': '1200px',
    '$header-height': '64px',
    '$default-font-size': '16px',
    '$default-line-height': 1.5,
    '$default-letter-spacing': '0.02em',
    '$default-font-weight': '400',
    '$default-font-style': 'normal',
    '$c1-font-weight': {
      '': '500',
      '@dark-root': '400',
    },
    '$t2-line-height': '1.5',
  },
};

export default config;
