/* eslint-disable no-unused-vars */
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import Button from '../atoms/Button';
import { useTheme } from '../../context/ThemeContext';

const THEME_OPTIONS = {
  light: { label: 'Light', icon: FiSun },
  dark: { label: 'Dark', icon: FiMoon },
  system: { label: 'System', icon: FiMonitor },
};

const ThemeToggler = ({ mode = 'toggle' }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (mode === 'options') {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(THEME_OPTIONS).map(([key, { label, icon: Icon }]) => (
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
        ))}
      </div>
    );
  }

  const Icon =
    theme === 'system' ? FiMonitor : theme === 'light' ? FiSun : FiMoon;

  return (
    <Button
      onClick={toggleTheme}
      icon={Icon}
      size="normal"
      className="w-10 h-10 rounded-full justify-center"
    />
  );
};

export default ThemeToggler;
