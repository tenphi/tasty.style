'use client';

import { useState, useEffect } from 'react';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import Switcher from '@/app/ui/Switcher';

const THEME_OPTIONS = [
  { value: 'light', label: <IconSun size={16} stroke={1.5} /> },
  { value: 'dark', label: <IconMoon size={16} stroke={1.5} /> },
  { value: 'system', label: <IconDeviceDesktop size={16} stroke={1.5} /> },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, []);

  function handleChange(value: string) {
    setTheme(value);
    localStorage.setItem('theme', value);

    if (value === 'system') {
      delete document.documentElement.dataset.schema;
    } else {
      document.documentElement.dataset.schema = value;
    }
  }

  return <Switcher options={THEME_OPTIONS} value={theme} onChange={handleChange} />;
}
