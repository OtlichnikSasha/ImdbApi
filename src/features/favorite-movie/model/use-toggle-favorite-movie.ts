import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Movie } from '@entities/movie';
import {
  addFavoriteMovie,
  getFavoriteMovies,
  isFavoriteMovie,
  removeFavoriteMovie,
  setFavoriteMovies,
  syncFavoriteMovieInCache,
  syncFavoriteMoviesQueryCache,
} from '@entities/movie';
import { useI18n } from '@shared/i18n';

interface ToggleFavoriteContext {
  previousFavoriteMovies: Movie[];
}

const toggleFavoriteMovieRequest = (): Promise<void> => {
  // Emulation of a server request
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

export const useToggleFavoriteMovie = () => {
  const queryClient = useQueryClient();
  const { language } = useI18n();

  return useMutation<void, Error, Movie, ToggleFavoriteContext>({
    mutationFn: toggleFavoriteMovieRequest,
    onMutate: async (movie) => {
      await queryClient.cancelQueries();

      const previousFavoriteMovies = getFavoriteMovies();
      const nextIsFavorite = !isFavoriteMovie(movie.id);
      const nextFavoriteMovies = nextIsFavorite
        ? addFavoriteMovie(movie)
        : removeFavoriteMovie(movie.id);

      syncFavoriteMovieInCache(queryClient, movie.id, nextIsFavorite);
      syncFavoriteMoviesQueryCache(queryClient, language, nextFavoriteMovies);

      return { previousFavoriteMovies };
    },
    onError: (_error, movie, context) => {
      if (!context) {
        return;
      }

      setFavoriteMovies(context.previousFavoriteMovies);
      syncFavoriteMovieInCache(queryClient, movie.id, isFavoriteMovie(movie.id));
      syncFavoriteMoviesQueryCache(queryClient, language, context.previousFavoriteMovies);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: ['favoriteMovies'],
        refetchType: 'active',
      });
    },
  });
};
