import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import JobApplicationForm from "./JobApplicationForm";

interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  postedAt: string;
  companyLogo?: string | null;
  companyInfo: {
    size: string;
    industry: string;
    website: string;
  };
}

// Fetch job data from Supabase
const getJobById = async (id: string): Promise<JobData | null> => {
  const supabase = await createClient();
  
  const { data: job, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        id,
        name,
        logo_url
      )
    `)
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }

  // Transform the data to match the expected format
  return {
    id: job.id,
    title: job.title,
    company: job.companies?.name || 'Unknown Company',
    location: job.location,
    type: job.type,
    salary: undefined, // Not stored in database
    description: job.description,
    postedAt: job.created_at,
    companyLogo: job.companies?.logo_url || null,
    companyInfo: {
      size: '1-50 employees', // Default value since not stored in DB
      industry: 'Technology', // Default value since not stored in DB
      website: '#' // Default value since not stored in DB
    }
  };
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobById(id);
  
  if (!job) {
    return {
      title: "Job Not Found | Job Board"
    };
  }

  return {
    title: `${job.title} at ${job.company} | Job Board`,
    description: `${job.title} position at ${job.company} in ${job.location}. ${job.type} role with competitive salary.`,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: `${job.type} position in ${job.location}`,
      type: "website",
    },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
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
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Company Logo */}
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-lg bg-base-200 flex items-center justify-center">
                          {job.companyLogo ? (
                            <Image 
                              src={job.companyLogo} 
                              alt={`${job.company} logo`} 
                              width={64}
                              height={64}
                              className="object-cover rounded-lg" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-base-content/60">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                        <p className="text-xl text-base-content/70 font-medium">{job.company}</p>
                      </div>
                    </div>
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
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                          </svg>
                          {job.salary}
                        </div>
                      )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
