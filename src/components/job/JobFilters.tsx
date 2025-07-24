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
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for debouncing
    searchTimeoutRef.current = setTimeout(() => {
      onFiltersChange?.(newFilters);
    }, 300);
  };

  const handleLocationChange = (value: string) => {
    const newFilters = { ...filters, location: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
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
    const newFilters = { search: '', location: '', jobTypes: [] };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
    
    // Clear any pending search timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title flex items-center">
            Filters
            {isLoading && (
              <span className="loading loading-spinner loading-xs ml-2"></span>
            )}
          </h2>
          <button 
            onClick={clearFilters}
            className="btn btn-ghost btn-xs"
            disabled={isLoading}
          >
            Clear All
          </button>
        </div>
        
        {/* Search */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Search</span>
          </label>
          <input 
            type="text" 
            placeholder="Job title, company..." 
            className="input input-bordered input-sm" 
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Location Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <select 
            className="select select-bordered select-sm"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">All Locations</option>
            <option value="San Francisco">San Francisco</option>
            <option value="New York">New York</option>
            <option value="Seattle">Seattle</option>
            <option value="Remote">Remote</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Austin">Austin</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="WA">Washington</option>
          </select>
        </div>

        {/* Job Type Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <div className="space-y-2">
            {['Full-Time', 'Part-Time', 'Contract'].map((type) => (
              <label key={type} className="label cursor-pointer justify-start">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-sm" 
                  checked={filters.jobTypes.includes(type)}
                  onChange={(e) => handleJobTypeChange(type, e.target.checked)}
                  disabled={isLoading}
                />
                <span className="label-text ml-2">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.location || filters.jobTypes.length > 0) && (
          <div className="mt-4">
            <div className="label">
              <span className="label-text">Active Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <div className="badge badge-primary gap-2">
                  Search: {filters.search}
                  <button 
                    onClick={() => {
                      if (searchTimeoutRef.current) {
                        clearTimeout(searchTimeoutRef.current);
                      }
                      const newFilters = { ...filters, search: '' };
                      setFilters(newFilters);
                      onFiltersChange?.(newFilters);
                    }}
                    className="btn btn-ghost btn-xs p-0"
                  >
                    ×
                  </button>
                </div>
              )}
              {filters.location && (
                <div className="badge badge-secondary gap-2">
                  {filters.location}
                  <button 
                    onClick={() => handleLocationChange('')}
                    className="btn btn-ghost btn-xs p-0"
                  >
                    ×
                  </button>
                </div>
              )}
              {filters.jobTypes.map((type) => (
                <div key={type} className="badge badge-accent gap-2">
                  {type}
                  <button 
                    onClick={() => handleJobTypeChange(type, false)}
                    className="btn btn-ghost btn-xs p-0"
                  >
                    ×
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
