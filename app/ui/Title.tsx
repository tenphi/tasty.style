'use client';

import { tasty, BASE_STYLES, OUTER_STYLES } from '@tenphi/tasty';

const Title = tasty({
  as: 'h2',
  styles: {
    preset: 'h3',
    color: '#primary-text',
    margin: 0,
  },
  styleProps: [
    ...BASE_STYLES,
    ...OUTER_STYLES,
    'color',
    'textAlign',
    'textWrap',
  ],
});

export default Title;
