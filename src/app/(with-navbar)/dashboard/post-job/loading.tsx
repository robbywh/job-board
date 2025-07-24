export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form Skeleton */}
      <div className="lg:col-span-2">
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
          <div className="card-body">
            <div className="skeleton h-8 w-48 mb-6"></div>
            
            <div className="space-y-6">
              {/* Form Fields Skeleton */}
              {[1, 2].map(i => (
                <div key={i} className="form-control">
                  <div className="skeleton h-4 w-24 mb-2"></div>
                  <div className="skeleton h-12 w-full"></div>
                </div>
              ))}

              {/* Two Column Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="form-control">
                    <div className="skeleton h-4 w-16 mb-2"></div>
                    <div className="skeleton h-12 w-full"></div>
                  </div>
                ))}
              </div>

              {/* Single Field */}
              <div className="form-control">
                <div className="skeleton h-4 w-20 mb-2"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>

              {/* Textarea Fields */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="form-control">
                  <div className="skeleton h-4 w-32 mb-2"></div>
                  <div className="skeleton h-24 w-full"></div>
                </div>
              ))}

              {/* Submit Buttons */}
              <div className="form-control mt-8">
                <div className="flex gap-4">
                  <div className="skeleton h-12 flex-1"></div>
                  <div className="skeleton h-12 w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="lg:col-span-1">
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg sticky top-8">
          <div className="card-body">
            <div className="skeleton h-6 w-40 mb-4"></div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i}>
                  <div className="skeleton h-4 w-24 mb-2"></div>
                  <div className="skeleton h-3 w-full"></div>
                  <div className="skeleton h-3 w-3/4"></div>
                </div>
              ))}
            </div>

            <div className="divider opacity-30"></div>
            
            <div className="text-center">
              <div className="stat">
                <div className="skeleton h-3 w-20 mx-auto mb-2"></div>
                <div className="skeleton h-6 w-12 mx-auto mb-2"></div>
                <div className="skeleton h-3 w-24 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
