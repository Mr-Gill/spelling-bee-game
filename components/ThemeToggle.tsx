import React, { useEffect, useState } from 'react';

const themes = ['light', 'dark', 'honeycomb'] as const;
type Theme = typeof themes[number];

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const applyTheme = (t: Theme) => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
    document.body.classList.add(`theme-${t}`);
    localStorage.setItem('theme', t);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && themes.includes(saved)) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme('light');
    }
  }, []);

  const handleClick = () => {
    const idx = themes.indexOf(theme);
    const next = themes[(idx + 1) % themes.length];
    setTheme(next);
    applyTheme(next);
  };

  const icon = theme === 'light' ? '🌞' : theme === 'dark' ? '🌙' : '🍯';

  return (
    <button className="theme-toggle" onClick={handleClick} aria-label="Toggle theme">
      {icon}
    </button>
  );
};

export default ThemeToggle;
