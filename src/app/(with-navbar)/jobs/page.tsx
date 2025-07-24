import { Suspense } from "react";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import JobsContent from "./JobsContent";
import Loading from "@/components/ui/Loading";

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

// Mock data for demonstration - this would come from your database
const getMockJobs = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-Time",
      description: "We're looking for a Senior Frontend Developer to join our dynamic team...",
      postedAt: "2024-01-15",
      salary: "$120,000 - $150,000"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-Time",
      description: "Join our product team and help shape the future of our platform...",
      postedAt: "2024-01-14",
      salary: "$140,000 - $180,000"
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      description: "We need a talented UX Designer for a 6-month project...",
      postedAt: "2024-01-13",
      salary: "$80 - $120/hr"
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      type: "Part-Time",
      description: "Looking for a part-time backend engineer to help with our API...",
      postedAt: "2024-01-12",
      salary: "$90,000 - $110,000"
    }
  ];
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Server-side data fetching
  const jobs = await getMockJobs();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const params = await searchParams;

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

        <Suspense fallback={<Loading />}>
          <JobsContent 
            initialJobs={jobs} 
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
