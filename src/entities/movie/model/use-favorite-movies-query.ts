import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@shared/api/client';
import { useI18n } from '@shared/i18n';

import { getFavoriteMovies, setFavoriteMovies } from './favorite-movies-storage';
import { movieQueryKeys } from './movie-query-keys';
import { tmdbMovieDetailsSchema } from './schemas';
import type { Movie } from './schemas';
import { mapTmdbDetailsToMovieDetails } from './tmdb-mapper';

interface UseFavoriteMoviesQueryOptions {
  refresh?: boolean;
}

const getFreshFavoriteMovies = async (favoriteMovies: Movie[]): Promise<Movie[]> => {
  if (favoriteMovies.length === 0) {
    return [];
  }

  const movies = await Promise.all(
    favoriteMovies.map(async (movie) => {
      const { data, error } = await apiClient.GET('/3/movie/{movie_id}', {
        params: {
          path: {
            movie_id: Number(movie.id),
          },
          query: {
            append_to_response: 'credits',
          },
        },
      });

      if (error) {
        throw new Error('Favorite movie details could not be loaded');
      }

      return mapTmdbDetailsToMovieDetails(tmdbMovieDetailsSchema.parse(data));
    }),
  );

  return setFavoriteMovies(movies);
};

export const useFavoriteMoviesQuery = ({ refresh = true }: UseFavoriteMoviesQueryOptions = {}) => {
  const { language } = useI18n();

  return useQuery({
    enabled: refresh,
    initialData: getFavoriteMovies,
    queryFn: () => (refresh ? getFreshFavoriteMovies(getFavoriteMovies()) : getFavoriteMovies()),
    queryKey: movieQueryKeys.favorites(language),
    refetchOnMount: true,
    staleTime: refresh ? 0 : Number.POSITIVE_INFINITY,
  });
};
