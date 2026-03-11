'use client';

import {
  tasty,
  BASE_STYLES,
  OUTER_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
} from '@tenphi/tasty';

const Badge = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    padding: '0.5x 1.5x',
    preset: 't4 strong',
    radius: 'round',
    fill: '#primary-surface-3',
    color: '#primary-accent-fill',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES, ...COLOR_STYLES],
});

export default Badge;
