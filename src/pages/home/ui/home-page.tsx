import { MovieSearch, useMovieSearch } from '@features/search-movie';
import { getErrorMessage } from '@shared/api/errors';
import { useI18n } from '@shared/i18n';
import { MovieList } from '@widgets/movie-list';

export const HomePage = () => {
  const { t } = useI18n();
  const { debouncedSearch, query, search, setSearch } = useMovieSearch();

  const title = debouncedSearch
    ? t('Search results for {query}', { query: debouncedSearch })
    : t('Popular movies');
  const movies = query.data?.pages.flatMap((page) => page.movies) ?? [];

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="movies-heading"
        className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] md:items-end"
      >
        <div className="min-w-0">
          <h1
            className="mt-2 max-w-full truncate text-3xl font-bold text-text sm:text-4xl"
            id="movies-heading"
            title={title}
          >
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
            {t('Browse movies from TMDB, open movie details, and keep your own watchlist.')}
          </p>
        </div>
        <MovieSearch onChange={setSearch} value={search} />
      </section>

      <MovieList
        errorMessage={getErrorMessage(query.error)}
        fetchNextPage={() => {
          void query.fetchNextPage();
        }}
        hasNextPage={query.hasNextPage}
        isError={query.isError}
        isFetchingNextPage={query.isFetchingNextPage}
        isLoading={query.isPending}
        movies={movies}
      />
    </div>
  );
};
