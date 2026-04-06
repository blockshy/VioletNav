import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { LinkItem, Language } from '../types';
import { Icon } from './Icon';

interface LinkCardProps {
  item: LinkItem;
  lang: Language;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ item, lang, isFavorite, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const el = descRef.current;
      if (el) {
        // We only calculate overflow when collapsed to decide if we need the button.
        // If already expanded, we keep the button visible (to allow collapsing).
        if (!isExpanded) {
          setShowExpandButton(el.scrollHeight > el.clientHeight);
        }
      }
    };

    // Initial check
    checkOverflow();
    
    // Check on resize in case the card width changes
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [item.description, lang, isExpanded]);

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:via-fuchsia-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
      
      <div className="flex items-start justify-between mb-3 relative z-10 flex-shrink-0">
        <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-violet-600 dark:text-violet-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-300">
          <Icon name={item.iconName} size={22} />
        </div>
        
        <div className="flex items-center gap-2">
           {/* Favorite Button */}
           <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`p-1.5 rounded-md transition-all duration-200 ${
              isFavorite 
                ? 'text-yellow-400 hover:text-yellow-500 bg-yellow-400/10' 
                : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 dark:text-gray-600'
            }`}
            title={isFavorite ? '取消收藏' : '收藏'}
          >
            <Star 
              className={`w-4 h-4 transition-transform duration-200 ${isFavorite ? 'fill-current scale-110' : 'scale-100'}`} 
            />
          </button>
          
          <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-violet-400 dark:text-gray-600 dark:group-hover:text-violet-500 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors flex-shrink-0">
          {item.title[lang]}
        </h3>
        <div className="relative flex-grow flex flex-col">
          <p 
            ref={descRef}
            className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
            style={{ minHeight: isExpanded ? 'auto' : '2.5em' }}
          >
            {item.description ? item.description[lang] : ''}
          </p>
          
          {/* Expand Toggle Button */}
          {(showExpandButton || isExpanded) && (
            <div className="flex justify-start mt-2 pt-1">
              <button
                onClick={handleToggleExpand}
                className="flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors bg-violet-50 dark:bg-violet-900/30 px-2 py-1 rounded-md hover:bg-violet-100 dark:hover:bg-violet-900/50"
              >
                {isExpanded ? (
                   <>
                     <span>{lang === 'cn' ? '收起' : 'Less'}</span>
                     <ChevronUp size={12} />
                   </>
                 ) : (
                   <>
                     <span>{lang === 'cn' ? '展开' : 'More'}</span>
                     <ChevronDown size={12} />
                   </>
                 )}
              </button>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};
