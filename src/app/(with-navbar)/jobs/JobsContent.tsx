'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobCard from "@/components/job/JobCard";
import JobFilters, { JobFilters as FilterTypes } from "@/components/job/JobFilters";
import { LoadingCard } from "@/components/ui/Loading";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedAt: string;
  companyId: string;
  companyLogo?: string | null;
}

interface JobsContentProps {
  initialJobs: Job[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  initialFilters?: {
    search?: string;
    location?: string;
    jobTypes?: string[];
  };
}

export default function JobsContent({ 
  initialJobs, 
  totalCount, 
  totalPages, 
  currentPage,
  initialFilters = {} 
}: JobsContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterTypes>({
    search: initialFilters.search || '',
    location: initialFilters.location || '',
    jobTypes: initialFilters.jobTypes || []
  });

  // Handle page navigation
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    
    // Preserve existing filters
    if (currentFilters.search) params.set('search', currentFilters.search);
    if (currentFilters.location) params.set('location', currentFilters.location);
    if (currentFilters.jobTypes.length > 0) params.set('jobTypes', currentFilters.jobTypes.join(','));
    
    router.push(`?${params.toString()}`);
  };

  const handleFiltersChange = (filters: FilterTypes) => {
    setIsFiltering(true);
    setCurrentFilters(filters);
    
    // For now, we'll navigate to a new page with filters in URL
    // In a real app, you might want to implement client-side filtering 
    // or make a new server request with filters
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset to first page when filtering
    
    if (filters.search?.trim()) {
      params.set('search', filters.search.trim());
    } else {
      params.delete('search');
    }
    
    if (filters.location?.trim()) {
      params.set('location', filters.location.trim());
    } else {
      params.delete('location');
    }
    
    if (filters.jobTypes.length > 0) {
      params.set('jobTypes', filters.jobTypes.join(','));
    } else {
      params.delete('jobTypes');
    }
    
    router.push(`?${params.toString()}`);
    
    // For immediate feedback, we'll do client-side filtering of current data
    setTimeout(() => {
      let filtered = initialJobs;

      // Search filter - search in title, company, and description
      if (filters.search && filters.search.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
        );
      }

      // Location filter - use includes for partial matching
      if (filters.location && filters.location.trim()) {
        filtered = filtered.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Job type filter
      if (filters.jobTypes.length > 0) {
        filtered = filtered.filter(job => filters.jobTypes.includes(job.type));
      }

      setFilteredJobs(filtered);
      setIsFiltering(false);
    }, 300);
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
      <div className="lg:w-1/4">
        <JobFilters 
          onFiltersChange={handleFiltersChange} 
          initialFilters={currentFilters}
          isLoading={isFiltering}
        />
      </div>

      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-base-content/70">
            Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalCount)} of {totalCount} job{totalCount !== 1 ? 's' : ''}
          </p>
          <select className="select select-bordered select-sm">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Company</option>
          </select>
        </div>

        <div className="space-y-4">
          {isFiltering ? (
            [1, 2, 3].map(i => <LoadingCard key={i} />)
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
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

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="join">
              <button 
                className="join-item btn btn-sm" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                «
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`join-item btn btn-sm ${pageNum === currentPage ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="join-item btn btn-sm" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
