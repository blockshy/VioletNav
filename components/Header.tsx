import React from 'react';
import { Sun, Moon, Search, Globe } from 'lucide-react';
import { Language } from '../types';
import type { ThemeMode } from '../services/preferences';

interface HeaderProps {
  theme: ThemeMode;
  darkMode: boolean;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme,
  darkMode, 
  toggleTheme, 
  lang, 
  toggleLang,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="nav-header sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="nav-brand-mark w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            V
          </div>
          <h1 className="nav-brand-title text-xl font-bold hidden sm:block">
            VioletNav
          </h1>
        </div>

        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="nav-search-icon h-4 w-4" />
          </div>
          <input
            type="text"
            className="nav-search-input block w-full pl-10 pr-3 py-2 rounded-lg leading-5 sm:text-sm transition-all duration-200"
            placeholder={lang === 'cn' ? "搜索导航..." : "Search links..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={toggleLang}
            className="nav-action-button px-2 rounded-lg transition-colors duration-200 flex items-center gap-1.5"
            aria-label={lang === 'cn' ? 'Switch to English' : '切换中文'}
            title={lang === 'cn' ? 'Switch to English' : '切换中文'}
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline-block">
              {lang === 'cn' ? 'EN' : '中'}
            </span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="nav-action-button rounded-lg transition-colors duration-200"
            aria-label={theme === 'dark' ? (lang === 'cn' ? '切换到浅色模式' : 'Switch to light mode') : (lang === 'cn' ? '切换到深色模式' : 'Switch to dark mode')}
            title={theme === 'dark' ? (lang === 'cn' ? '切换到浅色模式' : 'Switch to light mode') : (lang === 'cn' ? '切换到深色模式' : 'Switch to dark mode')}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
