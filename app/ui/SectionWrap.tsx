'use client';

import {
  tasty,
  BASE_STYLES,
  OUTER_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
} from '@tenphi/tasty';

const SectionWrap = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    width: '100%',
  },
  styleProps: [
    ...BASE_STYLES,
    ...OUTER_STYLES,
    ...BLOCK_STYLES,
    ...COLOR_STYLES,
  ],
});

export default SectionWrap;
