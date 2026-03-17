'use client';

import type { ReactNode } from 'react';
import { tasty } from '@tenphi/tasty';
import Button from './Button';

const Outer = tasty(Button, {
  styles: {
    position: 'relative',
    overflow: 'hidden',
    padding: 0,
    preset: {
      'size=small': 't3 strong',
    },
    $angle: {
      '': '30deg',
      ':hover': '60deg',
      ':active': '90deg',
    },
    transition: 'image, $$angle, $$fill-opacity',
    $transition: '.3s',
    '$fill-opacity': {
      '': '100%',
      ':hover': '70%',
      ':active': '40%',
      '@dark & :hover': '80%',
      '@dark &:active': '60%',
    },
    border: 'none',
    fill: '#white',
    image:
      'conic-gradient(from $angle, #violet-pop-surface.$fill-opacity, #coral-pop-surface.$fill-opacity, #amber-pop-surface.$fill-opacity, #blue-pop-surface.$fill-opacity, #rose-pop-surface.$fill-opacity, #lime-pop-surface.$fill-opacity, #violet-pop-surface.$fill-opacity)',

    Gradient: {
      $: '::before',
      content: '""',
      position: 'absolute',
      inset: 0,
      radius: 'round',
      filter: 'blur(.5x)',
      image:
        'conic-gradient(from $angle, #violet-pop-surface, #coral-pop-surface, #amber-pop-surface, #blue-pop-surface, #rose-pop-surface, #lime-pop-surface, #violet-pop-surface)',
    },

    Glass: {
      $: '::after',
      content: '""',
      position: 'absolute',
      inset: 0,
      radius: 'round',
      image:
        'linear-gradient(to bottom, #white.3 0%, #white.0 50%, #black.0 50%, #black.3 100%)',
      shadow: {
        '': 'inset 0 0 0 1bw #white.5',
        '@dark': 'inset 0 0 0 1bw #white.2',
      },
    },
  },
});

const Content = tasty({
  styles: {
    position: 'relative',
    display: 'inline-flex',
    placeItems: 'center',
    gap: '1x',
    padding: {
      '': '1.5x 3x',
      '@parent(size=small)': '1x 2x',
    },
  },
});

export default function SpecialButton({
  children,
  size,
  ...props
}: { children?: ReactNode; size?: 'small' } & Record<string, unknown>) {
  return (
    <Outer mods={{ size }} {...props}>
      <Content>{children}</Content>
    </Outer>
  );
}
