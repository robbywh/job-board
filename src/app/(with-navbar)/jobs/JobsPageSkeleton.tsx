import { LoadingCard } from "@/components/ui/Loading";

export default function JobsPageSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Skeleton */}
      <div className="lg:w-1/4">
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
          <div className="card-body space-y-4">
            <div className="flex justify-between items-center">
              <div className="skeleton h-6 w-20"></div>
              <div className="skeleton h-4 w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-16"></div>
              <div className="skeleton h-8 w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-8 w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-16"></div>
              <div className="space-y-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="skeleton w-4 h-4"></div>
                    <div className="skeleton h-4 flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Skeleton */}
      <div className="lg:w-3/4 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="skeleton h-5 w-32"></div>
          <div className="skeleton h-8 w-40"></div>
        </div>
        
        {[1, 2, 3, 4].map(i => (
          <LoadingCard key={i} />
        ))}

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="skeleton h-8 w-8"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
