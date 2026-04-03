'use client';

import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const Button = tasty({
  as: 'button',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    gap: '1x',
    padding: '1.5x 3x',
    preset: 't2m',
    radius: 'round',
    border: 'none',
    cursor: 'pointer',
    transition: 'theme',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    shadow: {
      '': 'inset 0 0 2x #shadow-inset-2.0',
      ':active': 'inset 0 0 2x #shadow-inset-2',
    },
  },
  variants: {
    default: {
      fill: {
        '': '#accent-surface',
        ':hover': '#accent-surface-2',
        ':active': '#accent-surface-3',
      },
      color: '#accent-surface-text',
      shadow: {
        '': 'inset 0 0 2x #shadow-accent-inset-2.0',
        ':active': 'inset 0 0 2x #shadow-accent-inset-2',
      },
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
