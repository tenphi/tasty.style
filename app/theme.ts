import { glaze } from '@tenphi/glaze';

glaze.configure({
  darkDesaturation: 0,
});

const blue = glaze(210, 75);

blue.colors({
  surface: { tone: 100, saturation: 0.1 },
  'surface-2': {
    base: 'surface',
    tone: '-2',
    saturation: 0.15,
  },
  'surface-3': {
    base: 'surface',
    tone: '-6',
    saturation: 0.25,
  },
  text: { base: 'surface', tone: 0, contrast: 'AAA', saturation: 0.08 },
  'text-2': {
    base: 'surface-2',
    tone: 0,
    contrast: 'AAA',
    saturation: 0.08,
  },
  'text-3': {
    base: 'surface-3',
    tone: 0,
    contrast: 'AAA',
    saturation: 0.08,
  },
  'text-soft': {
    base: 'surface',
    tone: 20,
    contrast: ['AA', 'AAA'],
    saturation: 0.05,
  },
  'text-soft-2': {
    base: 'surface-2',
    tone: 25,
    contrast: ['AA', 'AAA'],
    saturation: 0.05,
  },
  'text-soft-3': {
    base: 'surface-3',
    tone: 25,
    contrast: ['AA', 'AAA'],
    saturation: 0.05,
  },
  border: {
    base: 'surface',
    tone: ['-10', '-20'],
    saturation: 0.35,
  },
  'accent-surface-text': { tone: 100, mode: 'fixed' },
  'accent-surface': {
    base: 'accent-surface-text',
    tone: '-48',
    contrast: ['AA', 7],
    mode: 'fixed',
  },
  'accent-surface-2': {
    base: 'accent-surface-text',
    tone: '-42',
    contrast: [5, 7.5],
    mode: 'fixed',
  },
  'accent-surface-3': {
    base: 'accent-surface-text',
    tone: '-54',
    contrast: [5.5, 8],
    mode: 'fixed',
  },
  'accent-text': {
    base: 'surface',
    tone: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  'accent-text-2': {
    base: 'surface-2',
    tone: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  'accent-text-3': {
    base: 'surface-3',
    tone: 50,
    contrast: ['AA', 'AAA'],
    saturation: 0.9,
  },
  'pop-surface': {
    base: 'accent-surface-text',
    tone: '-48',
    contrast: ['AA', 'AAA'],
    mode: 'fixed',
    saturation: 100,
  },
  'pop-text': {
    base: 'surface',
    tone: '+1',
    contrast: ['AA', 'AAA'],
    saturation: 100,
  },
  'pop-text-2': {
    base: 'surface-2',
    tone: '+1',
    contrast: ['AA', 'AAA'],
    saturation: 100,
  },
  icon: { tone: 55, saturation: 0.9 },
  disabled: { tone: 80, saturation: 0.15 },
  'shadow-border': { tone: 20, mode: 'static' },
  // Glaze 3 uses tone steps; high-contrast black has no shadow headroom.
  'shadow-logo': {
    type: 'shadow',
    bg: 'surface',
    fg: 'shadow-border',
    intensity: [6, 0],
  },
  'shadow-sm': {
    type: 'shadow',
    bg: 'surface',
    intensity: [2, 0],
  },
  'shadow-md': {
    type: 'shadow',
    bg: 'surface',
    intensity: [4, 0],
  },
  'shadow-lg': {
    type: 'shadow',
    bg: 'surface',
    intensity: [6, 0],
  },
  'shadow-accent-sm': {
    type: 'shadow',
    bg: 'surface-3',
    fg: 'accent-surface',
    intensity: [2, 0],
  },
  'shadow-accent-md': {
    type: 'shadow',
    bg: 'surface-3',
    fg: 'accent-surface',
    intensity: [4, 0],
  },
  'shadow-accent-inset-2': {
    type: 'shadow',
    bg: 'accent-surface',
    intensity: [12, 0],
  },
  'shadow-inset-2': {
    type: 'shadow',
    bg: 'surface-2',
    intensity: [6, 0],
  },
  overlay: { tone: 10, opacity: 0.5 },
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
    tone: 100,
    saturation: 0.1,
  },
  text: {
    base: 'bg',
    tone: 0,
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
