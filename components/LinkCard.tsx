import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { LinkItem, Language } from '../types';
import { Icon } from './Icon';
import type { ThemeMode } from '../services/preferences';
import { toolEntryUrl } from '../services/toolLinks';

interface LinkCardProps {
  item: LinkItem;
  lang: Language;
  theme: ThemeMode;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ item, lang, theme, isFavorite, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const href = toolEntryUrl(item.url, theme, lang);

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
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-link-card group relative flex flex-col p-4 rounded-lg transition-all duration-300 ease-out overflow-hidden h-full"
    >
      <div className="flex items-start justify-between mb-3 relative z-10 flex-shrink-0">
        <div className="nav-link-icon p-2.5 rounded-lg transition-colors duration-300">
          <Icon name={item.iconName} size={22} />
        </div>
        
        <div className="flex items-center gap-2">
           <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`nav-favorite-button p-1.5 rounded-md transition-all duration-200 ${
              isFavorite
                ? 'is-active'
                : ''
            }`}
            title={isFavorite ? (lang === 'cn' ? '取消收藏' : 'Remove favorite') : (lang === 'cn' ? '收藏' : 'Favorite')}
            aria-label={isFavorite ? (lang === 'cn' ? '取消收藏' : 'Remove favorite') : (lang === 'cn' ? '收藏' : 'Favorite')}
          >
            <Star 
              className={`w-4 h-4 transition-transform duration-200 ${isFavorite ? 'fill-current scale-110' : 'scale-100'}`} 
            />
          </button>
          
          <ExternalLink className="nav-external-icon w-4 h-4 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="nav-link-title text-base font-semibold mb-1 transition-colors flex-shrink-0">
          {item.title[lang]}
        </h3>
        <div className="relative flex-grow flex flex-col">
          <p 
            ref={descRef}
            className={`nav-link-description text-sm transition-all duration-300 ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
            style={{ minHeight: isExpanded ? 'auto' : '2.5em' }}
          >
            {item.description ? item.description[lang] : ''}
          </p>
          
          {(showExpandButton || isExpanded) && (
            <div className="flex justify-start mt-2 pt-1">
              <button
                onClick={handleToggleExpand}
                className="nav-expand-button flex items-center gap-1 text-xs font-medium transition-colors px-2 py-1 rounded-md"
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
