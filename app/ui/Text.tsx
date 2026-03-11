'use client';

import { tasty, BASE_STYLES, OUTER_STYLES } from '@tenphi/tasty';

const Text = tasty({
  as: 'p',
  styles: {
    preset: 't2',
    color: '#primary-text',
    margin: 0,
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, 'color', 'textAlign'],
});

export default Text;
