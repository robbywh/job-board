import Link from "next/link";
import { updateJob } from "../../actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Mock function to get job data
const getJobById = (id: string) => {
  // This would normally fetch from your database
  return {
    id: parseInt(id),
    title: "Senior React Developer",
    company: "My Company",
    location: "San Francisco, CA",
    jobType: "Full-Time",
    salary: "$120,000 - $150,000",
    description: `We're looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of web applications.

Key Responsibilities:
• Develop and maintain high-quality React applications
• Collaborate with design and backend teams
• Optimize applications for maximum speed and scalability
• Mentor junior developers and participate in code reviews
• Stay up-to-date with the latest frontend technologies`,
    requirements: `• 5+ years of experience with React and TypeScript
• Strong knowledge of HTML, CSS, and JavaScript
• Experience with state management libraries (Redux, Zustand)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Understanding of CI/CD pipelines and deployment processes`,
    benefits: `• Competitive salary and equity package
• Health, dental, and vision insurance
• Flexible work arrangements
• Professional development budget
• Unlimited PTO`,
    applicationInstructions: "Please send your resume and a cover letter explaining why you're interested in this position to careers@company.com"
  };
};

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  // Server-side authentication check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/');
  }

  const { id } = await params;
  const job = getJobById(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li>Edit Job</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
              <div className="card-body">
                <h1 className="text-3xl font-bold mb-6">Edit Job Posting</h1>
                
                <form action={updateJob.bind(null, id)} className="space-y-6">
                  {/* Job Title */}
                  <div className="form-control">
                    <label className="label" htmlFor="title">
                      <span className="label-text font-medium">Job Title *</span>
                    </label>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      defaultValue={job.title}
                      className="input input-bordered focus:input-primary" 
                      required 
                    />
                  </div>

                  {/* Company Name */}
                  <div className="form-control">
                    <label className="label" htmlFor="company">
                      <span className="label-text font-medium">Company Name *</span>
                    </label>
                    <input 
                      id="company" 
                      name="company" 
                      type="text" 
                      defaultValue={job.company}
                      className="input input-bordered focus:input-primary" 
                      required 
                    />
                  </div>

                  {/* Location and Job Type Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label" htmlFor="location">
                        <span className="label-text font-medium">Location *</span>
                      </label>
                      <input 
                        id="location" 
                        name="location" 
                        type="text" 
                        defaultValue={job.location}
                        className="input input-bordered focus:input-primary" 
                        required 
                      />
                    </div>

                    <div className="form-control">
                      <label className="label" htmlFor="jobType">
                        <span className="label-text font-medium">Job Type *</span>
                      </label>
                      <select 
                        id="jobType" 
                        name="jobType" 
                        className="select select-bordered focus:select-primary" 
                        defaultValue={job.jobType}
                        required
                      >
                        <option value="">Select job type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="form-control">
                    <label className="label" htmlFor="salary">
                      <span className="label-text font-medium">Salary Range</span>
                    </label>
                    <input 
                      id="salary" 
                      name="salary" 
                      type="text" 
                      defaultValue={job.salary}
                      className="input input-bordered focus:input-primary" 
                    />
                  </div>

                  {/* Job Description */}
                  <div className="form-control">
                    <label className="label" htmlFor="description">
                      <span className="label-text font-medium">Job Description *</span>
                    </label>
                    <textarea 
                      id="description" 
                      name="description" 
                      defaultValue={job.description}
                      className="textarea textarea-bordered h-40 focus:textarea-primary" 
                      required
                    ></textarea>
                  </div>

                  {/* Requirements */}
                  <div className="form-control">
                    <label className="label" htmlFor="requirements">
                      <span className="label-text font-medium">Requirements</span>
                    </label>
                    <textarea 
                      id="requirements" 
                      name="requirements" 
                      defaultValue={job.requirements}
                      className="textarea textarea-bordered h-32 focus:textarea-primary"
                    ></textarea>
                  </div>

                  {/* Benefits */}
                  <div className="form-control">
                    <label className="label" htmlFor="benefits">
                      <span className="label-text font-medium">Benefits & Perks</span>
                    </label>
                    <textarea 
                      id="benefits" 
                      name="benefits" 
                      defaultValue={job.benefits}
                      className="textarea textarea-bordered h-24 focus:textarea-primary"
                    ></textarea>
                  </div>

                  {/* Application Instructions */}
                  <div className="form-control">
                    <label className="label" htmlFor="applicationInstructions">
                      <span className="label-text font-medium">How to Apply</span>
                    </label>
                    <textarea 
                      id="applicationInstructions" 
                      name="applicationInstructions" 
                      defaultValue={job.applicationInstructions}
                      className="textarea textarea-bordered h-24 focus:textarea-primary"
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button type="submit" className="btn btn-primary flex-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Update Job
                    </button>
                    <Link href={`/jobs/${job.id}`} className="btn btn-outline">
                      Preview
                    </Link>
                    <Link href="/dashboard" className="btn btn-ghost">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Job Status */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg mb-6">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Job Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Status:</span>
                    <div className="badge badge-success">Active</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Applications:</span>
                    <span className="font-medium">15 candidates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Views:</span>
                    <span className="font-medium">89 views</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Posted:</span>
                    <span className="font-medium">5 days ago</span>
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div className="space-y-2">
                  <button className="btn btn-warning btn-sm btn-block">
                    Pause Job Posting
                  </button>
                  <button className="btn btn-error btn-outline btn-sm btn-block">
                    Delete Job
                  </button>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg mb-6">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Application Rate</span>
                      <span>16.9%</span>
                    </div>
                    <progress className="progress progress-primary w-full" value="17" max="100"></progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>View Rate</span>
                      <span>7.2%</span>
                    </div>
                    <progress className="progress progress-secondary w-full" value="7" max="100"></progress>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/dashboard/applications" className="btn btn-ghost btn-sm btn-block justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    View Applications
                  </Link>
                  <Link href={`/jobs/${job.id}`} className="btn btn-ghost btn-sm btn-block justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View Public Listing
                  </Link>
                  <button className="btn btn-ghost btn-sm btn-block justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                    Share Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
