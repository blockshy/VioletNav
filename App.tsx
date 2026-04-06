import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { LinkCard } from './components/LinkCard';
import { Footer } from './components/Footer';
import { navigationData } from './data';
import { Language, Category } from './types';
import { Hash, Search, Star } from 'lucide-react';

const App: React.FC = () => {
  // Theme State: Defaults to dark
  const [darkMode, setDarkMode] = useState<boolean>(true);
  
  // Language State: Defaults to 'cn'
  const [lang, setLang] = useState<Language>('cn');
  
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

  // Apply dark mode class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('violet-nav-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleLang = () => setLang(prev => (prev === 'cn' ? 'en' : 'cn'));

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-violet-100 dark:selection:bg-violet-900 selection:text-violet-900 dark:selection:text-violet-100">
      
      <Header 
        darkMode={darkMode} 
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity duration-500 ease-in-out relative">
        
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {lang === 'cn' ? '未找到结果' : 'No results found'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {lang === 'cn' ? '尝试搜索其他关键词' : 'Try adjusting your search query'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const isFavoritesCategory = category.id === 'my-favorites';
              return (
                <section key={category.id} className="scroll-mt-24" id={category.id}>
                  <div className={`flex items-center gap-2 mb-6 border-l-4 pl-3 ${isFavoritesCategory ? 'border-yellow-400' : 'border-violet-500'}`}>
                    {isFavoritesCategory && <Star className="w-6 h-6 text-yellow-400 fill-current" />}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                      {category.title[lang]}
                    </h2>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-600 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800">
                      {category.items.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {category.items.map((item) => (
                      <LinkCard 
                        key={`${category.id}-${item.id}`} // Ensure key is unique when item appears in both favorites and regular list
                        item={item} 
                        lang={lang} 
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
             <nav className="flex flex-col gap-1 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300">
               {filteredCategories.map(cat => {
                 const isFav = cat.id === 'my-favorites';
                 return (
                  <a 
                    key={cat.id} 
                    href={`#${cat.id}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isFav 
                      ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20' 
                      : 'text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:text-gray-400 dark:hover:bg-violet-900/20 dark:hover:text-violet-400'
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