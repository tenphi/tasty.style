'use client';

import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES, FLOW_STYLES } from '@tenphi/tasty';

const Space = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES, ...FLOW_STYLES],
});

export default Space;
