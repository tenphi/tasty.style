import { glaze } from '@tenphi/glaze';

const violet = glaze(272, 75);

violet.colors({
  surface: { lightness: 98, saturation: 0.2 },
  'surface-2': { lightness: 95, saturation: 0.25 },
  'surface-3': { lightness: 90, saturation: 0.5 },
  text: { base: 'surface', lightness: 0, contrast: 'AAA', saturation: 0.08 },
  'text-soft': { base: 'surface', lightness: 25, contrast: 'AA', saturation: 0.05 },
  border: {
    base: 'surface',
    lightness: ['-10', '-20'],
    saturation: 0.35,
  },
  'accent-surface-text': { lightness: 100, mode: 'fixed' },
  'accent-surface': {
    base: 'accent-surface-text',
    lightness: '-48',
    contrast: 'AA',
    mode: 'fixed',
  },
  'accent-text': {
    base: 'surface',
    lightness: 45,
    contrast: 'AA',
    saturation: .9,
  },
  'code-text': { lightness: 100, mode: 'fixed' },
  'code-bg': {
    base: 'code-text',
    lightness: '-78',
    contrast: 'AAA',
    mode: 'fixed',
    saturation: 0.1,
  },
  icon: { lightness: 55, saturation: 0.9 },
  disabled: { lightness: 80, saturation: 0.15 },
  'shadow-sm': { type: 'shadow', bg: 'surface', fg: 'text', intensity: 5 },
  'shadow-md': { type: 'shadow', bg: 'surface', fg: 'text', intensity: 12 },
  'shadow-lg': { type: 'shadow', bg: 'surface', fg: 'text', intensity: 22 },
  overlay: { lightness: 10, opacity: 0.5 },
});

const coral = violet.extend({ hue: 15 });
const teal = violet.extend({ hue: 155 });
const amber = violet.extend({ hue: 70 });
const blue = violet.extend({ hue: 210 });
const rose = violet.extend({ hue: 340 });
const lime = violet.extend({ hue: 125 });

const palette = glaze.palette({
  primary: violet,
  violet,
  coral,
  teal,
  amber,
  blue,
  rose,
  lime,
});

export const colorTokens = palette.tasty({ prefix: true, format: 'oklch' });

export const TINT_NAMES = [
  'coral',
  'teal',
  'amber',
  'blue',
  'rose',
  'lime',
] as const;

export type TintName = (typeof TINT_NAMES)[number];
