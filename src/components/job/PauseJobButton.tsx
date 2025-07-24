'use client'

import { useState } from 'react';
import { toggleJobStatus } from '@/app/(with-navbar)/dashboard/actions';

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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause Job Posting
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Activate Job Posting
            </>
          )}
        </>
      )}
    </button>
  );
}
