'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Building2, Users, Eye, MoreHorizontal, Edit, FileText } from 'lucide-react';
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
                                <Building2 className="w-4 h-4" />
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
                        <Users className="w-4 h-4 text-base-content/60" />
                        0
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-base-content/60" />
                        0
                      </div>
                    </td>
                    <td className="text-sm">{new Date(job.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => openModal(job)}
                        className="btn btn-ghost btn-xs"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-base-content/40" />
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
                  <Eye className="w-4 h-4" />
                  View Job
                </Link>
              )}
              <Link 
                href={`/dashboard/edit-job/${selectedJob.id}`} 
                className="btn btn-outline btn-secondary"
                onClick={closeModal}
              >
                <Edit className="w-4 h-4" />
                Edit Job
              </Link>
              {<div className="divider"></div>}
              <DeleteJobButton 
                jobId={selectedJob.id} 
                jobTitle={selectedJob.title}
                onClose={closeModal}
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
