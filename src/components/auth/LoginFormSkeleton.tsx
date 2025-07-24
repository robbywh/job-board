export default function LoginFormSkeleton() {
  return (
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
  );
}
