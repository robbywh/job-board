'use client'

import { useRouter } from 'next/navigation';
import DeleteJobModal from '@/components/job/DeleteJobModal';

interface DeleteJobWrapperProps {
  jobId: string;
  jobTitle: string;
  trigger: React.ReactNode;
}

export default function DeleteJobWrapper({ jobId, jobTitle, trigger }: DeleteJobWrapperProps) {
  const router = useRouter();

  const handleDeleteSuccess = () => {
    // Navigate to dashboard immediately after successful deletion
    // Use replace to avoid going back to a deleted job page
    router.replace('/dashboard');
  };

  return (
    <DeleteJobModal
      jobId={jobId}
      jobTitle={jobTitle}
      onDelete={handleDeleteSuccess}
      trigger={trigger}
    />
  );
}