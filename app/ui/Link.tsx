'use client';

import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const Link = tasty({
  as: 'a',
  styles: {
    color: {
      '': '#primary-accent-text',
      ':hover': '#primary-icon',
    },
    textDecoration: {
      '': 'none',
      ':hover': 'underline',
    },
    cursor: 'pointer',
    transition: 'color',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

export default Link;
