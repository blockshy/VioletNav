import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} VioletNav. {lang === 'cn' ? '保留所有权利。' : 'All rights reserved.'}
        </p>
        <p className="text-gray-400 dark:text-gray-600 text-xs mt-2">
          {lang === 'cn' ? '极简 • 高效 • 实用' : 'Minimal • Efficient • Useful'}
        </p>
      </div>
    </footer>
  );
};