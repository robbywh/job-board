'use client'

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteJob } from '@/actions/job-actions';

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
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Delete Job Posting</h3>

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
                    <Trash2 className="w-4 h-4" />
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
