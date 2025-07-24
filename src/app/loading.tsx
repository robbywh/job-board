export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="hero py-20 relative z-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:ml-8">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="skeleton w-16 h-16 rounded-xl mr-4"></div>
              <div className="skeleton h-12 w-48"></div>
            </div>
            <div className="skeleton h-6 w-64 mb-4"></div>
            <div className="space-y-2 py-6 max-w-md">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-5/6"></div>
            </div>
            
            {/* Stats Skeleton */}
            <div className="bg-base-100/50 backdrop-blur-sm rounded-lg p-4 mb-6">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="skeleton h-4 w-16 mb-2"></div>
                  <div className="skeleton h-8 w-12"></div>
                </div>
                <div className="text-center">
                  <div className="skeleton h-4 w-16 mb-2"></div>
                  <div className="skeleton h-8 w-12"></div>
                </div>
              </div>
            </div>

            <div className="skeleton h-12 w-36"></div>
          </div>
          
          {/* Login Form Skeleton */}
          <div className="card bg-base-100/90 backdrop-blur-sm w-full max-w-sm shrink-0 shadow-2xl border border-base-300/50">
            <div className="card-body">
              <div className="text-center mb-6">
                <div className="skeleton h-7 w-32 mx-auto mb-2"></div>
                <div className="skeleton h-4 w-40 mx-auto"></div>
              </div>
              
              <div className="space-y-4">
                <div className="form-control">
                  <div className="skeleton h-4 w-12 mb-2"></div>
                  <div className="skeleton h-12 w-full"></div>
                </div>
                
                <div className="form-control">
                  <div className="skeleton h-4 w-16 mb-2"></div>
                  <div className="skeleton h-12 w-full"></div>
                </div>
                
                <div className="form-control mt-6 space-y-3">
                  <div className="skeleton h-12 w-full"></div>
                  <div className="skeleton h-8 w-8 mx-auto"></div>
                  <div className="skeleton h-12 w-full"></div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="skeleton h-3 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
