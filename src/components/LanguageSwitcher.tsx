import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 bg-[#1f2327]/80 hover:bg-gray-700 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg transition-colors text-xs lg:text-sm font-medium shadow-sm backdrop-blur-md"
      >
        <span>{i18n.language === 'en' ? 'EN-IN' : 'HI-IN'}</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-[#1f2327]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
          <button 
            onClick={toggleLanguage}
            className="w-full text-left px-4 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            {i18n.language === 'en' ? 'HI-IN' : 'EN-IN'}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            US-AQI
          </button>
        </div>
      )}
    </div>
  );
};
