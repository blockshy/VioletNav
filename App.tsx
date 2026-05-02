import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { LinkCard } from './components/LinkCard';
import { Footer } from './components/Footer';
import { navigationData } from './data';
import { Language, Category } from './types';
import { Hash, Search, Star } from 'lucide-react';
import {
  applyLanguage,
  applyTheme,
  cleanupLanguageQueryParam,
  cleanupThemeQueryParam,
  readInitialLanguage,
  readInitialTheme,
} from './services/preferences';
import type { ThemeMode } from './services/preferences';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => readInitialTheme());
  const [lang, setLang] = useState<Language>(() => readInitialLanguage());
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Favorites State: Persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('violet-nav-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    applyTheme(theme);
    cleanupThemeQueryParam();
  }, [theme]);

  useEffect(() => {
    applyLanguage(lang);
    cleanupLanguageQueryParam();
  }, [lang]);

  useEffect(() => {
    const canonicalHref = `${window.location.origin}/`;
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    let description = document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = 'VioletNav 导航页，集中整理 FluxFiles、歌词工具、音频播放器、ICO 生成器与番茄钟等实用网站入口。';

    let robots = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'index,follow';
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('violet-nav-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang(prev => (prev === 'cn' ? 'en' : 'cn'));
  const darkMode = theme === 'dark';

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Filter Categories based on search query AND Favorites logic
  const filteredCategories = useMemo(() => {
    // 1. Gather Favorite Items across all categories
    const allItems = navigationData.categories.flatMap(c => c.items);
    const favoriteItems = allItems.filter(item => favorites.includes(item.id));
    
    // 2. Create dynamic "Favorites" category if needed
    const favoritesCategory: Category | null = favoriteItems.length > 0 ? {
      id: 'my-favorites',
      title: { cn: '我的收藏', en: 'My Favorites' },
      items: favoriteItems
    } : null;

    // 3. Combine with static categories
    // We keep items in their original categories as well for classification
    const rawCategories = favoritesCategory 
      ? [favoritesCategory, ...navigationData.categories]
      : [...navigationData.categories];

    // 4. Filter logic (Search)
    if (!searchQuery.trim()) return rawCategories;

    const query = searchQuery.toLowerCase();
    
    return rawCategories.map(cat => {
      // Check if category title matches
      const catMatches = cat.title[lang].toLowerCase().includes(query);
      
      // Check if items match
      const matchingItems = cat.items.filter(item => 
        item.title[lang].toLowerCase().includes(query) || 
        (item.description && item.description[lang].toLowerCase().includes(query))
      );

      // Return category if it matches or has matching items
      if (catMatches || matchingItems.length > 0) {
        return {
          ...cat,
          items: matchingItems.length > 0 ? matchingItems : cat.items
        } as Category;
      }
      return null;
    }).filter((cat): cat is Category => cat !== null && cat.items.length > 0);

  }, [searchQuery, lang, favorites]);

  return (
    <div className="nav-app min-h-screen flex flex-col font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100">
      
      <Header 
        theme={theme}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="nav-main flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity duration-500 ease-in-out relative">
        
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="nav-empty-icon p-4 rounded-full mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium nav-text">
              {lang === 'cn' ? '未找到结果' : 'No results found'}
            </h3>
            <p className="nav-muted mt-1">
              {lang === 'cn' ? '尝试搜索其他关键词' : 'Try adjusting your search query'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const isFavoritesCategory = category.id === 'my-favorites';
              return (
                <section key={category.id} className="scroll-mt-24" id={category.id}>
                  <div className={`nav-section-heading flex items-center gap-2 mb-6 border-l-4 pl-3 ${isFavoritesCategory ? 'is-favorite' : ''}`}>
                    {isFavoritesCategory && <Star className="w-6 h-6 text-yellow-400 fill-current" />}
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                      {category.title[lang]}
                    </h2>
                    <span className="nav-count-badge text-xs font-mono px-2 py-0.5 rounded-md">
                      {category.items.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {category.items.map((item) => (
                      <LinkCard 
                        key={`${category.id}-${item.id}`} // Ensure key is unique when item appears in both favorites and regular list
                        item={item} 
                        lang={lang} 
                        theme={theme}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Floating Quick Jump (Only visible on large screens) */}
        {filteredCategories.length > 0 && (
          <div className="hidden 2xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40 w-48">
             <nav className="nav-quick-jump flex flex-col gap-1 p-2 backdrop-blur-md rounded-lg transition-all duration-300">
               {filteredCategories.map(cat => {
                 const isFav = cat.id === 'my-favorites';
                 return (
                  <a 
                    key={cat.id} 
                    href={`#${cat.id}`}
                    className={`nav-quick-link flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group ${
                      isFav
                      ? 'is-favorite'
                      : ''
                    }`}
                  >
                    {isFav ? (
                      <Star className="w-4 h-4 fill-current flex-shrink-0" />
                    ) : (
                      <Hash className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium truncate">
                      {cat.title[lang]}
                    </span>
                  </a>
                 );
               })}
             </nav>
          </div>
        )}

      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default App;
