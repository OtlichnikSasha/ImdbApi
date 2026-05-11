import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import { StatusView } from '@shared/ui/status-view';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Application error boundary caught an error', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6">
          <StatusView
            description="Reload the page or return to the home page."
            title="Something went wrong"
          />
        </main>
      );
    }

    return this.props.children;
  }
}
