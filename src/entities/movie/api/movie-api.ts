import type { InfiniteData } from '@tanstack/react-query';

import { apiQueryClient } from '@shared/api/client';
import { useI18n } from '@shared/i18n';

import { markMovieFavoriteState } from '../model/favorite-movies-storage';
import { tmdbMovieDetailsSchema, tmdbMovieListResponseSchema } from '../model/schemas';
import type { Movie, MovieDetails } from '../model/schemas';
import { mapTmdbDetailsToMovieDetails, mapTmdbMovieToMovie } from '../model/tmdb-mapper';
import { useFavoriteMoviesQuery } from '../model/use-favorite-movies-query';

interface MoviePage {
  movies: Movie[];
  page: number;
  totalPages: number;
}

interface InfiniteMoviePages {
  pageParams: unknown[];
  pages: MoviePage[];
}

const mapMoviePage = (data: unknown): MoviePage => {
  const response = tmdbMovieListResponseSchema.parse(data);

  return {
    movies: response.results.map(mapTmdbMovieToMovie).map(markMovieFavoriteState),
    page: response.page,
    totalPages: Math.min(response.total_pages, 500),
  };
};

const getNextMoviePageParam = (lastPage: unknown): number | undefined => {
  const response = tmdbMovieListResponseSchema.parse(lastPage);
  const totalPages = Math.min(response.total_pages, 500);

  return response.page < totalPages ? response.page + 1 : undefined;
};

const selectInfiniteMoviePages = (data: InfiniteData<unknown>): InfiniteMoviePages => ({
  pageParams: data.pageParams,
  pages: data.pages.map(mapMoviePage),
});

export const usePopularMoviesQuery = () => {
  const { apiLanguage } = useI18n();

  return apiQueryClient.useSuspenseQuery(
    'get',
    '/3/movie/popular',
    {
      language: apiLanguage,
      params: {
        query: {
          page: 1,
        },
      },
    },
    {
      select: (data): Movie[] =>
        tmdbMovieListResponseSchema.parse(data).results.map(mapTmdbMovieToMovie).map(markMovieFavoriteState),
    },
  );
};

export const usePopularMoviesInfiniteQuery = () => {
  const { apiLanguage } = useI18n();

  return apiQueryClient.useInfiniteQuery(
    'get',
    '/3/movie/popular',
    {
      language: apiLanguage,
      params: {
        query: {
          page: 1,
        },
      },
    },
    {
      getNextPageParam: getNextMoviePageParam,
      initialPageParam: 1,
      pageParamName: 'page',
      select: selectInfiniteMoviePages,
    },
  );
};

export const useSearchMoviesQuery = (search: string) => {
  const { apiLanguage } = useI18n();

  return apiQueryClient.useSuspenseQuery(
    'get',
    '/3/search/movie',
    {
      language: apiLanguage,
      params: {
        query: {
          include_adult: false,
          page: 1,
          query: search,
        },
      },
    },
    {
      select: (data): Movie[] => {
        return tmdbMovieListResponseSchema.parse(data).results.map(mapTmdbMovieToMovie).map(markMovieFavoriteState);
      },
    },
  );
};

export const useSearchMoviesInfiniteQuery = (search: string) => {
  const { apiLanguage } = useI18n();

  return apiQueryClient.useInfiniteQuery(
    'get',
    '/3/search/movie',
    {
      language: apiLanguage,
      params: {
        query: {
          include_adult: false,
          page: 1,
          query: search,
        },
      },
    },
    {
      enabled: search.trim().length > 0,
      getNextPageParam: getNextMoviePageParam,
      initialPageParam: 1,
      pageParamName: 'page',
      select: selectInfiniteMoviePages,
    },
  );
};

export const useMovieDetailsQuery = (movieId: string) => {
  const { apiLanguage } = useI18n();

  return apiQueryClient.useSuspenseQuery(
    'get',
    '/3/movie/{movie_id}',
    {
      language: apiLanguage,
      params: {
        path: {
          movie_id: Number(movieId),
        },
        query: {
          append_to_response: 'credits',
        },
      },
    },
    {
      enabled: movieId.length > 0 && !Number.isNaN(Number(movieId)),
      select: (data): MovieDetails =>
        markMovieFavoriteState(mapTmdbDetailsToMovieDetails(tmdbMovieDetailsSchema.parse(data))),
    },
  );
};

export { useFavoriteMoviesQuery };
