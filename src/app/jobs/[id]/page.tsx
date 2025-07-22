import Link from "next/link";

// Mock job data
const getJobById = (id: string) => {
  const jobs = {
    "1": {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-Time",
      salary: "$120,000 - $150,000",
      description: `We're looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of web applications.

Key Responsibilities:
• Develop and maintain high-quality React applications
• Collaborate with design and backend teams
• Optimize applications for maximum speed and scalability
• Mentor junior developers and participate in code reviews
• Stay up-to-date with the latest frontend technologies

Requirements:
• 5+ years of experience with React and TypeScript
• Strong knowledge of HTML, CSS, and JavaScript
• Experience with state management libraries (Redux, Zustand)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Understanding of CI/CD pipelines and deployment processes

Benefits:
• Competitive salary and equity package
• Health, dental, and vision insurance
• Flexible work arrangements
• Professional development budget
• Unlimited PTO`,
      postedAt: "2024-01-15",
      companyInfo: {
        size: "500-1000 employees",
        industry: "Technology",
        website: "https://techcorp.com"
      }
    }
  };
  
  return jobs[id as keyof typeof jobs] || null;
};

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-base-content/70 mb-6">The job you&#39;re looking for doesn&#39;t exist.</p>
          <Link href="/jobs" className="btn btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      {/* Header */}
      <div className="navbar bg-base-100/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"></path>
                </svg>
              </div>
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Job Board
              </Link>
            </div>
          </div>
          <div className="flex-none gap-2">
            <Link href="/jobs" className="btn btn-ghost btn-sm">
              All Jobs
            </Link>
            <Link href="/dashboard" className="btn btn-ghost btn-sm">
              Dashboard
            </Link>
            <Link href="/login" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/jobs">Jobs</Link></li>
            <li>{job.title}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
              <div className="card-body">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-xl text-base-content/70 font-medium">{job.company}</p>
                    <div className="flex items-center gap-4 mt-3 text-base-content/60">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <div className={`badge badge-lg ${
                    job.type === 'Full-Time' ? 'badge-primary' : 
                    job.type === 'Part-Time' ? 'badge-secondary' : 
                    'badge-accent'
                  }`}>
                    {job.type}
                  </div>
                </div>

                <div className="divider"></div>

                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-base-content/80">
                    {job.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Section */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg mb-6">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Apply for this job</h3>
                <button className="btn btn-primary btn-block mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Apply Now
                </button>
                <button className="btn btn-outline btn-block">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Save Job
                </button>
              </div>
            </div>

            {/* Company Info */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg mb-6">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">About {job.company}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Industry</span>
                    <span className="font-medium">{job.companyInfo.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Company Size</span>
                    <span className="font-medium">{job.companyInfo.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Website</span>
                    <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer" className="link link-primary">
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Stats */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Job Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Posted</span>
                    <span className="font-medium">{new Date(job.postedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Applications</span>
                    <span className="font-medium">23 candidates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Views</span>
                    <span className="font-medium">156 views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg">Frontend Developer</h3>
                  <p className="text-base-content/70">Another Tech Company</p>
                  <div className="text-sm text-base-content/60">
                    Remote • Full-Time
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link href="/jobs/2" className="btn btn-primary btn-sm">
                      View Details
                    </Link>
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
