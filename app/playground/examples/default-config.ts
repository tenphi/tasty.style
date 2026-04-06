import { configure, generateTypographyTokens } from '@tenphi/tasty';
import { glaze } from '@tenphi/glaze';

const primary = glaze(240, 75);

primary.colors({
  surface: { lightness: 100, saturation: 0.1 },
  text: { base: 'surface', lightness: 0, contrast: 'AAA', saturation: 0.08 },
  'text-soft': {
    base: 'surface',
    lightness: 20,
    contrast: ['AA', 'AAA'],
    saturation: 0.05,
  },
  border: {
    base: 'surface',
    lightness: ['-10', '-20'],
    saturation: 0.35,
  },
  'accent-surface-text': { lightness: 100, mode: 'fixed' },
  'accent-surface': {
    base: 'accent-surface-text',
    lightness: '-48',
    contrast: ['AA', 7],
    mode: 'fixed',
  },
  'accent-text': {
    base: 'surface',
    lightness: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  shadow: { type: 'shadow', bg: 'surface', fg: 'border', intensity: 40 },
  'accent-shadow': {
    type: 'shadow',
    bg: 'surface',
    fg: 'accent-surface',
    intensity: 40,
  },
});

const danger = primary.extend({ hue: 15 });
const success = primary.extend({ hue: 155 });
const warning = primary.extend({ hue: 70 });
const info = primary.extend({ hue: 210 });

const palette = glaze.palette(
  { primary, danger, success, warning, info },
  { primary: 'primary' },
);

const typographyTokens = generateTypographyTokens({
  t1m: { fontSize: '20px', lineHeight: '1.5', fontWeight: '500' },
  t2: { fontSize: '16px', lineHeight: '1.5', fontWeight: '400' },
  t2m: { fontSize: '16px', lineHeight: '1.5', fontWeight: '500' },
  t3: { fontSize: '14px', lineHeight: '1.5', fontWeight: '400' },
  t3m: { fontSize: '14px', lineHeight: '1.5', fontWeight: '500' },
});

configure({
  tokens: {
    ...palette.tasty({
      modes: { highContrast: true },
      states: {
        dark: '@dark-root',
        highContrast: '@high-contrast-root',
      },
    }),
    ...typographyTokens,
    $gap: '8px',
    $radius: '8px',
    '$border-width': '1px',
    $transition: '80ms',
  },
  states: {
    '@mobile': '@media(w < 768px)',
    '@tablet': '@media(w < 1024px)',
    '@desktop': '@media(w >= 1024px)',
    '@dark-root':
      'schema=dark | (!schema & @media(prefers-color-scheme: dark))',
    '@high-contrast-root':
      'contrast=more | (!contrast & @media(prefers-contrast: more))',
    '@dark':
      '@root(schema=dark) | (!@root(schema) & @media(prefers-color-scheme: dark))',
    '@high-contrast':
      '@root(contrast=more) | (!@root(contrast) & @media(prefers-contrast: more))',
    '@reduce-motion': '@media(prefers-reduced-motion: reduce)',
  },
});
