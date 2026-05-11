import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppLoader } from '@shared/ui/app-loader';
import { Header } from '@widgets/header';

import { ScrollToTop } from './scroll-to-top';

export const AppLayout = () => (
  <div className="min-h-screen overflow-x-hidden bg-app text-text transition-colors duration-200">
    <ScrollToTop />
    <Header />
    <main className="mx-auto max-w-6xl px-4 pb-5 pt-[81px] sm:px-6 lg:pb-7 lg:pt-[89px]">
      <Suspense fallback={<AppLoader />}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);
