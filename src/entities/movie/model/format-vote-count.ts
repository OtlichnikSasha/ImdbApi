const trimTrailingZero = (value: string): string => value.replace(/\.0$/, '');

const floorToOneDecimal = (value: number): number => Math.floor(value * 10) / 10;

export const formatVoteCount = (voteCount: number): string => {
  if (voteCount < 1000) {
    return String(voteCount);
  }

  if (voteCount < 1_000_000) {
    const countInThousands = voteCount / 1000;

    if (voteCount > 100_000) {
      return `${Math.floor(countInThousands)}k`;
    }

    return `${trimTrailingZero(floorToOneDecimal(countInThousands).toFixed(1))}k`;
  }

  return `${trimTrailingZero(floorToOneDecimal(voteCount / 1_000_000).toFixed(1))}M`;
};
