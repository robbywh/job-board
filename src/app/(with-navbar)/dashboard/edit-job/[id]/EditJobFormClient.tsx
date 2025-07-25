'use client'

import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import { useActionState, useState } from 'react';
import { Check, AlertCircle, Building2, ImageIcon, Upload } from 'lucide-react';
import { processLogoUpload, UploadProgress } from '@/lib/upload';

interface FormState {
  success: boolean;
  error: string | null;
  errors: Record<string, string[]>;
}

interface EditJobFormClientProps {
  job: {
    id: string;
    title: string;
    description: string;
    location: string;
    type: 'Full-Time' | 'Part-Time' | 'Contract';
    company_id: string;
    companies: {
      name: string;
      logo_url: string | null;
    };
  };
  updateJobAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit"
      disabled={pending}
      className="btn btn-primary btn-lg w-full"
    >
      {pending ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          Updating Job...
        </>
      ) : (
        <>
          <Check className="w-5 h-5" />
          Update Job
        </>
      )}
    </button>
  );
}

export default function EditJobFormClient({ job, updateJobAction }: EditJobFormClientProps) {
  const [state, formAction] = useActionState(updateJobAction, {
    success: false,
    error: null,
    errors: {}
  });

  const [logoPreview, setLogoPreview] = useState(job.companies.logo_url || '');
  const [logoUrl, setLogoUrl] = useState(job.companies.logo_url || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const handleProgress = (progress: UploadProgress) => {
      setIsUploading(progress.isUploading);
      if (progress.preview) {
        setLogoPreview(progress.preview);
      }
    };

    const { uploadResult } = await processLogoUpload(file, handleProgress);

    if (uploadResult.success && uploadResult.url) {
      setLogoUrl(uploadResult.url);
    } else {
      alert(uploadResult.error || 'Failed to upload logo. Please try again.');
      setLogoPreview(job.companies.logo_url || '');
      setLogoUrl(job.companies.logo_url || '');
    }
  };

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="jobId" value={job.id} />
      
      {state.error && (
        <div className="alert alert-error">
          <AlertCircle className="w-4 h-4" />
          <span>{state.error}</span>
        </div>
      )}
      
      {state.success && (
        <div className="alert alert-success">
          <Check className="w-4 h-4" />
          <span>Job updated successfully!</span>
        </div>
      )}
      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium">Job Title <span className="text-error">*</span></label>
        </div>
        <input 
          name="title" 
          type="text" 
          defaultValue={job.title}
          placeholder="e.g. Senior React Developer"
          className={`input input-bordered focus:input-primary text-base ${state.errors?.title ? 'input-error' : ''}`}
          required 
        />
        {state.errors?.title && (
          <div className="label">
            <span className="label-text-alt text-error">{state.errors.title[0]}</span>
          </div>
        )}
      </div>

      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium">Company <span className="text-error">*</span></label>
        </div>
        <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
          <div className="avatar">
            <div className="w-10 h-10 rounded bg-base-300">
              {logoPreview ? (
                <Image 
                  src={logoPreview} 
                  alt={`${job.companies.name} logo`} 
                  width={40}
                  height={40}
                  className="object-cover rounded" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-base-content/60">
                  <Building2 className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-semibold">{job.companies.name}</div>
            <div className="text-sm text-base-content/60">Company name cannot be changed when editing</div>
          </div>
        </div>
        <input type="hidden" name="companyId" value={job.company_id} />
        <input type="hidden" name="isNewCompany" value="false" />
        <input type="hidden" name="logoUrl" value={logoUrl} />
      </div>

      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium">Company Logo <span className="text-base-content/60">(optional)</span></label>
          <span className="label-text-alt text-base-content/60 text-xs ml-2">PNG, JPG, WebP, SVG • Max 2MB</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="avatar self-center sm:self-start">
            <div className="w-16 h-16 rounded-lg bg-base-200 flex items-center justify-center flex-shrink-0">
              {logoPreview ? (
                <Image 
                  src={logoPreview} 
                  alt="Company logo preview" 
                  width={64}
                  height={64}
                  style={{ width: '64px', height: '64px' }}
                  className="object-cover rounded-lg" 
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-base-content/40" />
              )}
            </div>
          </div>
          
          <div className="flex-1 w-full sm:w-auto">
            <input 
              type="file" 
              accept=".png,.jpg,.jpeg,.webp,.svg"
              onChange={handleLogoChange}
              className="file-input file-input-bordered file-input-sm w-full text-sm"
              disabled={isUploading}
              name="logo"
            />
            
            {isUploading && (
              <div className="mt-2">
                <div className="alert alert-info py-2 px-3">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="text-xs">Uploading logo...</span>
                </div>
              </div>
            )}
            
            <div className="mt-2">
              <div className="alert alert-info py-2 px-3">
                <Upload className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs">Upload a new logo to update the company logo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="form-control">
          <div className="mb-2">
            <label className="label-text font-medium">Location <span className="text-error">*</span></label>
          </div>
          <input 
            name="location" 
            type="text" 
            defaultValue={job.location}
            placeholder="San Francisco, CA or Remote"
            className="input input-bordered focus:input-primary text-base" 
            required 
          />
        </div>

        <div className="form-control">
          <div className="mb-2">
            <label className="label-text font-medium">Job Type <span className="text-error">*</span></label>
          </div>
          <select 
            name="jobType" 
            className="select select-bordered focus:select-primary text-base" 
            defaultValue={job.type}
            required
          >
            <option value="">Select job type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>

      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium">Job Description <span className="text-error">*</span></label>
        </div>
        <textarea 
          name="description" 
          defaultValue={job.description}
          className="textarea textarea-bordered h-28 sm:h-32 focus:textarea-primary resize-none text-base w-full"
          placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
          required
        ></textarea>
        <div className="mt-1">
          <span className="label-text-alt">Minimum 50 characters • Be specific about daily tasks and growth opportunities</span>
        </div>
      </div>

      <div className="form-control pt-6 sm:pt-8">
        <SubmitButton />
        <div className="text-center mt-3">
          <span className="label-text-alt text-base-content/60 text-xs sm:text-sm">
            Changes will be updated immediately
          </span>
        </div>
      </div>
    </form>
  );
}
