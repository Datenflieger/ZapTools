import { useEffect, useState } from 'react';

const STORAGE_KEY = 'zaptools-theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  return 'system';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    const updateTheme = (event?: MediaQueryListEvent) => {
      setResolvedTheme(event?.matches ?? mediaQuery.matches ? 'dark' : 'light');
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  useEffect(() => {
    const appliedTheme = theme === 'system' ? resolvedTheme : theme;
    document.documentElement.classList.toggle('dark', appliedTheme === 'dark');
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [resolvedTheme, theme]);

  return {
    theme,
    resolvedTheme,
    toggleTheme: () =>
      setTheme((value) =>
        value === 'system' ? 'light' : value === 'light' ? 'dark' : 'system',
      ),
  };
};
