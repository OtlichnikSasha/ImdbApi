import type { ReactNode } from 'react';

import { I18nProvider } from '@shared/i18n';
import { ThemeProvider } from '@shared/lib/theme';

import { ErrorBoundary } from './error-boundary';
import { QueryProvider } from './query-provider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ErrorBoundary>
    <ThemeProvider>
      <QueryProvider>
        <I18nProvider>{children}</I18nProvider>
      </QueryProvider>
    </ThemeProvider>
  </ErrorBoundary>
);
