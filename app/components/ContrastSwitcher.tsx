'use client';

import { IconContrast, IconContrastFilled } from '@tabler/icons-react';
import Switcher from '@/app/ui/Switcher';
import { useTheme } from './ThemeContext';

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

export default function ContrastSwitcher() {
  const { contrast, setContrast } = useTheme();

  return (
    <Switcher
      options={CONTRAST_OPTIONS}
      value={contrast}
      onChange={setContrast}
    />
  );
}
