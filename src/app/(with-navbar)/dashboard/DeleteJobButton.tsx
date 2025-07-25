'use client'

import { Trash2 } from 'lucide-react';
import DeleteJobModal from '@/components/job/DeleteJobModal';

interface DeleteJobButtonProps {
  jobId: string;
  jobTitle: string;
  onClose?: () => void;
}

export default function DeleteJobButton({ jobId, jobTitle, onClose }: DeleteJobButtonProps) {
  return (
    <DeleteJobModal
      jobId={jobId}
      jobTitle={jobTitle}
      onClose={onClose}
      trigger={
        <button className="btn btn-outline btn-error w-full">
          <Trash2 className="w-4 h-4" />
          Delete Job
        </button>
      }
    />
  );
}