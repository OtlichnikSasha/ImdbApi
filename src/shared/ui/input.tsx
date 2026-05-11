import { clsx } from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = ({ className, leftIcon, rightIcon, ...props }: InputProps) => (
  <label
    className={clsx(
      'flex h-12 w-full max-w-full min-w-0 items-center gap-3 rounded-2xl border border-border bg-surface px-4 text-text shadow-sm transition-colors duration-200 focus-within:border-emerald-400',
      className,
    )}
  >
    {leftIcon ? <span className="shrink-0 text-text-soft">{leftIcon}</span> : null}
    <input
      className="h-full min-w-0 max-w-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-text-soft focus:outline-none"
      {...props}
    />
    {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
  </label>
);
