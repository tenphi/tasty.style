'use client';

import { useState, useEffect } from 'react';
import { IconContrast, IconContrastFilled } from '@tabler/icons-react';
import Switcher from '@/app/ui/Switcher';

const CONTRAST_OPTIONS = [
  {
    value: 'normal',
    label: <IconContrast size={16} stroke={1.5} />,
    'aria-label': 'Normal contrast',
  },
  {
    value: 'more',
    label: <IconContrastFilled size={16} stroke={1.5} />,
    'aria-label': 'High contrast',
  },
];

function getSystemContrast(): string {
  return matchMedia('(prefers-contrast: more)').matches ? 'more' : 'normal';
}

export default function ContrastSwitcher() {
  const [contrast, setContrast] = useState('normal');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: reads browser-only API on mount
    setContrast(getSystemContrast());
  }, []);

  function handleChange(value: string) {
    setContrast(value);
    document.documentElement.dataset.contrast = value;
  }

  return (
    <Switcher
      options={CONTRAST_OPTIONS}
      value={contrast}
      onChange={handleChange}
    />
  );
}
