'use client'

import { useState, useEffect } from "react";
import JobApplicationSkeleton from "./JobApplicationSkeleton";

interface JobApplicationFormProps {
  jobId: number;
  jobTitle: string;
  company: string;
}

export default function JobApplicationForm({ jobId, jobTitle, company }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading form data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <JobApplicationSkeleton />;
  }

  if (submitted) {
    return (
      <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
        <div className="card-body text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
          <p className="text-base-content/70 mb-4">
            Thank you for applying to {jobTitle} at {company}. We&apos;ll review your application and get back to you soon.
          </p>
          <div className="alert alert-info">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            <div className="text-sm">
              You can track your application status in your dashboard.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-xl mb-4">Apply for this Position</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">First Name *</span>
              </label>
              <input 
                type="text" 
                placeholder="John" 
                className="input input-bordered focus:input-primary" 
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Last Name *</span>
              </label>
              <input 
                type="text" 
                placeholder="Doe" 
                className="input input-bordered focus:input-primary" 
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email *</span>
            </label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="input input-bordered focus:input-primary" 
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Phone Number</span>
            </label>
            <input 
              type="tel" 
              placeholder="+1 (555) 123-4567" 
              className="input input-bordered focus:input-primary"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Resume/CV *</span>
            </label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              className="file-input file-input-bordered focus:file-input-primary" 
              required
              disabled={isSubmitting}
            />
            <label className="label">
              <span className="label-text-alt">PDF, DOC, or DOCX format (max 5MB)</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Cover Letter</span>
              <span className="label-text-alt">Optional</span>
            </label>
            <textarea 
              className="textarea textarea-bordered h-32 focus:textarea-primary" 
              placeholder="Tell us why you're interested in this role and what makes you a great fit..."
              disabled={isSubmitting}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Portfolio/LinkedIn URL</span>
            </label>
            <input 
              type="url" 
              placeholder="https://..." 
              className="input input-bordered focus:input-primary"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="cursor-pointer label justify-start">
              <input type="checkbox" className="checkbox checkbox-primary" required disabled={isSubmitting} />
              <span className="label-text ml-2">
                I agree to the <a href="#" className="link link-primary">Terms of Service</a> and <a href="#" className="link link-primary">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div className="form-control mt-6">
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Submitting Application...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
