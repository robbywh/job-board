import { Suspense } from "react";
import { Metadata } from "next";
import JobsContent from './JobsContent';
import JobsPageSkeleton from './JobsPageSkeleton';
import { getJobsWithPagination } from '@/lib/jobs';
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

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

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentPage = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  
  const { jobs, totalCount, totalPages } = await getJobsWithPagination(currentPage);

  return (
    <>
      <Breadcrumb items={getBreadcrumbs.jobs()} />

      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
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
    </>
  );
}
