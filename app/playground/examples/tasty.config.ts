const COLORS = [
  'surface',
  'text',
  'text-soft',
  'border',
  'accent-surface-text',
  'accent-surface',
  'accent-text',
  'white',
  'black',
  'shadow',
  'accent-shadow',
];

const THEMES = ['primary', 'danger', 'success', 'warning', 'info'];

export default {
  tokens: [
    ...COLORS.map((c) => `#${c}`),
    ...THEMES.flatMap((t) => COLORS.map((c) => `#${t}-${c}`)),
    '$gap',
    '$radius',
    '$border-width',
    '$transition',
  ],

  states: [
    '@mobile',
    '@tablet',
    '@desktop',
    '@dark-root',
    '@high-contrast-root',
    '@dark',
    '@high-contrast',
    '@reduce-motion',
  ],
};
