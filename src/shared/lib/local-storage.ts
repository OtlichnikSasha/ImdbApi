export const createLocalStorageStore = <T>(
  key: string,
  fallbackValue: T,
  validate: (value: unknown) => T,
) => {
  const read = (): T => {
    if (typeof window === 'undefined') {
      return fallbackValue;
    }

    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return fallbackValue;
    }

    try {
      return validate(JSON.parse(rawValue));
    } catch {
      return fallbackValue;
    }
  };

  const write = (value: T): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return { read, write };
};
