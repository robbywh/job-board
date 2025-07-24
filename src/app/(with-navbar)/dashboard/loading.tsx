export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="skeleton h-10 w-64 mb-4"></div>
          <div className="skeleton h-5 w-96"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
              <div className="stat-figure">
                <div className="skeleton w-8 h-8"></div>
              </div>
              <div className="space-y-2">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-8 w-12"></div>
                <div className="skeleton h-3 w-24"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <div className="skeleton h-7 w-40"></div>
              <div className="skeleton h-8 w-24"></div>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <th key={i}>
                        <div className="skeleton h-4 w-16"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="hover">
                      {Array.from({ length: 8 }).map((_, colIndex) => (
                        <td key={colIndex}>
                          {colIndex === 0 ? (
                            <div className="space-y-2">
                              <div className="skeleton h-4 w-32"></div>
                              <div className="skeleton h-3 w-20"></div>
                            </div>
                          ) : colIndex === 7 ? (
                            <div className="skeleton h-6 w-6"></div>
                          ) : (
                            <div className="skeleton h-4 w-16"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
