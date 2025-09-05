import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import Button from '../atoms/Button';

const THEME_OPTIONS = {
  light: { label: 'Light', icon: FiSun },
  dark: { label: 'Dark', icon: FiMoon },
  system: { label: 'System', icon: FiMonitor },
};

const ThemeToggler = ({ mode = 'toggle' }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    const applyTheme = (themeValue) => {
      if (themeValue === 'system') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        themeValue = prefersDark ? 'dark' : 'light';
      }

      if (themeValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      document.documentElement.setAttribute('data-theme', themeValue);
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    // 🔄 Live system theme sync
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (mode === 'options') {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(THEME_OPTIONS).map(([key, { label, icon }]) => {
          const Icon = icon;
          return (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all capitalize ${
                theme === key
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}>
              <Icon className="text-xl" />
              <div className="text-t-primary font-medium">{label}</div>
            </button>
          );
        })}
      </div>
    );
  }

  const Icon =
    theme === 'system' ? FiMonitor : theme === 'light' ? FiSun : FiMoon;

  return (
    <Button
      onClick={toggleTheme}
      icon={Icon}
      size="sm"
      className="relative overflow-hidden mr-2"
    />
  );
};

export default ThemeToggler;
