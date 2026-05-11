import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { getLanguageConfig } from './config';
import { useI18n } from './use-i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const queryClient = useQueryClient();
  const { language, t } = useI18n();

  useEffect(() => {
    document.documentElement.lang = getLanguageConfig(language).htmlLang;
    document.title = t('Movie Explorer');

    void queryClient.invalidateQueries({ refetchType: 'active' });
  }, [language, queryClient, t]);

  return children;
};
