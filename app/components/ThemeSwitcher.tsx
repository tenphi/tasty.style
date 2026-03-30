'use client';

import { IconSun, IconMoon } from '@tabler/icons-react';
import Switcher from '@/app/ui/Switcher';
import { useTheme } from './ThemeContext';

const THEME_OPTIONS = [
  {
    value: 'light',
    label: <IconSun size={16} stroke={1.5} />,
    'aria-label': 'Light theme',
  },
  {
    value: 'dark',
    label: <IconMoon size={16} stroke={1.5} />,
    'aria-label': 'Dark theme',
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Switcher options={THEME_OPTIONS} value={theme} onChange={setTheme} />
  );
}
