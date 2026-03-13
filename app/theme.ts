import { glaze } from '@tenphi/glaze';

const base = glaze(210, 10);

base.colors({
  black: { lightness: 0, saturation: 0, mode: 'static' },
  white: { lightness: 100, saturation: 0, mode: 'static' },
  'code-comment': { lightness: 48, saturation: 0.08, mode: 'fixed' },
  'code-punctuation': { lightness: 58, saturation: 0.05, mode: 'fixed' },
});

const violet = glaze(272, 75);

violet.colors({
  surface: { lightness: 100, saturation: 0.2 },
  'surface-2': { lightness: 96, saturation: 0.25 },
  'surface-3': { lightness: 92, saturation: 0.3 },
  text: { base: 'surface', lightness: 0, contrast: 'AAA', saturation: 0.08 },
  'text-2': {
    base: 'surface-2',
    lightness: 0,
    contrast: 'AAA',
    saturation: 0.08,
  },
  'text-3': {
    base: 'surface-3',
    lightness: 0,
    contrast: 'AAA',
    saturation: 0.08,
  },
  'text-soft': {
    base: 'surface',
    lightness: 25,
    contrast: ['AA', 'AAA'],
    saturation: 0.05,
  },
  'text-soft-2': {
    base: 'surface-2',
    lightness: 25,
    contrast: ['AA', 'AAA'],
    saturation: 0.05,
  },
  'text-soft-3': {
    base: 'surface-3',
    lightness: 25,
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
    contrast: ['AA', 'AAA'],
    mode: 'fixed',
  },
  'accent-text': {
    base: 'surface',
    lightness: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  'accent-text-2': {
    base: 'surface-2',
    lightness: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  'accent-text-3': {
    base: 'surface-3',
    lightness: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  'code-text': { lightness: 100, mode: 'fixed' },
  'code-bg': {
    base: 'code-text',
    lightness: '-78',
    contrast: 'AAA',
    mode: 'fixed',
    saturation: 0.1,
  },
  'code-keyword': { lightness: 75, saturation: 0.65, mode: 'fixed' },
  icon: { lightness: 55, saturation: 0.9 },
  disabled: { lightness: 80, saturation: 0.15 },
  'shadow-border': { lightness: 20, mode: 'static' },
  'shadow-logo': {
    type: 'shadow',
    bg: 'surface',
    fg: 'shadow-border',
    intensity: 30,
  },
  'shadow-sm': { type: 'shadow', bg: 'surface', fg: 'text', intensity: 5 },
  'shadow-md': { type: 'shadow', bg: 'surface', fg: 'text', intensity: 12 },
  'shadow-lg': { type: 'shadow', bg: 'surface', fg: 'text', intensity: 22 },
  overlay: { lightness: 10, opacity: 0.5 },
});

const coral = violet.extend({ hue: 15 });
coral.colors({
  'code-string': { lightness: 74, saturation: 0.55, mode: 'fixed' },
});

const teal = violet.extend({ hue: 155 });
teal.colors({
  'code-property': { lightness: 70, saturation: 0.55, mode: 'fixed' },
});

const amber = violet.extend({ hue: 70 });
amber.colors({
  'code-number': { lightness: 74, saturation: 0.6, mode: 'fixed' },
});

const blue = violet.extend({ hue: 210 });
blue.colors({
  'code-function': { lightness: 72, saturation: 0.55, mode: 'fixed' },
  'code-value': { lightness: 68, saturation: 0.5, mode: 'fixed' },
});

const rose = violet.extend({ hue: 340 });
rose.colors({
  'code-operator': { lightness: 72, saturation: 0.5, mode: 'fixed' },
});

const lime = violet.extend({ hue: 125 });
lime.colors({
  'code-token': { lightness: 72, saturation: 0.55, mode: 'fixed' },
});

const palette = glaze.palette({
  base,
  primary: blue,
  violet,
  coral,
  teal,
  amber,
  blue,
  rose,
  lime,
});

export const colorTokens = palette.tasty({
  prefix: true,
  format: 'okhsl',
  modes: { highContrast: true },
});

export const TINT_NAMES = [
  'coral',
  'teal',
  'amber',
  'blue',
  'rose',
  'lime',
  'violet',
] as const;

export type TintName = (typeof TINT_NAMES)[number];
