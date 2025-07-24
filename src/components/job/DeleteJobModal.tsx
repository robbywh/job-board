'use client'

import { useState } from 'react';
import { deleteJob } from '@/app/(with-navbar)/dashboard/actions';

interface DeleteJobModalProps {
  jobId: string;
  jobTitle: string;
  onDelete?: () => void;
  trigger: React.ReactNode;
}

export default function DeleteJobModal({ jobId, jobTitle, onDelete, trigger }: DeleteJobModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteJob(jobId);
      onDelete?.();
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger element */}
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Delete Job Posting</h3>
            
            <div className="mb-6">
              <div className="alert alert-warning">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h4 className="font-semibold">This action cannot be undone</h4>
                  <div className="text-sm opacity-80">This will permanently delete the job posting and all associated data.</div>
                </div>
              </div>
            </div>

            <div className="bg-base-200 p-4 rounded-lg mb-6">
              <div className="font-medium text-base-content/80 mb-1">Job Title:</div>
              <div className="font-semibold">{jobTitle}</div>
            </div>

            <p className="mb-6 text-base-content/80">
              Are you absolutely sure you want to delete this job posting? All applications and related data will be permanently removed.
            </p>

            <div className="modal-action">
              <button 
                className="btn btn-ghost" 
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Job
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}
