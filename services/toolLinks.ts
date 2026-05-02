import type { Language } from '../types';
import type { ThemeMode } from './preferences';
import { languageParam } from './preferences';

const protocolAwareHosts = new Set([
  'ico.tyukki.com',
  'dev.ico.tyukki.com',
  'lyrics.tyukki.com',
  'dev.lyrics.tyukki.com',
  'timer.tyukki.com',
  'dev.timer.tyukki.com',
  'nav.tyukki.com',
  'dev.nav.tyukki.com',
]);

export function toolEntryUrl(rawUrl: string, theme: ThemeMode, language: Language) {
  try {
    const url = new URL(rawUrl);
    if (!protocolAwareHosts.has(url.hostname.toLowerCase())) {
      return rawUrl;
    }

    url.searchParams.set('theme', theme);
    url.searchParams.set('lang', languageParam(language));
    return url.toString();
  } catch {
    return rawUrl;
  }
}
