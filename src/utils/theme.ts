const SUPPORTED_THEMES = ['light', 'dark', 'honeycomb'] as const;

export type ThemeName = (typeof SUPPORTED_THEMES)[number];

const BODY_THEMES = SUPPORTED_THEMES.map(theme => `theme-${theme}`);

/**
 * Applies the selected theme by updating the body classes and Tailwind "dark" mode state.
 */
export const applyThemeClass = (theme: string): ThemeName => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const normalized = (SUPPORTED_THEMES.includes(theme as ThemeName) ? theme : 'light') as ThemeName;

  const body = document.body;
  const root = document.documentElement;

  body.classList.remove(...BODY_THEMES);
  body.classList.add(`theme-${normalized}`);

  if (normalized === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }

  root.classList.toggle('theme-honeycomb', normalized === 'honeycomb');

  return normalized;
};

