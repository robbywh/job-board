export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      {/* Navigation Skeleton */}
      <div className="navbar bg-base-100/90 backdrop-blur-sm shadow-lg border-b border-base-300/50">
        <div className="navbar-start">
          <div className="flex items-center">
            <div className="skeleton w-8 h-8 mr-2"></div>
            <div className="skeleton h-6 w-24"></div>
          </div>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <div className="flex space-x-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton h-4 w-16"></div>
            ))}
          </div>
        </div>
        
        <div className="navbar-end">
          <div className="flex items-center space-x-4">
            <div className="skeleton h-8 w-20"></div>
            <div className="skeleton w-8 h-8 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="skeleton h-10 w-64 mb-4"></div>
          <div className="skeleton h-5 w-96"></div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
                <div className="card-body space-y-4">
                  <div className="skeleton h-6 w-3/4"></div>
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-5/6"></div>
                    <div className="skeleton h-4 w-4/5"></div>
                  </div>
                  <div className="flex justify-end">
                    <div className="skeleton h-8 w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
