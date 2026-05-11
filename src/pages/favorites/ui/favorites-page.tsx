import { useFavoriteMoviesQuery } from '@entities/movie';
import { useI18n } from '@shared/i18n';
import { MovieList } from '@widgets/movie-list';

export const FavoritesPage = () => {
  const { t } = useI18n();
  const favoriteMoviesQuery = useFavoriteMoviesQuery();

  return (
    <div className="space-y-8">
      <section aria-labelledby="favorites-heading">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-text">
          {t('Watchlist')}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl" id="favorites-heading">
          {t('Favorites')}
        </h1>
      </section>
      <MovieList movies={favoriteMoviesQuery.data} />
    </div>
  );
};
