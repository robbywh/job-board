import BreadcrumbSkeleton from "@/components/ui/BreadcrumbSkeleton";

export default function Loading() {
  return (
    <>
      <BreadcrumbSkeleton itemCount={2} />

      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl relative z-10">
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
            <div className="flex-1 xl:max-w-4xl">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="skeleton h-8 sm:h-9 w-64 mx-auto mb-2"></div>
                    <div className="skeleton h-4 sm:h-5 w-48 mx-auto"></div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="form-control">
                      <div className="mb-2">
                        <div className="skeleton h-4 w-20"></div>
                      </div>
                      <div className="skeleton h-12 w-full"></div>
                    </div>

                    <div className="form-control">
                      <div className="mb-2">
                        <div className="skeleton h-4 w-16"></div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <div className="skeleton w-10 h-10 rounded"></div>
                        <div className="flex-1">
                          <div className="skeleton h-5 w-32 mb-1"></div>
                          <div className="skeleton h-3 w-48"></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="form-control">
                        <div className="mb-2">
                          <div className="skeleton h-4 w-16"></div>
                        </div>
                        <div className="skeleton h-12 w-full"></div>
                      </div>

                      <div className="form-control">
                        <div className="mb-2">
                          <div className="skeleton h-4 w-18"></div>
                        </div>
                        <div className="skeleton h-12 w-full"></div>
                      </div>
                    </div>

                    <div className="form-control">
                      <div className="mb-2">
                        <div className="skeleton h-4 w-28"></div>
                      </div>
                      <div className="skeleton h-28 sm:h-32 w-full"></div>
                      <div className="mt-1">
                        <div className="skeleton h-3 w-80"></div>
                      </div>
                    </div>

                    <div className="form-control pt-6 sm:pt-8">
                      <div className="skeleton h-12 w-full"></div>
                      <div className="text-center mt-3">
                        <div className="skeleton h-3 w-48 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-80 xl:flex-shrink-0">
              <div className="lg:hidden mb-4">
                <div className="collapse collapse-arrow bg-base-100 shadow-lg">
                  <input type="checkbox" disabled /> 
                  <div className="collapse-title text-lg font-medium flex items-center gap-2">
                    <div className="skeleton w-4 h-4"></div>
                    <div className="skeleton h-5 w-32"></div>
                  </div>
                  <div className="collapse-content">
                    <div className="space-y-4 pt-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="skeleton h-4 w-16"></div>
                          <div className="skeleton h-4 w-20"></div>
                        </div>
                      ))}
                      <div className="divider my-2"></div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="skeleton h-8 w-full"></div>
                        <div className="skeleton h-8 w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block xl:sticky xl:top-6 space-y-4">
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="skeleton w-4 h-4"></div>
                      <div className="skeleton h-4 w-20"></div>
                    </div>
                    
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="skeleton h-4 w-16"></div>
                          <div className="skeleton h-4 w-20"></div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="divider"></div>
                    
                    <div className="space-y-2">
                      <div className="skeleton h-8 w-full"></div>
                      <div className="skeleton h-8 w-full"></div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="skeleton w-4 h-4"></div>
                      <div className="skeleton h-4 w-24"></div>
                    </div>
                    
                    <div className="space-y-3">
                      {[1, 2].map(i => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <div className="skeleton h-3 w-20"></div>
                            <div className="skeleton h-3 w-8"></div>
                          </div>
                          <div className="skeleton h-2 w-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
