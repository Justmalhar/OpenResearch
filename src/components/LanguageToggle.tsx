import { Languages } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useApp();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
      title={language === 'ar' ? 'تغيير اللغة' : 'Change language'}
    >
      <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      <span className="sr-only">{language === 'ar' ? 'تغيير اللغة' : 'Change language'}</span>
    </button>
  );
}