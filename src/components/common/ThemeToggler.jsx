import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import Button from '../atoms/Button';

const ThemeToggler = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    // ✅ Set data-theme on <html>
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-6 rounded-full bg-base-200 shadow-md hover:scale-105 transition-transform overflow-hidden mr-3"
      icon={theme === 'light' ? FiSun : FiMoon}
      size="sm">
      {/* <AnimatePresence
        exitBeforeEnter
        initial={false}>
        {theme === 'light' ? (
          <motion.span
            key="sun"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <FiSun />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <FiMoon />
          </motion.span>
        )}
      </AnimatePresence> */}
    </Button>
  );
};

export default ThemeToggler;
