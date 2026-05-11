import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Movie } from '@entities/movie';
import { setFavoriteMovies } from '@entities/movie';
import { I18nProvider } from '@shared/i18n';

import { ToggleFavoriteButton } from './toggle-favorite-button';

const movie: Movie = {
  genres: ['Drama'],
  id: 'movie-1',
  isFavorite: false,
  posterUrl: 'https://example.com/poster.jpg',
  rating: 8,
  title: 'Arrival',
  voteCount: 1200,
  year: 2016,
};

const renderWithProviders = (children: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <I18nProvider>{children}</I18nProvider>
    </QueryClientProvider>,
  );
};

describe('ToggleFavoriteButton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
    setFavoriteMovies([]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('updates active and inactive classes immediately after click', async () => {
    renderWithProviders(<ToggleFavoriteButton iconOnly movie={movie} />);

    const button = screen.getByRole('button', { name: 'Add to favorites' });

    expect(button).toHaveClass('is-inactive');
    expect(button).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(button);

    expect(button).toHaveClass('is-active');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAccessibleName('Remove from favorites');

    fireEvent.click(button);

    expect(button).toHaveClass('is-inactive');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAccessibleName('Add to favorites');

    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });
});
