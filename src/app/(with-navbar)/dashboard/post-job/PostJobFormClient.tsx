'use client'

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { createJob } from '../actions';
import CompanySelector from './CompanySelector';

const initialState = {
  success: false,
  error: null as string | null,
  errors: {} as Record<string, string[]>
};

function SubmitButton({ isLogoUploading }: { isLogoUploading: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = pending || isLogoUploading;
  
  return (
    <button 
      type="submit"
      disabled={isDisabled}
      className="btn btn-primary btn-lg w-full"
    >
      {isDisabled ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          {isLogoUploading ? 'Uploading Logo...' : 'Posting Job...'}
        </>
      ) : (
        <>
          <Plus className="w-5 h-5" />
          Post Job
        </>
      )}
    </button>
  );
}

export default function PostJobFormClient() {
  const [state, formAction] = useActionState(createJob, initialState);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  
  const handleCompanySelect = () => {
  };

  const handleLogoSelect = () => {
  };
  
  const handleUploadStateChange = (uploading: boolean) => {
    setIsLogoUploading(uploading);
  };

  return (
    <>
      {state.success && (
        <div className="alert alert-success mb-4">
          <CheckCircle className="w-5 h-5" />
          <span>Job posted successfully!</span>
        </div>
      )}

      {state.error && (
        <div className="alert alert-error mb-4">
          <AlertCircle className="w-5 h-5" />
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="form-control">
          <div className="mb-2">
            <label className="label-text font-medium">Job Title <span className="text-error">*</span></label>
          </div>
          <input 
            type="text" 
            name="title"
            placeholder="e.g. Senior React Developer"
            className="input input-bordered focus:input-primary text-base" 
            required
          />
          {state.errors?.title && (
            <div className="mt-1">
              <span className="label-text-alt text-error">{state.errors.title[0]}</span>
            </div>
          )}
        </div>

        <CompanySelector 
          onCompanySelect={handleCompanySelect}
          onLogoSelect={handleLogoSelect}
          onUploadStateChange={handleUploadStateChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="form-control">
            <div className="mb-2">
              <label className="label-text font-medium">Location <span className="text-error">*</span></label>
            </div>
            <input 
              type="text" 
              name="location"
              placeholder="San Francisco, CA or Remote"
              className="input input-bordered focus:input-primary text-base" 
              required
            />
            {state.errors?.location && (
              <div className="mt-1">
                <span className="label-text-alt text-error">{state.errors.location[0]}</span>
              </div>
            )}
          </div>

          <div className="form-control">
            <div className="mb-2">
              <label className="label-text font-medium">Job Type <span className="text-error">*</span></label>
            </div>
            <select 
              name="jobType"
              className="select select-bordered focus:select-primary text-base" 
              required
            >
              <option value="">Select job type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
            {state.errors?.jobType && (
              <div className="mt-1">
                <span className="label-text-alt text-error">{state.errors.jobType[0]}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-control">
          <div className="mb-2">
            <label className="label-text font-medium">Job Description <span className="text-error">*</span></label>
          </div>
          <textarea 
            name="description"
            className="textarea textarea-bordered h-28 sm:h-32 focus:textarea-primary resize-none text-base w-full" 
            placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
            required
          ></textarea>
          <div className="mt-1">
            <span className="label-text-alt">Minimum 50 characters • Be specific about daily tasks and growth opportunities</span>
          </div>
          {state.errors?.description && (
            <div className="mt-1">
              <span className="label-text-alt text-error">{state.errors.description[0]}</span>
            </div>
          )}
        </div>

        <div className="form-control pt-6 sm:pt-8">
          <SubmitButton isLogoUploading={isLogoUploading} />
          <div className="text-center mt-3">
            <span className="label-text-alt text-base-content/60 text-xs sm:text-sm">
              Your job will be reviewed and published within 24 hours
            </span>
          </div>
        </div>
      </form>
    </>
  );
}