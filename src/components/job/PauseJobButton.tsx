'use client'

import { useState } from 'react';
import { PauseCircle, FileX } from 'lucide-react';
import { toggleJobStatus } from '@/actions/job-actions';

interface PauseJobButtonProps {
  jobId: string;
  currentStatus: 'active' | 'inactive';
  variant?: 'button' | 'block';
}

export default function PauseJobButton({ jobId, currentStatus, variant = 'button' }: PauseJobButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await toggleJobStatus(jobId, newStatus);
    } catch (error) {
      console.error('Failed to toggle job status:', error);
      alert('Failed to update job status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isActive = currentStatus === 'active';
  const buttonClasses = variant === 'block' 
    ? 'btn btn-warning btn-sm btn-block' 
    : 'btn btn-warning btn-sm';

  return (
    <button 
      className={buttonClasses}
      onClick={handleToggle}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          {isActive ? 'Pausing...' : 'Activating...'}
        </>
      ) : (
        <>
          {isActive ? (
            <>
              <PauseCircle className="w-4 h-4" />
              Pause Job Posting
            </>
          ) : (
            <>
              <FileX className="w-4 h-4" />
              Activate Job Posting
            </>
          )}
        </>
      )}
    </button>
  );
}
