'use client'

import { useState } from "react";

interface JobFiltersProps {
  onFiltersChange?: (filters: JobFilters) => void;
}

export interface JobFilters {
  search: string;
  location: string;
  jobTypes: string[];
}

export default function JobFilters({ onFiltersChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    jobTypes: []
  });

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
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
  };

  return (
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Filters</h2>
          <button 
            onClick={clearFilters}
            className="btn btn-ghost btn-xs"
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
          >
            <option value="">All Locations</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Seattle, WA">Seattle, WA</option>
            <option value="Remote">Remote</option>
            <option value="Los Angeles, CA">Los Angeles, CA</option>
            <option value="Chicago, IL">Chicago, IL</option>
            <option value="Austin, TX">Austin, TX</option>
          </select>
        </div>

        {/* Job Type Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <div className="space-y-2">
            {['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance'].map((type) => (
              <label key={type} className="label cursor-pointer justify-start">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-sm" 
                  checked={filters.jobTypes.includes(type)}
                  onChange={(e) => handleJobTypeChange(type, e.target.checked)}
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
                    onClick={() => handleSearchChange('')}
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
