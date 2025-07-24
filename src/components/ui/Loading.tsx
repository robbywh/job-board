export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Skeleton */}
      <div className="lg:w-1/4">
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg animate-pulse">
          <div className="card-body space-y-4">
            <div className="h-6 bg-base-300 rounded w-20"></div>
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded w-16"></div>
              <div className="h-8 bg-base-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded w-20"></div>
              <div className="h-8 bg-base-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded w-16"></div>
              <div className="space-y-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-6 bg-base-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Skeleton */}
      <div className="lg:w-3/4 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 bg-base-300 rounded w-32 animate-pulse"></div>
          <div className="h-8 bg-base-300 rounded w-40 animate-pulse"></div>
        </div>
        
        {[1, 2, 3, 4].map(i => (
          <LoadingCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = {
    sm: "loading-sm",
    md: "loading-md", 
    lg: "loading-lg"
  }[size];

  return (
    <div className="flex items-center justify-center">
      <span className={`loading loading-spinner text-primary ${sizeClass}`}></span>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg animate-pulse">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-base-300 rounded w-3/4"></div>
            <div className="h-4 bg-base-300 rounded w-1/2"></div>
            <div className="flex gap-4">
              <div className="h-3 bg-base-300 rounded w-20"></div>
              <div className="h-3 bg-base-300 rounded w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-base-300 rounded"></div>
              <div className="h-3 bg-base-300 rounded w-5/6"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-base-300 rounded w-16"></div>
            <div className="h-3 bg-base-300 rounded w-12"></div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <div className="h-8 bg-base-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-base-content/70">Loading...</p>
      </div>
    </div>
  );
}
