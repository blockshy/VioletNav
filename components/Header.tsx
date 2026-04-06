import React from 'react';
import { Sun, Moon, Search, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  toggleTheme, 
  lang, 
  toggleLang,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo Area */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30">
            V
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 hidden sm:block">
            VioletNav
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full leading-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-all duration-200 hover:bg-white dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-900"
            placeholder={lang === 'cn' ? "搜索导航..." : "Search links..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={toggleLang}
            className="p-2 rounded-lg text-gray-500 hover:bg-violet-100 hover:text-violet-600 dark:text-gray-400 dark:hover:bg-violet-900/30 dark:hover:text-violet-400 transition-colors duration-200 flex items-center gap-1.5"
            aria-label="Toggle Language"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline-block">
              {lang === 'cn' ? 'EN' : '中'}
            </span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:bg-violet-100 hover:text-violet-600 dark:text-gray-400 dark:hover:bg-violet-900/30 dark:hover:text-violet-400 transition-colors duration-200"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};