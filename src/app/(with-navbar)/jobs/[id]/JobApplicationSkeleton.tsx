export default function JobApplicationSkeleton() {
  return (
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
      <div className="card-body">
        <div className="skeleton h-6 w-48 mb-4"></div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="form-control">
                <div className="skeleton h-4 w-20 mb-2"></div>
                <div className="skeleton h-10 w-full"></div>
              </div>
            ))}
          </div>

          <div className="form-control">
            <div className="skeleton h-4 w-12 mb-2"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>

          <div className="form-control">
            <div className="skeleton h-4 w-24 mb-2"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>

          <div className="form-control">
            <div className="skeleton h-4 w-20 mb-2"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-3 w-48 mt-1"></div>
          </div>

          <div className="form-control">
            <div className="skeleton h-4 w-24 mb-2"></div>
            <div className="skeleton h-24 w-full"></div>
          </div>

          <div className="form-control">
            <div className="skeleton h-4 w-32 mb-2"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>

          <div className="form-control">
            <div className="flex items-center">
              <div className="skeleton w-4 h-4 mr-2"></div>
              <div className="skeleton h-3 w-64"></div>
            </div>
          </div>

          <div className="form-control mt-6">
            <div className="skeleton h-12 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
