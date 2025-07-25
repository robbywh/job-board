import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Plus, FileText, Users, Eye, TrendingUp } from 'lucide-react';
import { getUserJobs } from "@/lib/jobs.server";
import JobsTable from "./JobsTable";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/');
  }

  const jobs = await getUserJobs(user.id);
  
  const activeJobs = jobs.length;
  const totalApplications = 0;
  const totalViews = 0;
  const responseRate = 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-base-content/70">Manage your job postings and applications</p>
          </div>
          <Link href="/dashboard/post-job" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-primary">
              <FileText className="w-8 h-8" />
            </div>
            <div className="stat-title">Active Jobs</div>
            <div className="stat-value text-primary">{activeJobs}</div>
            <div className="stat-desc">Currently hiring</div>
          </div>

          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-secondary">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Applications</div>
            <div className="stat-value text-secondary">{totalApplications}</div>
            <div className="stat-desc">Across all jobs</div>
          </div>

          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-accent">
              <Eye className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Views</div>
            <div className="stat-value text-accent">{totalViews}</div>
            <div className="stat-desc">Job post views</div>
          </div>

          <div className="stat bg-base-100/90 backdrop-blur-sm shadow-lg rounded-box">
            <div className="stat-figure text-info">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="stat-title">Response Rate</div>
            <div className="stat-value text-info">{responseRate}%</div>
            <div className="stat-desc">Application responses</div>
          </div>
        </div>

        {jobs.length > 0 ? (
          <JobsTable jobs={jobs} />
        ) : (
          <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
            <div className="card-body">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-base-content/40" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No job postings yet</h3>
                <p className="text-base-content/60 mb-4">Start by posting your first job to attract candidates</p>
                <Link href="/dashboard/post-job" className="btn btn-primary">
                  Post Your First Job
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
