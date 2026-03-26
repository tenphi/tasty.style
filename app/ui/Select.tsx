'use client';

import type { ComponentProps } from 'react';
import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';
import { IconChevronDown } from '@tabler/icons-react';

const SelectWrap = tasty({
  styles: {
    position: 'relative',
    display: 'inline-flex',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

export const SelectElement = tasty({
  as: 'select',
  styles: {
    appearance: 'none',
    display: 'inline-flex',
    placeItems: 'center',
    padding: '0.75x 3x 0.75x 1.5x',
    preset: 't3',
    radius: '1r',
    border: true,
    fill: {
      '': '#primary-surface',
      ':hover': '#primary-surface-2',
    },
    color: '#primary-text',
    cursor: 'pointer',
    transition: 'theme',
    font: 'inherit',
    outline: 'none',
    shadow: {
      '': 'none',
      ':focus-visible': 'inset 0 0 0 2px #primary-accent-text',
    },
    width: '100%',
    height: '100%',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

const ChevronIcon = tasty({
  as: 'span',
  styles: {
    position: 'absolute',
    right: '1x',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'inline-flex',
    placeItems: 'center',
    color: 'inherit',
    pointerEvents: 'none',
  },
});

type SelectProps = ComponentProps<typeof SelectElement>;

export default function Select({ children, ...props }: SelectProps) {
  return (
    <SelectWrap>
      <SelectElement {...props}>{children}</SelectElement>
      <ChevronIcon>
        <IconChevronDown size={14} />
      </ChevronIcon>
    </SelectWrap>
  );
}
