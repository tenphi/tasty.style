'use client';

import { useState, useEffect } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';
import Switcher from '@/app/ui/Switcher';

const THEME_OPTIONS = [
  { value: 'light', label: <IconSun size={16} stroke={1.5} />, 'aria-label': 'Light theme' },
  { value: 'dark', label: <IconMoon size={16} stroke={1.5} />, 'aria-label': 'Dark theme' },
];

function getSystemTheme(): string {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: reads browser-only API on mount
    setTheme(getSystemTheme());
  }, []);

  function handleChange(value: string) {
    setTheme(value);
    document.documentElement.dataset.schema = value;
  }

  return (
    <Switcher options={THEME_OPTIONS} value={theme} onChange={handleChange} />
  );
}
