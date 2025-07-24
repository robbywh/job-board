'use client'

import { useState, useEffect } from "react";
import JobCard from "@/components/job/JobCard";
import JobFilters, { JobFilters as FilterTypes } from "@/components/job/JobFilters";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedAt: string;
  salary?: string;
}

interface JobsContentProps {
  initialJobs: Job[];
  initialFilters?: {
    search?: string;
    location?: string;
    jobTypes?: string[];
  };
}

export default function JobsContent({ initialJobs, initialFilters = {} }: JobsContentProps) {
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [currentFilters, setCurrentFilters] = useState<FilterTypes>({
    search: initialFilters.search || '',
    location: initialFilters.location || '',
    jobTypes: initialFilters.jobTypes || []
  });

  const handleFiltersChange = (filters: FilterTypes) => {
    setCurrentFilters(filters);
    let filtered = initialJobs;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job => job.location === filters.location);
    }

    // Job type filter
    if (filters.jobTypes.length > 0) {
      filtered = filtered.filter(job => filters.jobTypes.includes(job.type));
    }

    setFilteredJobs(filtered);
  };

  // Apply initial filters on mount
  useEffect(() => {
    if (initialFilters.search || initialFilters.location || (initialFilters.jobTypes && initialFilters.jobTypes.length > 0)) {
      handleFiltersChange(currentFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="lg:w-1/4">
        <JobFilters 
          onFiltersChange={handleFiltersChange} 
          initialFilters={currentFilters}
        />
      </div>

      {/* Job Listings */}
      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-base-content/70">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
          <select className="select select-bordered select-sm">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Company</option>
            <option>Sort by: Salary</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-base-content/60 mb-4">Try adjusting your filters to see more results</p>
            <button 
              onClick={() => handleFiltersChange({ search: '', location: '', jobTypes: [] })}
              className="btn btn-primary btn-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
