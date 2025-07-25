export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="skeleton h-10 w-64 mb-2"></div>
            <div className="skeleton h-5 w-96"></div>
          </div>
          <div className="skeleton h-10 w-32"></div>
        </div>

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

        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <div className="skeleton h-7 w-48"></div>
              <div className="flex gap-2">
                <div className="skeleton h-8 w-24"></div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    {['Job Title', 'Location', 'Type', 'Status', 'Applications', 'Views', 'Posted', 'Actions'].map((header, i) => (
                      <th key={i}>
                        <div className="skeleton h-4 w-16"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="skeleton w-10 h-10 rounded"></div>
                          <div>
                            <div className="skeleton h-4 w-32 mb-1"></div>
                            <div className="skeleton h-3 w-20"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="skeleton h-4 w-24"></div>
                      </td>
                      <td>
                        <div className="skeleton h-5 w-16"></div>
                      </td>
                      <td>
                        <div className="skeleton h-5 w-14"></div>
                      </td>
                      <td>
                        <div className="skeleton h-4 w-8"></div>
                      </td>
                      <td>
                        <div className="skeleton h-4 w-10"></div>
                      </td>
                      <td>
                        <div className="skeleton h-3 w-16"></div>
                      </td>
                      <td>
                        <div className="skeleton h-6 w-6"></div>
                      </td>
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
