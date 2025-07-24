import Link from "next/link";

// Mock user jobs data
const userJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "My Company",
    location: "San Francisco, CA",
    type: "Full-Time",
    status: "Active",
    applications: 15,
    views: 89,
    postedAt: "2024-01-10"
  },
  {
    id: 2,
    title: "Product Designer",
    company: "My Company",
    location: "Remote",
    type: "Contract",
    status: "Closed",
    applications: 8,
    views: 45,
    postedAt: "2023-12-20"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-base-content/70">Manage your job postings and applications</p>
          </div>
          <Link href="/dashboard/post-job" className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Post New Job
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div className="stat-title">Active Jobs</div>
            <div className="stat-value text-primary">1</div>
            <div className="stat-desc">Currently hiring</div>
          </div>

          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-secondary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="stat-title">Total Applications</div>
            <div className="stat-value text-secondary">23</div>
            <div className="stat-desc">Across all jobs</div>
          </div>

          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-accent">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <div className="stat-title">Total Views</div>
            <div className="stat-value text-accent">134</div>
            <div className="stat-desc">Job post views</div>
          </div>

          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-info">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div className="stat-title">Response Rate</div>
            <div className="stat-value text-info">65%</div>
            <div className="stat-desc">Application responses</div>
          </div>
        </div>

        {/* Job Listings Table */}
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <h2 className="card-title text-2xl">Your Job Postings</h2>
              <div className="flex gap-2">
                <select className="select select-bordered select-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Closed</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Applications</th>
                    <th>Views</th>
                    <th>Posted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userJobs.map((job) => (
                    <tr key={job.id} className="hover">
                      <td>
                        <div>
                          <div className="font-bold">{job.title}</div>
                          <div className="text-sm text-base-content/60">{job.company}</div>
                        </div>
                      </td>
                      <td>{job.location}</td>
                      <td>
                        <div className={`badge ${
                          job.type === 'Full-Time' ? 'badge-primary' : 
                          job.type === 'Part-Time' ? 'badge-secondary' : 
                          'badge-accent'
                        } badge-sm`}>
                          {job.type}
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${
                          job.status === 'Active' ? 'badge-success' : 'badge-error'
                        } badge-sm`}>
                          {job.status}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          {job.applications}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          {job.views}
                        </div>
                      </td>
                      <td className="text-sm">{new Date(job.postedAt).toLocaleDateString()}</td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-xs">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                            </svg>
                          </label>
                          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[1]">
                            <li><Link href={`/jobs/${job.id}`}>View</Link></li>
                            <li><Link href={`/dashboard/edit-job/${job.id}`}>Edit</Link></li>
                            <li><a>Applications</a></li>
                            <li><a className="text-error">Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No job postings yet</h3>
                <p className="text-base-content/60 mb-4">Start by posting your first job to attract candidates</p>
                <Link href="/dashboard/post-job" className="btn btn-primary">
                  Post Your First Job
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
