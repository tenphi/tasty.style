import { colorTokens } from './app/theme';

export default {
  extends: '@tenphi/tasty',

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
    '$t2-line-height',
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
    't2',
    't3',
    't4',
    'c1',
    'label',
    'strong',
  ],

  styles: ['scrollPaddingTop', 'textSizeAdjust'],
};
