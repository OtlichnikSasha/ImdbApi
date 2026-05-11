const withOpacity = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }

    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: withOpacity('--color-app'),
        surface: withOpacity('--color-surface'),
        'surface-muted': withOpacity('--color-surface-muted'),
        border: withOpacity('--color-border'),
        text: withOpacity('--color-text'),
        'text-muted': withOpacity('--color-text-muted'),
        'text-soft': withOpacity('--color-text-soft'),
        primary: withOpacity('--color-primary'),
        'primary-hover': withOpacity('--color-primary-hover'),
        'primary-contrast': withOpacity('--color-primary-contrast'),
        accent: withOpacity('--color-accent'),
        'accent-muted': withOpacity('--color-accent-muted'),
        'accent-text': withOpacity('--color-accent-text'),
      },
      boxShadow: {
        soft: '0 16px 48px -24px rgb(15 23 42 / 0.35)',
      },
    },
  },
  plugins: [],
};
