import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ThemeMode = 'light' | 'dark' | 'system';
type ThemeColor = 'yellow' | 'blue' | 'green' | 'purple' | 'pink';

export interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  defaultColor?: ThemeColor;
  storageKey?: string;
}

const colorThemes = {
  yellow: {
    light: {
      primary: 'hsl(42, 91%, 65%)',
      'primary-foreground': 'hsl(0, 0%, 20%)',
      'primary-hover': 'hsl(42, 91%, 60%)',
      'primary-active': 'hsl(42, 91%, 55%)',
      'primary-subtle': 'hsl(42, 91%, 95%)',
    },
    dark: {
      primary: 'hsl(42, 91%, 55%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(42, 91%, 60%)',
      'primary-active': 'hsl(42, 91%, 65%)',
      'primary-subtle': 'hsla(42, 91%, 20%, 0.2)',
    },
  },
  blue: {
    light: {
      primary: 'hsl(217, 91%, 65%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(217, 91%, 60%)',
      'primary-active': 'hsl(217, 91%, 50%)',
      'primary-subtle': 'hsl(217, 91%, 95%)',
    },
    dark: {
      primary: 'hsl(217, 91%, 65%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(217, 91%, 70%)',
      'primary-active': 'hsl(217, 91%, 75%)',
      'primary-subtle': 'hsla(217, 91%, 20%, 0.2)',
    },
  },
  green: {
    light: {
      primary: 'hsl(142, 76%, 45%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(142, 76%, 40%)',
      'primary-active': 'hsl(142, 76%, 35%)',
      'primary-subtle': 'hsl(142, 76%, 95%)',
    },
    dark: {
      primary: 'hsl(142, 76%, 55%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(142, 76%, 60%)',
      'primary-active': 'hsl(142, 76%, 65%)',
      'primary-subtle': 'hsla(142, 76%, 20%, 0.2)',
    },
  },
  purple: {
    light: {
      primary: 'hsl(262, 83%, 65%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(262, 83%, 60%)',
      'primary-active': 'hsl(262, 83%, 55%)',
      'primary-subtle': 'hsl(262, 83%, 95%)',
    },
    dark: {
      primary: 'hsl(262, 83%, 65%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(262, 83%, 70%)',
      'primary-active': 'hsl(262, 83%, 75%)',
      'primary-subtle': 'hsla(262, 83%, 20%, 0.2)',
    },
  },
  pink: {
    light: {
      primary: 'hsl(330, 81%, 65%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(330, 81%, 60%)',
      'primary-active': 'hsl(330, 81%, 55%)',
      'primary-subtle': 'hsl(330, 81%, 95%)',
    },
    dark: {
      primary: 'hsl(330, 81%, 65%)',
      'primary-foreground': 'hsl(0, 0%, 98%)',
      'primary-hover': 'hsl(330, 81%, 70%)',
      'primary-active': 'hsl(330, 81%, 75%)',
      'primary-subtle': 'hsla(330, 81%, 20%, 0.2)',
    },
  },
} as const;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'system',
  defaultColor = 'yellow',
  storageKey = 'spelling-bee-theme',
}) => {
  const [storedTheme, setStoredTheme] = useLocalStorage<{
    mode: ThemeMode;
    color: ThemeColor;
  }>(storageKey, { mode: defaultMode, color: defaultColor });

  const [mode, setMode] = useState<ThemeMode>(storedTheme.mode);
  const [color, setColor] = useState<ThemeColor>(storedTheme.color);
  const [isDark, setIsDark] = useState(false);

  // Update stored theme when mode or color changes
  useEffect(() => {
    setStoredTheme({ mode, color });
  }, [mode, color, setStoredTheme]);

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all color theme classes
    Object.keys(colorThemes).forEach((themeColor) => {
      root.classList.remove(`theme-${themeColor}`);
    });
    
    // Add current color theme class
    root.classList.add(`theme-${color}`);
    
    // Set data-theme attribute based on mode
    if (mode === 'system') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isSystemDark);
      root.setAttribute('data-theme', isSystemDark ? 'dark' : 'light');
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      const isDarkMode = mode === 'dark';
      setIsDark(isDarkMode);
      root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [mode, color]);

  // Set CSS variables based on theme
  useEffect(() => {
    const root = document.documentElement;
    const theme = isDark ? 'dark' : 'light';
    const colors = colorThemes[color][theme];
    
    // Set primary color variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Set background and text colors
    if (isDark) {
      root.style.setProperty('--color-bg', 'hsl(222.2, 84%, 4.9%)');
      root.style.setProperty('--color-bg-elevated', 'hsl(222.2, 84%, 8%)');
      root.style.setProperty('--color-text', 'hsl(210, 40%, 98%)');
      root.style.setProperty('--color-text-muted', 'hsl(215, 20%, 65%)');
      root.style.setProperty('--color-border', 'hsl(217.2, 32.6%, 17.5%)');
    } else {
      root.style.setProperty('--color-bg', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--color-bg-elevated', 'hsl(0, 0%, 98%)');
      root.style.setProperty('--color-text', 'hsl(222.2, 84%, 4.9%)');
      root.style.setProperty('--color-text-muted', 'hsl(215.4, 16.3%, 46.9%)');
      root.style.setProperty('--color-border', 'hsl(214.3, 31.8%, 91.4%)');
    }
  }, [isDark, color]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const value = {
    mode,
    color,
    isDark,
    setMode,
    setColor,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme toggle component
export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme, isDark } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

// Color picker component
export const ColorPicker: React.FC = () => {
  const { color, setColor } = useTheme();
  
  return (
    <div className="flex space-x-2">
      {Object.keys(colorThemes).map((themeColor) => (
        <button
          key={themeColor}
          onClick={() => setColor(themeColor as ThemeColor)}
          className={`w-6 h-6 rounded-full ${
            color === themeColor ? 'ring-2 ring-offset-2 ring-gray-400' : ''
          }`}
          style={{
            backgroundColor: colorThemes[themeColor as ThemeColor].light.primary,
          }}
          aria-label={`Change theme to ${themeColor}`}
        />
      ))}
    </div>
  );
};

export default ThemeProvider;
