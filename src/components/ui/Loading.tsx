
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
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4 flex-1">
            {/* Company Logo Skeleton */}
            <div className="avatar flex-shrink-0">
              <div className="skeleton w-12 h-12 rounded-lg"></div>
            </div>
            
            {/* Job Info Skeleton */}
            <div className="flex-1">
              <div className="skeleton h-6 w-3/4 mb-2"></div>
              <div className="skeleton h-4 w-1/2 mb-2"></div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <div className="skeleton w-4 h-4"></div>
                  <div className="skeleton h-3 w-20"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="skeleton w-4 h-4"></div>
                  <div className="skeleton h-3 w-16"></div>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-5/6"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="skeleton h-6 w-16"></div>
            <div className="skeleton h-3 w-12"></div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <div className="skeleton h-8 w-24"></div>
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
