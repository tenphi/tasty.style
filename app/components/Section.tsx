'use client';

import { tasty } from '@tenphi/tasty';

const Section = tasty({
  as: 'section',
  styles: {
    display: 'flex',
    flow: 'column',
    align: 'center',
    padding: {
      '': '10x 4x',
      '@mobile': '6x 2x',
    },
    gap: '4x',
    width: 'max ($content-width, 1200px)',
    margin: 'auto left right',
    Title: {
      $: '>',
      preset: {
        '': 'h1',
        '@mobile': 'h2',
      },
      color: '#text',
      textAlign: 'center',
      textWrap: 'balance',
      margin: 0,
    },
    Subtitle: {
      $: '>',
      preset: 't1',
      color: '#text-soft',
      textAlign: 'center',
      textWrap: 'balance',
      width: 'max 600px',
      margin: 0,
    },
    Content: {
      $: '>',
      display: 'flex',
      flow: 'column',
      gap: '4x',
      width: '100%',
    },
  },
  elements: {
    Title: 'h2',
    Subtitle: 'p',
    Content: 'div',
  },
  styleProps: ['padding', 'gap', 'fill'],
});

export default Section;
