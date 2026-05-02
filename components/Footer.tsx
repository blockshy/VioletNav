import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="nav-footer w-full py-8 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="nav-muted text-sm">
          &copy; {new Date().getFullYear()} VioletNav. {lang === 'cn' ? '保留所有权利。' : 'All rights reserved.'}
        </p>
        <p className="nav-subtle text-xs mt-2">
          {lang === 'cn' ? '极简 • 高效 • 实用' : 'Minimal • Efficient • Useful'}
        </p>
      </div>
    </footer>
  );
};
