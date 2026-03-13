'use client';

import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const Button = tasty({
  as: 'button',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    gap: '1x',
    padding: '1.5x 3x',
    preset: 't2 strong',
    radius: 'round',
    border: 'none',
    cursor: 'pointer',
    transition: 'theme',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  variants: {
    default: {
      fill: {
        '': '#primary-accent-surface',
        ':hover': '#primary-accent-surface-2',
        ':active': '#primary-accent-surface-3',
      },
      color: '#primary-accent-surface-text',
    },
    secondary: {
      fill: {
        '': '#primary-surface-2',
        ':hover': '#primary-surface-3',
        ':active': '#primary-surface-2',
      },
      color: '#primary-text',
      border: true,
    },
    ghost: {
      fill: {
        '': 'transparent',
        ':hover': '#primary-surface-2',
        ':active': '#primary-surface-3',
      },
      color: '#primary-text',
    },
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

export default Button;
