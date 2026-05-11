import { useState } from 'react';

import { usePopularMoviesInfiniteQuery, useSearchMoviesInfiniteQuery } from '@entities/movie';
import { useDebounce } from '@shared/lib/use-debounce';

export const useMovieSearch = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 350);
  const popularMoviesQuery = usePopularMoviesInfiniteQuery();
  const searchMoviesQuery = useSearchMoviesInfiniteQuery(debouncedSearch);
  const query = debouncedSearch.trim().length > 0 ? searchMoviesQuery : popularMoviesQuery;

  return {
    debouncedSearch,
    query,
    search,
    setSearch,
  };
};
