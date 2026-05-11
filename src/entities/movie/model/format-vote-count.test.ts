import { describe, expect, it } from 'vitest';

import { formatVoteCount } from './format-vote-count';

describe('formatVoteCount', () => {
  it('keeps full values under 1000', () => {
    expect(formatVoteCount(0)).toBe('0');
    expect(formatVoteCount(999)).toBe('999');
  });

  it('formats thousands with one decimal up to 100000', () => {
    expect(formatVoteCount(1000)).toBe('1k');
    expect(formatVoteCount(1200)).toBe('1.2k');
    expect(formatVoteCount(25_499)).toBe('25.4k');
    expect(formatVoteCount(99_999)).toBe('99.9k');
    expect(formatVoteCount(100_000)).toBe('100k');
  });

  it('floors thousands above 100000', () => {
    expect(formatVoteCount(100_001)).toBe('100k');
    expect(formatVoteCount(255_999)).toBe('255k');
  });

  it('formats millions with one floored decimal and trims exact millions', () => {
    expect(formatVoteCount(1_000_000)).toBe('1M');
    expect(formatVoteCount(1_199_999)).toBe('1.1M');
    expect(formatVoteCount(12_000_000)).toBe('12M');
  });
});
