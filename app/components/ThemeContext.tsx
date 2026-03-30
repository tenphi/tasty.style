'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

interface ThemeContextValue {
  theme: string;
  contrast: string;
  setTheme: (value: string) => void;
  setContrast: (value: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): string {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getSystemContrast(): string {
  return matchMedia('(prefers-contrast: more)').matches ? 'more' : 'normal';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState('light');
  const [contrast, setContrastState] = useState('normal');

  useEffect(() => {
    const systemTheme = getSystemTheme();
    const systemContrast = getSystemContrast();

    setThemeState(systemTheme);
    setContrastState(systemContrast);

    document.documentElement.dataset.schema = systemTheme;
    document.documentElement.dataset.contrast = systemContrast;
  }, []);

  const setTheme = useCallback((value: string) => {
    setThemeState(value);
    document.documentElement.dataset.schema = value;
  }, []);

  const setContrast = useCallback((value: string) => {
    setContrastState(value);
    document.documentElement.dataset.contrast = value;
  }, []);

  const value = useMemo(
    () => ({ theme, contrast, setTheme, setContrast }),
    [theme, contrast, setTheme, setContrast],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
