'use client'

import { useState } from "react";
import { createJob } from "../actions";
import { validateJobForm } from "@/lib/utils";
import { FormError, SuccessMessage } from "@/components/ui/ErrorDisplay";

export default function PostJobForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrors([]);
    setSuccess('');

    const jobData = {
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      jobType: formData.get('jobType') as string,
      description: formData.get('description') as string
    };

    const validation = validateJobForm(jobData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      await createJob(formData);
      setSuccess('Job posted successfully!');
      // Reset form after successful submission
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch {
      setErrors(['Failed to post job. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
            
            {errors.length > 0 && <FormError errors={errors} />}
            {success && <SuccessMessage message={success} />}
            
            <form action={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div className="form-control">
                <label className="label" htmlFor="title">
                  <span className="label-text font-medium">Job Title *</span>
                </label>
                <input 
                  id="title"
                  name="title" 
                  type="text" 
                  placeholder="e.g. Senior React Developer" 
                  className="input input-bordered focus:input-primary transition-all duration-200" 
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Company */}
              <div className="form-control">
                <label className="label" htmlFor="company">
                  <span className="label-text font-medium">Company Name *</span>
                </label>
                <input 
                  id="company"
                  name="company" 
                  type="text" 
                  placeholder="Your company name" 
                  className="input input-bordered focus:input-primary transition-all duration-200" 
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Location and Job Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label" htmlFor="location">
                    <span className="label-text font-medium">Location *</span>
                  </label>
                  <input 
                    id="location"
                    name="location" 
                    type="text" 
                    placeholder="e.g. San Francisco, CA or Remote" 
                    className="input input-bordered focus:input-primary transition-all duration-200" 
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="jobType">
                    <span className="label-text font-medium">Job Type *</span>
                  </label>
                  <select 
                    id="jobType"
                    name="jobType" 
                    className="select select-bordered focus:select-primary transition-all duration-200" 
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select job type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              {/* Salary */}
              <div className="form-control">
                <label className="label" htmlFor="salary">
                  <span className="label-text font-medium">Salary Range</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <input 
                  id="salary"
                  name="salary" 
                  type="text" 
                  placeholder="e.g. $80,000 - $120,000 or $50/hour" 
                  className="input input-bordered focus:input-primary transition-all duration-200"
                  disabled={isSubmitting}
                />
                <label className="label">
                  <span className="label-text-alt">This helps attract the right candidates</span>
                </label>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label" htmlFor="description">
                  <span className="label-text font-medium">Job Description *</span>
                </label>
                <textarea 
                  id="description"
                  name="description" 
                  className="textarea textarea-bordered h-32 focus:textarea-primary transition-all duration-200" 
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  required
                  disabled={isSubmitting}
                ></textarea>
                <label className="label">
                  <span className="label-text-alt">Minimum 50 characters</span>
                </label>
              </div>

              {/* Requirements */}
              <div className="form-control">
                <label className="label" htmlFor="requirements">
                  <span className="label-text font-medium">Requirements</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <textarea 
                  id="requirements"
                  name="requirements" 
                  className="textarea textarea-bordered h-24 focus:textarea-primary transition-all duration-200" 
                  placeholder="List the required skills, experience, and qualifications..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Benefits */}
              <div className="form-control">
                <label className="label" htmlFor="benefits">
                  <span className="label-text font-medium">Benefits & Perks</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <textarea 
                  id="benefits"
                  name="benefits" 
                  className="textarea textarea-bordered h-24 focus:textarea-primary transition-all duration-200" 
                  placeholder="Health insurance, flexible hours, remote work, etc..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Application Instructions */}
              <div className="form-control">
                <label className="label" htmlFor="applicationInstructions">
                  <span className="label-text font-medium">Application Instructions</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <textarea 
                  id="applicationInstructions"
                  name="applicationInstructions" 
                  className="textarea textarea-bordered h-20 focus:textarea-primary transition-all duration-200" 
                  placeholder="How should candidates apply? Include email, portfolio requirements, etc..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="form-control mt-8">
                <div className="flex gap-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Posting Job...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Post Job
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    disabled={isSubmitting}
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sidebar with Tips */}
      <div className="lg:col-span-1">
        <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg sticky top-8">
          <div className="card-body">
            <h3 className="font-bold text-lg mb-4">💡 Tips for a Great Job Post</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Clear Job Title</h4>
                <p className="text-sm text-base-content/70">Use specific, searchable titles that candidates understand.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm">Detailed Description</h4>
                <p className="text-sm text-base-content/70">Include day-to-day responsibilities and growth opportunities.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm">Transparent Salary</h4>
                <p className="text-sm text-base-content/70">Posts with salary ranges get 30% more applications.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm">Company Culture</h4>
                <p className="text-sm text-base-content/70">Highlight what makes your workplace unique.</p>
              </div>
            </div>

            <div className="divider"></div>
            
            <div className="text-center">
              <div className="stat">
                <div className="stat-title text-xs">Average Time to Fill</div>
                <div className="stat-value text-lg text-primary">23 days</div>
                <div className="stat-desc text-xs">For similar positions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
