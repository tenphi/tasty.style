'use client';

import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const SwitcherElement = tasty({
  styles: {
    display: 'inline-flex',
    flow: 'row',
    gap: 0,
    padding: '0.25x',
    radius: 'round',
    fill: '#surface-3',
    border: true,
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

const SwitcherOption = tasty({
  as: 'button',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    padding: '.675x',
    preset: 't4',
    radius: 'round',
    cursor: 'pointer',
    transition: 'theme',
    fill: {
      '': 'transparent',
      active: '#surface',
    },
    color: {
      '': '#text-soft',
      active: '#text',
    },
    shadow: {
      '': 'none',
      active: '0 1px 3px #shadow-sm',
    },
    border: 'none',
  },
});

interface SwitcherOptionItem {
  value: string;
  label: React.ReactNode;
  'aria-label'?: string;
}

interface SwitcherProps {
  options: SwitcherOptionItem[];
  value: string;
  onChange: (value: string) => void;
}

export default function Switcher({
  options,
  value,
  onChange,
  ...props
}: SwitcherProps) {
  return (
    <SwitcherElement {...props}>
      {options.map((opt) => (
        <SwitcherOption
          key={opt.value}
          aria-label={opt['aria-label']}
          mods={{ active: opt.value === value }}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </SwitcherOption>
      ))}
    </SwitcherElement>
  );
}
