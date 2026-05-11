import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MovieCard, MovieCardSkeleton } from '@entities/movie';
import type { Movie } from '@entities/movie';
import { ToggleFavoriteButton } from '@features/favorite-movie';
import { useI18n } from '@shared/i18n';
import { StatusView } from '@shared/ui/status-view';

interface MovieListProps {
  errorMessage?: string;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isError?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  movies?: Movie[];
}

const getColumnCount = (): number => {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    return 4;
  }

  if (window.matchMedia('(min-width: 640px)').matches) {
    return 3;
  }

  if (window.matchMedia('(min-width: 425px)').matches) {
    return 2;
  }

  return 1;
};

const useResponsiveColumnCount = (): number => {
  const [columnCount, setColumnCount] = useState<number>(() => getColumnCount());

  useEffect(() => {
    const updateColumnCount = (): void => setColumnCount(getColumnCount());

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);

    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  return columnCount;
};

export const MovieList = ({
  errorMessage,
  fetchNextPage,
  hasNextPage = false,
  isError,
  isFetchingNextPage,
  isLoading,
  movies = [],
}: MovieListProps) => {
  const { t } = useI18n();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const columnCount = useResponsiveColumnCount();
  const [scrollMargin, setScrollMargin] = useState<number>(0);

  const rows = useMemo<Movie[][]>(() => {
    const nextRows: Movie[][] = [];

    for (let index = 0; index < movies.length; index += columnCount) {
      nextRows.push(movies.slice(index, index + columnCount));
    }

    return nextRows;
  }, [columnCount, movies]);

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 580,
    gap: 16,
    overscan: 4,
    scrollMargin,
  });

  const virtualRows = virtualizer.getVirtualItems();

  useEffect(() => {
    if (!fetchNextPage || !hasNextPage || isFetchingNextPage || virtualRows.length === 0) {
      return;
    }

    const lastVisibleRow = virtualRows[virtualRows.length - 1];
    const preloadRowIndex = Math.max(rows.length - 3, 0);

    if (lastVisibleRow && lastVisibleRow.index >= preloadRowIndex) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, rows.length, virtualRows]);

  useEffect(() => {
    const updateScrollMargin = (): void => {
      setScrollMargin(parentRef.current?.offsetTop ?? 0);
    };

    updateScrollMargin();
    window.addEventListener('resize', updateScrollMargin);

    return () => window.removeEventListener('resize', updateScrollMargin);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 min-[425px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <StatusView
        description={errorMessage ?? 'Please try refreshing the page.'}
        title="Movies could not be loaded"
      />
    );
  }

  if (movies.length === 0) {
    return (
      <StatusView
        description={t('Try another title or check back later.')}
        title={t('No movies found')}
      />
    );
  }

  return (
    <div ref={parentRef}>
      <div className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualRows.map((virtualRow) => (
          <div
            className="absolute left-0 top-0 grid w-full grid-cols-1 gap-4 min-[425px]:grid-cols-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4"
            data-index={virtualRow.index}
            key={virtualRow.key}
            ref={virtualizer.measureElement}
            style={{
              transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
            }}
          >
            {rows[virtualRow.index]?.map((movie, columnIndex) => (
              <MovieCard
                action={<ToggleFavoriteButton iconOnly movie={movie} />}
                index={virtualRow.index * columnCount + columnIndex}
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="mt-4 grid grid-cols-1 gap-4 min-[425px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: columnCount }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};
