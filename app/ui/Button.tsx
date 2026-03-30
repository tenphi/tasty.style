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
        '': '#accent-surface',
        ':hover': '#accent-surface-2',
        ':active': '#accent-surface-3',
      },
      color: '#accent-surface-text',
    },
    secondary: {
      fill: {
        '': '#surface-2',
        ':hover': '#surface-3',
        ':active': '#surface-2',
      },
      color: '#text',
      border: true,
    },
    ghost: {
      fill: {
        '': 'transparent',
        ':hover': '#surface-2',
        ':active': '#surface-3',
      },
      color: '#text',
    },
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

export default Button;
