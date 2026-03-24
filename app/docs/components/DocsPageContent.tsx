'use client';

import { tasty } from '@tenphi/tasty';

export const DocsBody = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    width: 'initial 100% 1400px',
    margin: '0 auto',
    placeItems: 'start',
    justifyContent: {
      '': 'center',
      '@desktop': 'start',
    },
  },
});

export const Article = tasty({
  as: 'article',
  styles: {
    display: 'block',
    flex: 1,
    width: '0 initial 800px',
    padding: {
      '': '4x 6x 8x',
      '@mobile': '3x 2x 6x',
    },
  },
});

export const PageTitle = tasty({
  as: 'h1',
  styles: {
    preset: 'h1',
    color: '#primary-text-soft',
    margin: '0 0 4x',
  },
});
