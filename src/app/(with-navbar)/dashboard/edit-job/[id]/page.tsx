import { updateJob } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { CheckCircle, BarChart3 } from 'lucide-react';
import { getJobByIdWithAuth } from "@/lib/jobs.server";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import EditJobFormClient from "./EditJobFormClient";
import DeleteJobWrapper from "./DeleteJobWrapper";
import PauseJobButton from "@/components/job/PauseJobButton";

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
                  
                  <EditJobFormClient 
                    job={job}
                    updateJobAction={updateJob}
                  />
                </div>
              </div>
            </div>

            <div className="xl:w-80 xl:flex-shrink-0">
              <div className="lg:hidden mb-4">
                <div className="collapse collapse-arrow bg-base-100 shadow-lg">
                  <input type="checkbox" /> 
                  <div className="collapse-title text-lg font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Job Status & Actions
                  </div>
                  <div className="collapse-content">
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-base-content/70">Status:</span>
                        <div className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                          {job.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
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
                        <PauseJobButton 
                          jobId={job.id} 
                          currentStatus={job.status} 
                          variant="block" 
                        />
                        <DeleteJobWrapper
                          jobId={job.id}
                          jobTitle={job.title}
                          trigger={
                            <button className="btn btn-error btn-outline btn-sm w-full">
                              Delete Job
                            </button>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block xl:sticky xl:top-6 space-y-4">
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body p-4">
                    <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Job Status
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base-content/70">Status:</span>
                        <div className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                          {job.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
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
                      <PauseJobButton 
                        jobId={job.id} 
                        currentStatus={job.status} 
                        variant="block" 
                      />
                      <DeleteJobWrapper
                        jobId={job.id}
                        jobTitle={job.title}
                        trigger={
                          <button className="btn btn-error btn-outline btn-sm btn-block">
                            Delete Job
                          </button>
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body p-4">
                    <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
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
