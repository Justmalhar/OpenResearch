import { Sun, Moon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode, language } = useApp();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      title={language === 'ar' ? 'تبديل المظهر' : 'Toggle theme'}
      aria-label={language === 'ar' ? 'تبديل المظهر' : 'Toggle theme'}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500 transform transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}