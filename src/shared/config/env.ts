const getStringEnv = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback;

export const env = {
  apiBaseUrl: getStringEnv(import.meta.env.VITE_API_BASE_URL, 'https://api.themoviedb.org'),
  tmdbAccessToken: getStringEnv(import.meta.env.VITE_TMDB_ACCESS_TOKEN, ''),
} as const;
