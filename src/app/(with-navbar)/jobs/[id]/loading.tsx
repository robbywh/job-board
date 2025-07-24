export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><div className="skeleton h-4 w-12"></div></li>
            <li><div className="skeleton h-4 w-8"></div></li>
            <li><div className="skeleton h-4 w-20"></div></li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
              <div className="card-body">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar">
                        <div className="skeleton w-16 h-16 rounded-lg"></div>
                      </div>
                      <div>
                        <div className="skeleton h-8 w-64 mb-2"></div>
                        <div className="skeleton h-6 w-48"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <div className="skeleton w-4 h-4"></div>
                        <div className="skeleton h-4 w-24"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="skeleton w-4 h-4"></div>
                        <div className="skeleton h-4 w-20"></div>
                      </div>
                    </div>
                  </div>
                  <div className="skeleton h-8 w-20 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="skeleton h-6 w-32 mb-4"></div>
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-5/6"></div>
                    <div className="skeleton h-4 w-4/5"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-4 w-5/6"></div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <div className="skeleton h-6 w-28 mb-4"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="skeleton w-2 h-2"></div>
                        <div className="skeleton h-4 w-64"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="skeleton h-12 w-32"></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg sticky top-8">
              <div className="card-body">
                <div className="skeleton h-6 w-32 mb-4"></div>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="skeleton h-4 w-20"></div>
                      <div className="skeleton h-4 w-16"></div>
                    </div>
                  ))}
                </div>

                <div className="divider opacity-30"></div>
                
                <div className="text-center">
                  <div className="stat p-0">
                    <div className="skeleton h-3 w-20 mx-auto mb-2"></div>
                    <div className="skeleton h-6 w-12 mx-auto mb-2"></div>
                    <div className="skeleton h-3 w-24 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
