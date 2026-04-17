export function ProductCardSkeleton() {
  return (
    <div className="surface-card flex flex-col rounded-[2rem] p-3">
      <div className="skeleton aspect-[4/5] rounded-[1.5rem]" />
      <div className="space-y-3 px-2 pb-2 pt-5">
        <div className="skeleton h-3 w-28 rounded-full" />
        <div className="skeleton h-6 w-4/5 rounded-xl" />
        <div className="skeleton h-6 w-3/5 rounded-xl" />
        <div className="skeleton h-4 w-full rounded-xl" />
        <div className="skeleton h-11 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
