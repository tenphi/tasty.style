'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  APPEARANCE_KEY,
  applyAppearance,
  loadAppearance,
  parseContrast,
  parseTheme,
  storeAppearance,
} from '@/app/lib/appearance';

interface ThemeContextValue {
  theme: string;
  contrast: string;
  setTheme: (value: string) => void;
  setContrast: (value: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState('light');
  const [contrast, setContrastState] = useState('normal');

  useEffect(() => {
    const darkScheme = matchMedia('(prefers-color-scheme: dark)');
    const moreContrast = matchMedia('(prefers-contrast: more)');

    // Shows the stored choice, or the system preference when there is none.
    // The docs and other tabs can change the stored choice at any time.
    function sync() {
      const stored = loadAppearance();

      applyAppearance(stored);
      setThemeState(stored.theme ?? (darkScheme.matches ? 'dark' : 'light'));
      setContrastState(
        stored.contrast ?? (moreContrast.matches ? 'more' : 'normal'),
      );
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key === APPEARANCE_KEY) sync();
    }

    // A page restored from the back/forward cache missed changes made in the
    // docs meanwhile.
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) sync();
    }

    const raf = requestAnimationFrame(sync);

    darkScheme.addEventListener('change', sync);
    moreContrast.addEventListener('change', sync);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      cancelAnimationFrame(raf);
      darkScheme.removeEventListener('change', sync);
      moreContrast.removeEventListener('change', sync);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  const setTheme = useCallback((value: string) => {
    const next = parseTheme(value);

    if (!next) return;

    storeAppearance({ theme: next });
    document.documentElement.dataset.schema = next;
    setThemeState(next);
  }, []);

  const setContrast = useCallback((value: string) => {
    const next = parseContrast(value);

    if (!next) return;

    storeAppearance({ contrast: next });
    document.documentElement.dataset.contrast = next;
    setContrastState(next);
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
