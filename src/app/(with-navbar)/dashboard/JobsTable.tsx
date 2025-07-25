'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Job, Company } from "@/types/database";
import DeleteJobButton from "./DeleteJobButton";

type JobWithCompany = Job & {
  companies: Company;
};

interface JobsTableProps {
  jobs: JobWithCompany[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<JobWithCompany | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (job: JobWithCompany) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const filteredJobs = statusFilter === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === statusFilter);

  return (
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title text-2xl">Your Job Postings</h2>
          <div className="flex gap-2">
            <select 
              className="select select-bordered select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pb-32">
          {filteredJobs.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Views</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded bg-base-300">
                            {job.companies.logo_url ? (
                              <Image 
                                src={job.companies.logo_url} 
                                alt={`${job.companies.name} logo`} 
                                width={32}
                                height={32}
                                className="object-cover rounded" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-base-content/60">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{job.title}</div>
                          <div className="text-sm text-base-content/60">{job.companies.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{job.location}</td>
                    <td>
                      <div className={`badge ${
                        job.type === 'Full-Time' ? 'badge-primary' : 
                        job.type === 'Part-Time' ? 'badge-secondary' : 
                        'badge-accent'
                      } badge-sm`}>
                        {job.type}
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${
                        job.status === 'active' ? 'badge-success' : 'badge-error'
                      } badge-sm`}>
                        {job.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        0
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        0
                      </div>
                    </td>
                    <td className="text-sm">{new Date(job.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => openModal(job)}
                        className="btn btn-ghost btn-xs"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-base-content/60">No jobs match the selected status filter.</p>
            </div>
          )}
        </div>
      </div>
      
      {isModalOpen && selectedJob && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Actions for &ldquo;{selectedJob.title}&rdquo;</h3>
            <div className="flex flex-col gap-2">
              {selectedJob.status === 'active' && (
                <Link 
                  href={`/jobs/${selectedJob.id}`} 
                  className="btn btn-outline btn-primary"
                  onClick={closeModal}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  View Job
                </Link>
              )}
              <Link 
                href={`/dashboard/edit-job/${selectedJob.id}`} 
                className="btn btn-outline btn-secondary"
                onClick={closeModal}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit Job
              </Link>
              {<div className="divider"></div>}
              <DeleteJobButton 
                jobId={selectedJob.id} 
                jobTitle={selectedJob.title} 
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
