import type { ReactNode } from 'react';

interface StatusViewProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const StatusView = ({ action, description, title }: StatusViewProps) => (
  <div className="flex min-h-56 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface p-8 text-center">
    <h2 className="text-lg font-semibold text-text">{title}</h2>
    {description ? (
      <p className="mt-2 max-w-md text-sm text-text-muted">{description}</p>
    ) : null}
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
