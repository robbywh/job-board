export default function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }[size];

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${sizeClass}`}></div>
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
