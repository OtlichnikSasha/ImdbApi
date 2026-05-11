import type { en } from './locales/en';

export type LanguageCode = 'de' | 'en' | 'es';
export type TranslationKey = keyof typeof en;
export type TranslationParams = Record<string, string | number>;
