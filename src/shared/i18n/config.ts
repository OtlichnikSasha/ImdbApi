import type { LanguageCode } from './types';

export const languages = [
  {
    apiLanguage: 'en-US',
    code: 'en',
    country: 'United States',
    htmlLang: 'en',
  },
  {
    apiLanguage: 'es-ES',
    code: 'es',
    country: 'Spain',
    htmlLang: 'es',
  },
  {
    apiLanguage: 'de-DE',
    code: 'de',
    country: 'Germany',
    htmlLang: 'de',
  },
] as const;

export const defaultLanguage: LanguageCode = 'en';

export const getLanguageConfig = (language: LanguageCode) =>
  languages.find((languageItem) => languageItem.code === language) ?? languages[0];
