'use client'

import { useState } from "react";
import JobCard from "@/components/JobCard";
import JobFilters, { JobFilters as FilterTypes } from "@/components/JobFilters";

// Mock data for demonstration
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-Time",
    description: "We're looking for a Senior Frontend Developer to join our dynamic team...",
    postedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-Time",
    description: "Join our product team and help shape the future of our platform...",
    postedAt: "2024-01-14"
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Contract",
    description: "We need a talented UX Designer for a 6-month project...",
    postedAt: "2024-01-13"
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Part-Time",
    description: "Looking for a part-time backend engineer to help with our API...",
    postedAt: "2024-01-12"
  }
];

export default function JobsPage() {
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleFiltersChange = (filters: FilterTypes) => {
    let filtered = mockJobs;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Jobs</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover amazing opportunities from top companies around the world
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <JobFilters onFiltersChange={handleFiltersChange} />
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-base-content/70">{filteredJobs.length} jobs found</p>
              <select className="select select-bordered select-sm">
                <option>Sort by: Newest</option>
                <option>Sort by: Oldest</option>
                <option>Sort by: Company</option>
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
      </div>
    </div>
  );
}
