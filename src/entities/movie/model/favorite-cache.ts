import type { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query';

import type { LanguageCode } from '@shared/i18n';

import { getFavoriteMovies } from './favorite-movies-storage';
import { movieQueryKeys } from './movie-query-keys';
import type { Movie, MovieDetails } from './schemas';

interface MoviePage {
  movies: Movie[];
  page: number;
  totalPages: number;
}

interface InfiniteMoviePages {
  pageParams: unknown[];
  pages: MoviePage[];
}

type CachedMovieData = Movie | MovieDetails | Movie[] | MovieDetails[] | InfiniteMoviePages | InfiniteData<unknown>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isMovie = (value: unknown): value is Movie =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.title === 'string' &&
  typeof value.isFavorite === 'boolean';

const isMoviePage = (value: unknown): value is MoviePage =>
  isRecord(value) && Array.isArray(value.movies);

const isInfiniteMoviePages = (value: unknown): value is InfiniteMoviePages =>
  isRecord(value) && Array.isArray(value.pages) && value.pages.every(isMoviePage);

const updateMovie = <TMovie extends Movie>(movie: TMovie, movieId: string, isFavorite: boolean): TMovie =>
  movie.id === movieId ? { ...movie, isFavorite } : movie;

const updateMovieData = (data: unknown, movieId: string, isFavorite: boolean): unknown => {
  if (isMovie(data)) {
    return updateMovie(data, movieId, isFavorite);
  }

  if (Array.isArray(data) && data.every(isMovie)) {
    return data.map((movie) => updateMovie(movie, movieId, isFavorite));
  }

  if (isInfiniteMoviePages(data)) {
    return {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        movies: page.movies.map((movie) => updateMovie(movie, movieId, isFavorite)),
      })),
    };
  }

  return data;
};

const isOpenApiMovieQuery = (queryKey: QueryKey): boolean =>
  queryKey[0] === 'get' &&
  (queryKey[1] === '/3/movie/popular' ||
    queryKey[1] === '/3/search/movie' ||
    queryKey[1] === '/3/movie/{movie_id}');

export const syncFavoriteMovieInCache = (
  queryClient: QueryClient,
  movieId: string,
  isFavorite: boolean,
): void => {
  queryClient
    .getQueriesData<CachedMovieData>({ predicate: (query) => isOpenApiMovieQuery(query.queryKey) })
    .forEach(([queryKey, data]) => {
      queryClient.setQueryData(queryKey, updateMovieData(data, movieId, isFavorite));
    });
};

export const syncFavoriteMoviesQueryCache = (
  queryClient: QueryClient,
  language: LanguageCode,
  movies = getFavoriteMovies(),
): void => {
  queryClient.setQueryData(movieQueryKeys.favorites(language), movies);
};
