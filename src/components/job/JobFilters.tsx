'use client'

import { useState, useEffect, useRef } from "react";
import { Filter, Search, MapPin, X, Briefcase, Tag } from 'lucide-react';

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
            <Filter className="w-5 h-5" />
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
                <Search className="w-4 h-4" />
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
                <MapPin className="w-4 h-4" />
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
                <Briefcase className="w-4 h-4" />
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
                <Tag className="w-4 h-4" />
                Active Filters
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.search && (
                <div className="badge badge-primary gap-2 p-3">
                  <Search className="w-3 h-3" />
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
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.location && (
                <div className="badge badge-secondary gap-2 p-3">
                  <MapPin className="w-3 h-3" />
                  {filters.location}
                  <button 
                    onClick={() => handleLocationChange('')}
                    className="hover:bg-secondary-focus rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {filters.jobTypes.map((type) => (
                <div key={type} className="badge badge-accent gap-2 p-3">
                  <Briefcase className="w-3 h-3" />
                  {type}
                  <button 
                    onClick={() => handleJobTypeChange(type, false)}
                    className="hover:bg-accent-focus rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
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
