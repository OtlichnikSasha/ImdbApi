import { Skeleton } from '@shared/ui/skeleton';

export const MovieCardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-border bg-surface">
    <Skeleton className="aspect-[2/3] w-full" />
    <div className="space-y-4 p-4">
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-5 w-2/5" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-7 w-full rounded-full" />
        <Skeleton className="h-7 w-full rounded-full" />
        <Skeleton className="h-7 w-full rounded-full" />
        <Skeleton className="h-7 w-full rounded-full" />
      </div>
    </div>
  </div>
);
