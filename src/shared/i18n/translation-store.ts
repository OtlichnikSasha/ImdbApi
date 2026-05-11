import { defaultLanguage, getLanguageConfig, languages } from './config';
import { de } from './locales/de';
import { en } from './locales/en';
import { es } from './locales/es';
import type { LanguageCode, TranslationKey, TranslationParams } from './types';

const storageKey = 'movie-explorer-language';
const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  de,
  en,
  es,
};

const listeners = new Set<() => void>();

const isLanguageCode = (value: string | null): value is LanguageCode =>
  languages.some((language) => language.code === value);

const readStoredLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const savedLanguage = window.localStorage.getItem(storageKey);

  return isLanguageCode(savedLanguage) ? savedLanguage : defaultLanguage;
};

let currentLanguage = readStoredLanguage();

const emitChange = (): void => {
  listeners.forEach((listener) => listener());
};

export const getCurrentLanguage = (): LanguageCode => currentLanguage;

export const getCurrentApiLanguage = (): string => getLanguageConfig(currentLanguage).apiLanguage;

export const setCurrentLanguage = (language: LanguageCode): void => {
  if (language === currentLanguage) {
    return;
  }

  currentLanguage = language;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, language);
  }

  emitChange();
};

export const subscribeLanguage = (listener: () => void): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const translate = (
  key: TranslationKey,
  params: TranslationParams = {},
  language = currentLanguage,
): string => {
  const template = translations[language][key] ?? translations.en[key] ?? key;

  return Object.entries(params).reduce(
    (value, [paramKey, paramValue]) => value.replaceAll(`{${paramKey}}`, String(paramValue)),
    template,
  );
};
