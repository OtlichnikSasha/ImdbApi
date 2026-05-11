import { beforeEach, describe, expect, it } from 'vitest';
import { z } from 'zod';

import { createLocalStorageStore } from './local-storage';

describe('createLocalStorageStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns fallback when storage value is absent', () => {
    const store = createLocalStorageStore('missing', ['fallback'], (value) =>
      z.array(z.string()).parse(value),
    );

    expect(store.read()).toEqual(['fallback']);
  });

  it('persists and validates values', () => {
    const store = createLocalStorageStore('ids', [], (value) => z.array(z.string()).parse(value));

    store.write(['arrival']);

    expect(store.read()).toEqual(['arrival']);
  });
});
