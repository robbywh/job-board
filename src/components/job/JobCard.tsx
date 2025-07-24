import Link from "next/link";
import Image from "next/image";
import { getJobTypeColor, getRelativeTime, truncateText } from "@/lib/utils";

interface Job {
  id: string | number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedAt: string;
  companyLogo?: string | null;
}

interface JobCardProps {
  job: Job;
  showActions?: boolean;
}

export default function JobCard({ job, showActions = false }: JobCardProps) {
  return (
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4 flex-1">
            {/* Company Logo */}
            <div className="avatar flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center">
                {job.companyLogo ? (
                  <Image 
                    src={job.companyLogo} 
                    alt={`${job.company} logo`} 
                    width={48}
                    height={48}
                    className="object-cover rounded-lg" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base-content/60">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Job Info */}
            <div className="flex-1">
              <h3 className="card-title text-lg">{job.title}</h3>
              <p className="text-base-content/70 font-medium">{job.company}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-base-content/60">
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
              </div>
              <p className="mt-3 text-base-content/80">{truncateText(job.description, 120)}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className={`badge ${getJobTypeColor(job.type)}`}>
              {job.type}
            </div>
            <span className="text-xs text-base-content/50">
              {getRelativeTime(job.postedAt)}
            </span>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          {showActions ? (
            <div className="flex gap-2">
              <Link href={`/dashboard/edit-job/${job.id}`} className="btn btn-outline btn-sm">
                Edit
              </Link>
              <Link href={`/jobs/${job.id}`} className="btn btn-primary btn-sm">
                View
              </Link>
            </div>
          ) : (
            <Link href={`/jobs/${job.id}`} className="btn btn-primary btn-sm">
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
