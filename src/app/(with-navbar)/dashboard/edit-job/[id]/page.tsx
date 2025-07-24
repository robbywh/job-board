import Image from "next/image";
import { updateJob } from "../../actions";
import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getJobByIdWithAuth } from "@/lib/jobs";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBreadcrumbs } from "@/utils/breadcrumbs";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/');
  }

  const { id } = await params;
  const job = await getJobByIdWithAuth(id, user.id);
  
  if (!job) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb items={getBreadcrumbs.editJob()} />

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
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Edit Job Posting
                    </h1>
                    <p className="text-sm sm:text-base text-base-content/70 mt-1">
                      Update your job posting details
                    </p>
                  </div>
                  
                  <form action={updateJob.bind(null, id)} className="space-y-5">
                    {/* Job Title */}
                    <div className="form-control">
                      <div className="mb-2">
                        <label className="label-text font-medium">Job Title <span className="text-error">*</span></label>
                      </div>
                      <input 
                        name="title" 
                        type="text" 
                        defaultValue={job.title}
                        placeholder="e.g. Senior React Developer"
                        className="input input-bordered focus:input-primary text-base" 
                        required 
                      />
                    </div>

                    {/* Company */}
                    <div className="form-control">
                      <div className="mb-2">
                        <label className="label-text font-medium">Company <span className="text-error">*</span></label>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded bg-base-300">
                            {job.companies.logo_url ? (
                              <Image 
                                src={job.companies.logo_url} 
                                alt={`${job.companies.name} logo`} 
                                width={40}
                                height={40}
                                className="object-cover rounded" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-base-content/60">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{job.companies.name}</div>
                          <div className="text-sm text-base-content/60">Company cannot be changed when editing</div>
                        </div>
                      </div>
                      <input type="hidden" name="companyId" value={job.company_id} />
                      <input type="hidden" name="isNewCompany" value="false" />
                    </div>

                    {/* Location and Job Type Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Location */}
                      <div className="form-control">
                        <div className="mb-2">
                          <label className="label-text font-medium">Location <span className="text-error">*</span></label>
                        </div>
                        <input 
                          name="location" 
                          type="text" 
                          defaultValue={job.location}
                          placeholder="San Francisco, CA or Remote"
                          className="input input-bordered focus:input-primary text-base" 
                          required 
                        />
                      </div>

                      {/* Job Type */}
                      <div className="form-control">
                        <div className="mb-2">
                          <label className="label-text font-medium">Job Type <span className="text-error">*</span></label>
                        </div>
                        <select 
                          name="jobType" 
                          className="select select-bordered focus:select-primary text-base" 
                          defaultValue={job.type}
                          required
                        >
                          <option value="">Select job type</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div className="form-control">
                      <div className="mb-2">
                        <label className="label-text font-medium">Job Description <span className="text-error">*</span></label>
                      </div>
                      <textarea 
                        name="description" 
                        defaultValue={job.description}
                        className="textarea textarea-bordered h-28 sm:h-32 focus:textarea-primary resize-none text-base w-full"
                        placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
                        required
                      ></textarea>
                      <div className="mt-1">
                        <span className="label-text-alt">Minimum 50 characters • Be specific about daily tasks and growth opportunities</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control pt-6 sm:pt-8">
                      <button type="submit" className="btn btn-primary btn-lg w-full">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Update Job
                      </button>
                      <div className="text-center mt-3">
                        <span className="label-text-alt text-base-content/60 text-xs sm:text-sm">
                          Changes will be updated immediately
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="xl:w-80 xl:flex-shrink-0">
              {/* Mobile: Collapsible Job Status */}
              <div className="lg:hidden mb-4">
                <div className="collapse collapse-arrow bg-base-100 shadow-lg">
                  <input type="checkbox" /> 
                  <div className="collapse-title text-lg font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Job Status & Actions
                  </div>
                  <div className="collapse-content">
                    <div className="space-y-4 pt-2">
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
                        <span className="font-medium">{new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="grid grid-cols-1 gap-2">
                        <button className="btn btn-warning btn-sm">
                          Pause Job Posting
                        </button>
                        <button className="btn btn-error btn-outline btn-sm">
                          Delete Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Sticky Sidebar */}
              <div className="hidden lg:block xl:sticky xl:top-6 space-y-4">
                {/* Job Status Card */}
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body p-4">
                    <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Job Status
                    </h3>
                    
                    <div className="space-y-3">
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
                        <span className="font-medium">{new Date(job.created_at).toLocaleDateString()}</span>
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

                {/* Performance Card */}
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body p-4">
                    <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Performance
                    </h3>
                    
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
