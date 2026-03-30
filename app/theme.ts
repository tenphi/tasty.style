import { glaze } from '@tenphi/glaze';

glaze.configure({
  darkDesaturation: 0,
  shadowTuning: {
    // Default tuning for all shadow colors
    alphaMax: 0.3,
    bgHueBlend: 0.2,
  },
});

const blue = glaze(210, 75);

blue.colors({
  black: { lightness: 0, saturation: 0, mode: 'static', inherit: false },
  white: { lightness: 100, saturation: 0, mode: 'static', inherit: false },
  surface: { lightness: 100, saturation: 0.1 },
  'surface-2': {
    base: 'surface',
    lightness: '-2',
    saturation: 0.15,
  },
  'surface-3': {
    base: 'surface',
    lightness: '-6',
    saturation: 0.25,
  },
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
    lightness: 20,
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
  'shadow-accent-inset-2': {
    type: 'shadow',
    bg: 'accent-surface',
    intensity: 15,
  },
  'shadow-inset-2': {
    type: 'shadow',
    bg: 'surface-2',
    intensity: 10,
  },
  overlay: { lightness: 10, opacity: 0.5 },
});

const coral = blue.extend({ hue: 15 });

const teal = blue.extend({ hue: 155 });

const amber = blue.extend({ hue: 70 });

const violet = blue.extend({ hue: 272 });

const rose = blue.extend({ hue: 340 });

const lime = blue.extend({ hue: 125 });

const syntax = glaze(210, 90);
syntax.colors({
  bg: {
    lightness: 100,
    saturation: 0.1,
  },
  text: {
    base: 'bg',
    lightness: 0,
    contrast: 'AAA',
    saturation: 0,
  },
  comment: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.01,
    hue: 210,
  },
  punctuation: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.01,
    hue: 210,
  },
  keyword: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.65,
  },
  string: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    hue: 15,
  },
  token: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    hue: 125,
  },
  property: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    hue: 155,
  },
  number: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.6,
    hue: 70,
  },
  function: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.55,
    hue: 210,
  },
  value: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.5,
    hue: 210,
  },
  operator: {
    base: 'bg',
    contrast: ['AA', 'AAA'],
    saturation: 0.5,
    hue: 340,
  },
});

const palette = glaze.palette(
  { violet, coral, teal, amber, blue, rose, lime, syntax },
  { primary: 'blue' },
);

export const colorTokens = palette.tasty({
  prefix: true,
  modes: { highContrast: true },
  states: {
    dark: '@dark-root',
    highContrast: '@high-contrast-root',
  },
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
