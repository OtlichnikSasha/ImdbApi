import type { LanguageCode } from '@shared/i18n';

export const movieQueryKeys = {
  favorites: (language: LanguageCode) => ['favoriteMovies', language] as const,
};
