import { colorTokens } from './app/theme';

export default {
  tokens: [
    ...Object.keys(colorTokens),

    // -- Locally-defined color tokens --
    '#border',
    '#tint-fill',
    '#tint-accent',
    '#tint-accent-3',

    // -- Project custom properties --
    '$card-radius',
    '$content-width',
    '$header-height',
    '$default-font-size',
    '$default-line-height',
    '$default-letter-spacing',
    '$default-font-weight',
    '$default-font-style',
    '$c1-font-weight',
  ],

  states: [
    '@mobile',
    '@tablet',
    '@desktop',
    '@dark',
    '@high-contrast',
    '@reduce-motion',
  ],

  presets: [
    'd1',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    't1',
    't1m',
    't2',
    't2m',
    't3',
    't3m',
    't4',
    't4m',
    'c1',
    'code',
    'tag',
    'label',
  ],
};
