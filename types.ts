export type Language = 'cn' | 'en';

export type LocalizedString = {
  cn: string;
  en: string;
};

export interface LinkItem {
  id: string;
  title: LocalizedString;
  url: string;
  description?: LocalizedString;
  iconName: string; // Mapping key for Lucide icons
}

export interface Category {
  id: string;
  title: LocalizedString;
  items: LinkItem[];
}

export interface AppConfig {
  categories: Category[];
}