import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';

import { env } from '@shared/config/env';
import { getCurrentApiLanguage } from '@shared/i18n';

import type { paths } from './generated/schema';

const headers = new Headers({
  Accept: 'application/json',
});

if (env.tmdbAccessToken) {
  headers.set('Authorization', `Bearer ${env.tmdbAccessToken}`);
}

export const apiClient = createFetchClient<paths>({
  baseUrl: env.apiBaseUrl,
  headers,
});

apiClient.use({
  onRequest: ({ request }) => {
    const url = new URL(request.url);

    url.searchParams.set('language', getCurrentApiLanguage());

    return new Request(url, request);
  },
});

export const apiQueryClient = createQueryClient(apiClient);
