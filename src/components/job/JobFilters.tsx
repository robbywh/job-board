'use client'

import { useState, useEffect, useRef } from "react";

interface JobFiltersProps {
  onFiltersChange?: (filters: JobFilters) => void;
  initialFilters?: JobFilters;
  isLoading?: boolean;
}

export interface JobFilters {
  search: string;
  location: string;
  jobTypes: string[];
}

export default function JobFilters({ onFiltersChange, initialFilters, isLoading = false }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>(
    initialFilters || {
      search: '',
      location: '',
      jobTypes: []
    }
  );

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onFiltersChange?.(newFilters);
    }, 300);
  };

  const handleLocationChange = (value: string) => {
    const newFilters = { ...filters, location: value };
    setFilters(newFilters);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onFiltersChange?.(newFilters);
    }, 300);
  };

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const newJobTypes = checked 
      ? [...filters.jobTypes, type]
      : filters.jobTypes.filter(t => t !== type);
    
    const newFilters = { ...filters, jobTypes: newJobTypes };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    const newFilters = { search: '', location: '', jobTypes: [] };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title text-lg font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            Filters
            {isLoading && (
              <span className="loading loading-spinner loading-xs ml-2"></span>
            )}
          </h2>
          <button 
            onClick={clearFilters}
            className="btn btn-ghost btn-sm text-base-content/70 hover:text-base-content"
            disabled={isLoading}
          >
            Clear All
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Search Jobs
              </span>
            </label>
            <input 
              type="text" 
              placeholder="Job title, company..." 
              className="input input-bordered focus:input-primary transition-all duration-200" 
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Location
              </span>
            </label>
            <input 
              type="text" 
              placeholder="City, state, or remote..." 
              className="input input-bordered focus:input-primary transition-all duration-200" 
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"/>
                </svg>
                Job Type
              </span>
            </label>
            <div className="space-y-3 mt-2">
              {['Full-Time', 'Part-Time', 'Contract'].map((type) => (
                <label key={type} className="label cursor-pointer justify-start gap-3 py-2 px-3 rounded-lg hover:bg-base-200 transition-colors duration-150">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary checkbox-sm" 
                    checked={filters.jobTypes.includes(type)}
                    onChange={(e) => handleJobTypeChange(type, e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="label-text">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {(filters.search || filters.location || filters.jobTypes.length > 0) && (
          <div className="mt-6 pt-6 border-t border-base-300">
            <div className="label">
              <span className="label-text font-medium text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                Active Filters
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.search && (
                <div className="badge badge-primary gap-2 p-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  {filters.search}
                  <button 
                    onClick={() => {
                      if (searchTimeoutRef.current) {
                        clearTimeout(searchTimeoutRef.current);
                      }
                      const newFilters = { ...filters, search: '' };
                      setFilters(newFilters);
                      onFiltersChange?.(newFilters);
                    }}
                    className="hover:bg-primary-focus rounded-full p-0.5 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              )}
              {filters.location && (
                <div className="badge badge-secondary gap-2 p-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  {filters.location}
                  <button 
                    onClick={() => handleLocationChange('')}
                    className="hover:bg-secondary-focus rounded-full p-0.5 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              )}
              {filters.jobTypes.map((type) => (
                <div key={type} className="badge badge-accent gap-2 p-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"/>
                  </svg>
                  {type}
                  <button 
                    onClick={() => handleJobTypeChange(type, false)}
                    className="hover:bg-accent-focus rounded-full p-0.5 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
