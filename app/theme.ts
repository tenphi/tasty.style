import { glaze } from '@tenphi/glaze';

const base = glaze(210, 10);

base.colors({
  black: { lightness: 0, saturation: 0, mode: 'static' },
  white: { lightness: 100, saturation: 0, mode: 'static' },
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
    contrast: ['AA', 7],
    mode: 'fixed',
  },
  'accent-surface-2': {
    base: 'accent-surface-text',
    lightness: '-42',
    contrast: [5, 7.5],
    mode: 'fixed',
  },
  'accent-surface-3': {
    base: 'accent-surface-text',
    lightness: '-54',
    contrast: [5.5, 8],
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
  'pop-surface': {
    base: 'accent-surface-text',
    lightness: '-48',
    contrast: ['AA', 'AAA'],
    mode: 'fixed',
    saturation: 100,
  },
  'pop-text': {
    base: 'surface',
    lightness: '+1',
    contrast: ['AA', 'AAA'],
    saturation: 100,
  },
  'pop-text-2': {
    base: 'surface-2',
    lightness: '+1',
    contrast: ['AA', 'AAA'],
    saturation: 100,
  },
  icon: { lightness: 55, saturation: 0.9 },
  disabled: { lightness: 80, saturation: 0.15 },
  'shadow-border': { lightness: 20, mode: 'static' },
  'shadow-logo': {
    type: 'shadow',
    bg: 'surface',
    fg: 'shadow-border',
    intensity: 30,
  },
  'shadow-sm': {
    type: 'shadow',
    bg: 'surface',
    fg: 'text',
    intensity: 5,
  },
  'shadow-md': {
    type: 'shadow',
    bg: 'surface',
    fg: 'text',
    intensity: 12,
  },
  'shadow-lg': {
    type: 'shadow',
    bg: 'surface',
    fg: 'text',
    intensity: 22,
  },
  overlay: { lightness: 10, opacity: 0.5 },
});

const coral = violet.extend({ hue: 15 });

const teal = violet.extend({ hue: 155 });

const amber = violet.extend({ hue: 70 });

const blue = violet.extend({ hue: 210 });

const rose = violet.extend({ hue: 340 });

const lime = violet.extend({ hue: 125 });

const syntax = glaze(210, 75);
syntax.colors({
  text: { lightness: 100, mode: 'fixed' },
  bg: {
    base: 'text',
    lightness: ['-78', '-85'],
    contrast: 'AAA',
    mode: 'fixed',
    saturation: 0.1,
  },
  comment: {
    base: 'bg',
    lightness: 48,
    contrast: ['AA', 'AAA'],
    saturation: 0.01,
    mode: 'fixed',
    hue: 210,
  },
  punctuation: {
    base: 'bg',
    lightness: 58,
    contrast: ['AA', 'AAA'],
    saturation: 0.01,
    mode: 'fixed',
    hue: 210,
  },
  keyword: {
    base: 'bg',
    lightness: 75,
    contrast: ['AA', 'AAA'],
    saturation: 0.65,
    mode: 'fixed',
  },
  string: {
    base: 'bg',
    lightness: 74,
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    mode: 'fixed',
    hue: 15,
  },
  token: {
    base: 'bg',
    lightness: 72,
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    mode: 'fixed',
    hue: 125,
  },
  property: {
    base: 'bg',
    lightness: 70,
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    mode: 'fixed',
    hue: 155,
  },
  number: {
    base: 'bg',
    lightness: 74,
    contrast: ['AA', 'AAA'],
    saturation: 0.6,
    mode: 'fixed',
    hue: 70,
  },
  function: {
    base: 'bg',
    lightness: 72,
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    mode: 'fixed',
    hue: 210,
  },
  value: {
    base: 'bg',
    lightness: 68,
    contrast: ['AA', 'AAA'],
    saturation: 0.5,
    mode: 'fixed',
    hue: 210,
  },
  operator: {
    base: 'bg',
    lightness: 72,
    contrast: ['AA', 'AAA'],
    saturation: 0.5,
    mode: 'fixed',
    hue: 340,
  },
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
  syntax,
});

export const colorTokens = palette.tasty({
  prefix: true,
  format: 'rgb',
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
