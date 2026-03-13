'use client';

import {
  tasty,
  BASE_STYLES,
  OUTER_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
} from '@tenphi/tasty';
import type { TintName } from '@/app/theme';

const Card = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    padding: {
      '': '3x',
      '@mobile': '2x',
    },
    radius: '1cr',
    textDecoration: 'none',
    transition: 'shadow, translate',
    shadow: {
      '': 'none',
      ':hover': '0 1x 2x #primary-shadow-sm',
    },
    translate: {
      '': '0 0',
      ':hover': '0 -3px',
    },
    Header: {
      $: '>',
      display: 'flex',
      flow: 'row',
      placeContent: 'space-between',
      placeItems: 'center',
    },
    Icon: {
      $: '>Header>',
      display: 'inline-flex',
      placeItems: 'center',
      placeContent: 'center',
      width: '48px',
      height: '48px',
      radius: '14px',
      fill: '#tint-fill',
      color: '#tint-accent-3',
    },
  },
  elements: { Header: 'div', Icon: 'span' },
  styleProps: [
    ...BASE_STYLES,
    ...OUTER_STYLES,
    ...BLOCK_STYLES,
    ...COLOR_STYLES,
  ],
});

export default Card;

interface TintStyle {
  cardFill: string;
  cardBorder: string;
  tintFill: string;
  tintAccent: string;
  tintAccent3: string;
}

export const TINT_STYLES: Record<TintName, TintStyle> = {
  coral: {
    cardFill: '#coral-surface-2',
    cardBorder: '1bw solid #coral-border',
    tintFill: '#coral-surface-3',
    tintAccent: '#coral-accent-text',
    tintAccent3: '#coral-accent-text-3',
  },
  teal: {
    cardFill: '#teal-surface-2',
    cardBorder: '1bw solid #teal-border',
    tintFill: '#teal-surface-3',
    tintAccent: '#teal-accent-text',
    tintAccent3: '#teal-accent-text-3',
  },
  amber: {
    cardFill: '#amber-surface-2',
    cardBorder: '1bw solid #amber-border',
    tintFill: '#amber-surface-3',
    tintAccent: '#amber-accent-text',
    tintAccent3: '#amber-accent-text-3',
  },
  blue: {
    cardFill: '#blue-surface-2',
    cardBorder: '1bw solid #blue-border',
    tintFill: '#blue-surface-3',
    tintAccent: '#blue-accent-text',
    tintAccent3: '#blue-accent-text-3',
  },
  rose: {
    cardFill: '#rose-surface-2',
    cardBorder: '1bw solid #rose-border',
    tintFill: '#rose-surface-3',
    tintAccent: '#rose-accent-text',
    tintAccent3: '#rose-accent-text-3',
  },
  lime: {
    cardFill: '#lime-surface-2',
    cardBorder: '1bw solid #lime-border',
    tintFill: '#lime-surface-3',
    tintAccent: '#lime-accent-text',
    tintAccent3: '#lime-accent-text-3',
  },
  violet: {
    cardFill: '#violet-surface-2',
    cardBorder: '1bw solid #violet-border',
    tintFill: '#violet-surface-3',
    tintAccent: '#violet-accent-text',
    tintAccent3: '#violet-accent-text-3',
  },
};
