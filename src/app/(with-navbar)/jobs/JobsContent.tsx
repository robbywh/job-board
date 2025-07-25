'use client'

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from 'lucide-react';
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
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const sortJobs = (jobs: Job[], sortOrder: 'newest' | 'oldest') => {
    return [...jobs].sort((a, b) => {
      const dateA = new Date(a.postedAt).getTime();
      const dateB = new Date(b.postedAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    
    if (currentFilters.search) params.set('search', currentFilters.search);
    if (currentFilters.location) params.set('location', currentFilters.location);
    if (currentFilters.jobTypes.length > 0) params.set('jobTypes', currentFilters.jobTypes.join(','));
    
    router.push(`?${params.toString()}`);
  };

  const handleFiltersChange = useCallback((filters: FilterTypes) => {
    setIsFiltering(true);
    setCurrentFilters(filters);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    
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
    
    setTimeout(() => {
      let filtered = initialJobs;

      if (filters.search && filters.search.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.location && filters.location.trim()) {
        filtered = filtered.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.jobTypes.length > 0) {
        filtered = filtered.filter(job => filters.jobTypes.includes(job.type));
      }

      const sortedJobs = sortJobs(filtered, sortBy);
      setFilteredJobs(sortedJobs);
      setIsFiltering(false);
    }, 300);
  }, [searchParams, router, initialJobs, sortBy]);

  const handleSortChange = (newSortBy: 'newest' | 'oldest') => {
    setSortBy(newSortBy);
    const sortedJobs = sortJobs(filteredJobs, newSortBy);
    setFilteredJobs(sortedJobs);
  };

  const handleClearFilters = () => {
    const newFilters = { search: '', location: '', jobTypes: [] };
    setCurrentFilters(newFilters);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.delete('search');
    params.delete('location');
    params.delete('jobTypes');
    
    router.push(`?${params.toString()}`);
    
    const sortedJobs = sortJobs(initialJobs, sortBy);
    setFilteredJobs(sortedJobs);
  };

  useEffect(() => {
    const sortedJobs = sortJobs(initialJobs, sortBy);
    setFilteredJobs(sortedJobs);
    
    if (initialFilters.search || initialFilters.location || (initialFilters.jobTypes && initialFilters.jobTypes.length > 0)) {
      handleFiltersChange(currentFilters);
    }
  }, [currentFilters, handleFiltersChange, initialFilters.jobTypes, initialFilters.location, initialFilters.search, initialJobs, sortBy]);

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
          <select 
            className="select select-bordered select-sm"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as 'newest' | 'oldest')}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
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
              <Search className="w-8 h-8 text-base-content/40" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-base-content/60 mb-4">Try adjusting your filters to see more results</p>
            <button 
              onClick={handleClearFilters}
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
