import { Suspense } from "react";
import { Metadata } from "next";
import JobsContent from './JobsContent';
import JobsPageSkeleton from './JobsPageSkeleton';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: "Browse Jobs | Job Board",
  description: "Discover amazing job opportunities from top companies around the world. Find your dream career with our comprehensive job search platform.",
  keywords: ["jobs", "careers", "employment", "hiring", "job search", "remote work"],
  openGraph: {
    title: "Browse Jobs | Job Board",
    description: "Discover amazing job opportunities from top companies around the world.",
    type: "website",
  },
};

const JOBS_PER_PAGE = 10;

// Fetch jobs from Supabase with pagination
const getJobsFromSupabase = async (page: number = 1) => {
  const supabase = await createClient();
  
  const from = (page - 1) * JOBS_PER_PAGE;
  const to = from + JOBS_PER_PAGE - 1;
  
  const { data: jobs, error, count } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        id,
        name,
        logo_url
      )
    `, { count: 'exact' })
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching jobs:', error);
    return { jobs: [], totalCount: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil((count || 0) / JOBS_PER_PAGE);
  
  // Transform the data to match the expected format
  const transformedJobs = jobs?.map(job => ({
    id: job.id,
    title: job.title,
    company: job.companies?.name || 'Unknown Company',
    location: job.location,
    type: job.type,
    description: job.description,
    postedAt: job.created_at,
    companyId: job.company_id,
    companyLogo: job.companies?.logo_url || null,
    salary: undefined, // Not stored in database
  })) || [];

  return {
    jobs: transformedJobs,
    totalCount: count || 0,
    totalPages,
  };
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentPage = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  
  // Server-side data fetching from Supabase
  const { jobs, totalCount, totalPages } = await getJobsFromSupabase(currentPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Jobs</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover amazing opportunities from top companies around the world
          </p>
        </div>

        <Suspense fallback={<JobsPageSkeleton />}>
          <JobsContent 
            initialJobs={jobs} 
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            initialFilters={{
              search: typeof params.search === 'string' ? params.search : '',
              location: typeof params.location === 'string' ? params.location : '',
              jobTypes: Array.isArray(params.jobTypes) ? params.jobTypes : typeof params.jobTypes === 'string' ? [params.jobTypes] : []
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
