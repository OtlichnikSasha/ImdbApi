import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from './app-layout';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import('@pages/home');

          return { Component: HomePage };
        },
      },
      {
        path: 'movies/:movieId',
        lazy: async () => {
          const { MovieDetailsPage } = await import('@pages/movie-details');

          return { Component: MovieDetailsPage };
        },
      },
      {
        path: 'favorites',
        lazy: async () => {
          const { FavoritesPage } = await import('@pages/favorites');

          return { Component: FavoritesPage };
        },
      },
      {
        path: '*',
        element: <Navigate replace to="/" />,
      },
    ],
  },
]);
