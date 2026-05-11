import clsx from 'clsx';
import { useState, useSyncExternalStore } from 'react';

import { isFavoriteMovie, subscribeFavoriteMovies } from '@entities/movie';
import type { Movie } from '@entities/movie';
import HeartIcon from '@shared/assets/icons/heart.svg?react';
import { useI18n } from '@shared/i18n';
import { Button } from '@shared/ui/button';

import { useToggleFavoriteMovie } from '../model/use-toggle-favorite-movie';

interface ToggleFavoriteButtonProps {
  iconOnly?: boolean;
  movie: Movie;
}

export const ToggleFavoriteButton = ({ iconOnly = false, movie }: ToggleFavoriteButtonProps) => {
  const { t } = useI18n();
  const mutation = useToggleFavoriteMovie();
  const storedIsFavorite = useSyncExternalStore(
    subscribeFavoriteMovies,
    () => isFavoriteMovie(movie.id),
    () => movie.isFavorite,
  );

  const [optimisticFavorite, setOptimisticFavorite] = useState<{
    movieId: string;
    value: boolean;
  } | null>(null);

  const isFavorite =
    optimisticFavorite?.movieId === movie.id ? optimisticFavorite.value : storedIsFavorite;
  const label = isFavorite ? t('Remove from favorites') : t('Add to favorites');

  const toggleFavorite = (): void => {
    setOptimisticFavorite({ movieId: movie.id, value: !isFavorite });
    mutation.mutate(movie, {
      onSettled: () => setOptimisticFavorite(null),
    });
  };

  if (iconOnly) {
    return (
      <button
        aria-label={label}
        aria-pressed={isFavorite}
        title={label}
        className={clsx(
          'inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/95 text-slate-950 shadow-[0_12px_32px_-12px_rgb(0_0_0_/_0.75)] ring-1 ring-slate-950/15 backdrop-blur transition duration-200 hover:scale-105 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          isFavorite ? 'is-active' : 'is-inactive',
        )}
        onClick={toggleFavorite}
        type="button"
      >
        <HeartIcon
          className={clsx(
            'h-6 w-6 transition-colors',
            isFavorite ? 'text-rose-500' : 'text-slate-700',
          )}
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <Button
      aria-pressed={isFavorite}
      className={clsx('w-full', isFavorite ? 'is-active' : 'is-inactive')}
      onClick={toggleFavorite}
      variant={isFavorite ? 'primary' : 'secondary'}
    >
      <HeartIcon className={clsx('h-4 w-4', isFavorite && 'text-rose-400')} aria-hidden="true" />
      {isFavorite ? t('Favorites') : label}
    </Button>
  );
};
