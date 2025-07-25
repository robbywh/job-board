import Link from "next/link";
import Image from "next/image";
import { Building2, MapPin, Clock } from 'lucide-react';
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
                    <Building2 className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="card-title text-lg">{job.title}</h3>
              <p className="text-base-content/70 font-medium">{job.company}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-base-content/60">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
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
