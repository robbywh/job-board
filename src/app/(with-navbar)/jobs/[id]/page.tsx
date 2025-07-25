import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, MapPin, Clock, Plus, Heart } from 'lucide-react';
import { getJobById } from "@/lib/jobs.server";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

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
    description: `${job.title} position at ${job.company} in ${job.location}. ${job.type} role available now.`,
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
    <>
      <Breadcrumb items={getBreadcrumbs.jobDetail(job.title)} />

      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
              <div className="card-body">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
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
                              <Building2 className="w-8 h-8" />
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
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
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

          <div className="lg:col-span-1">
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg mb-6">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Apply for this job</h3>
                <button className="btn btn-primary btn-block mb-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Apply Now
                </button>
                <button className="btn btn-outline btn-block">
                  <Heart className="w-4 h-4 mr-2" />
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
