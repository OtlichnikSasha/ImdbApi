import { useCallback, useSyncExternalStore } from 'react';

import { getLanguageConfig } from './config';
import {
  getCurrentLanguage,
  setCurrentLanguage,
  subscribeLanguage,
  translate,
} from './translation-store';
import type { TranslationKey, TranslationParams } from './types';

export const useI18n = () => {
  const language = useSyncExternalStore(
    subscribeLanguage,
    getCurrentLanguage,
    getCurrentLanguage,
  );
  const languageConfig = getLanguageConfig(language);
  const t = useCallback(
    (key: TranslationKey, params?: TranslationParams) => translate(key, params, language),
    [language],
  );

  return {
    apiLanguage: languageConfig.apiLanguage,
    language,
    setLanguage: setCurrentLanguage,
    t,
  };
};
