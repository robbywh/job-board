'use client'

import { deleteJob } from './actions';

interface DeleteJobButtonProps {
  jobId: string;
  jobTitle: string;
}

export default function DeleteJobButton({ jobId, jobTitle }: DeleteJobButtonProps) {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${jobTitle}"? This action cannot be undone.`)) {
      await deleteJob(jobId);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 rounded"
    >
      Delete
    </button>
  );
}