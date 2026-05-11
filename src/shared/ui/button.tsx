import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';


type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-contrast hover:bg-primary-hover disabled:bg-text-soft',
  secondary:
    'bg-surface text-text ring-1 ring-border hover:bg-surface-muted',
  ghost: 'text-text-muted hover:bg-surface-muted',
};

export const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => (
  <button
    className={clsx(
      'inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed',
      variantClassName[variant],
      className,
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
);
