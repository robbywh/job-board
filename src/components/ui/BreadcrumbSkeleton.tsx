interface BreadcrumbSkeletonProps {
  itemCount?: number;
}

export default function BreadcrumbSkeleton({ itemCount = 2 }: BreadcrumbSkeletonProps) {
  return (
    <div className="bg-base-100 border-b border-base-200">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="breadcrumbs text-xs sm:text-sm">
          <ul>
            {Array.from({ length: itemCount }, (_, i) => (
              <li key={i}>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="skeleton w-3 h-3 sm:w-4 sm:h-4"></div>
                  <div className="skeleton h-4 w-16"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
