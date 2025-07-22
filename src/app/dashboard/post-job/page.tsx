'use client'

import Link from "next/link";
import { useState } from "react";
import { createJob } from "../actions";
import { validateJobForm } from "@/lib/utils";
import { FormError, SuccessMessage } from "@/components/ErrorDisplay";

export default function PostJobPage() {
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
    } catch (error) {
      setErrors(['Failed to post job. Please try again.']);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      {/* Header */}
      <div className="navbar bg-base-100/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"></path>
                </svg>
              </div>
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Job Board
              </Link>
            </div>
          </div>
          <div className="flex-none gap-2">
            <Link href="/dashboard" className="btn btn-ghost btn-sm">
              Dashboard
            </Link>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-content text-sm font-bold">U</span>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li>Post Job</li>
          </ul>
        </div>

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
                      placeholder="e.g. Senior Frontend Developer" 
                      className="input input-bordered focus:input-primary" 
                      required 
                    />
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        Be specific and descriptive
                      </span>
                    </label>
                  </div>

                  {/* Company Name */}
                  <div className="form-control">
                    <label className="label" htmlFor="company">
                      <span className="label-text font-medium">Company Name *</span>
                    </label>
                    <input 
                      id="company" 
                      name="company" 
                      type="text" 
                      placeholder="e.g. TechCorp Inc." 
                      className="input input-bordered focus:input-primary" 
                      required 
                    />
                  </div>

                  {/* Location and Job Type Row */}
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
                        className="input input-bordered focus:input-primary" 
                        required 
                      />
                    </div>

                    <div className="form-control">
                      <label className="label" htmlFor="jobType">
                        <span className="label-text font-medium">Job Type *</span>
                      </label>
                      <select 
                        id="jobType" 
                        name="jobType" 
                        className="select select-bordered focus:select-primary" 
                        required
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

                  {/* Salary Range */}
                  <div className="form-control">
                    <label className="label" htmlFor="salary">
                      <span className="label-text font-medium">Salary Range</span>
                    </label>
                    <input 
                      id="salary" 
                      name="salary" 
                      type="text" 
                      placeholder="e.g. $80,000 - $120,000 or Competitive" 
                      className="input input-bordered focus:input-primary" 
                    />
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        Optional but helps attract candidates
                      </span>
                    </label>
                  </div>

                  {/* Job Description */}
                  <div className="form-control">
                    <label className="label" htmlFor="description">
                      <span className="label-text font-medium">Job Description *</span>
                    </label>
                    <textarea 
                      id="description" 
                      name="description" 
                      placeholder="Describe the role, responsibilities, requirements, and benefits..."
                      className="textarea textarea-bordered h-40 focus:textarea-primary" 
                      required
                    ></textarea>
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        Include responsibilities, requirements, and benefits
                      </span>
                    </label>
                  </div>

                  {/* Requirements */}
                  <div className="form-control">
                    <label className="label" htmlFor="requirements">
                      <span className="label-text font-medium">Requirements</span>
                    </label>
                    <textarea 
                      id="requirements" 
                      name="requirements" 
                      placeholder="List the key requirements, skills, and qualifications..."
                      className="textarea textarea-bordered h-32 focus:textarea-primary"
                    ></textarea>
                  </div>

                  {/* Benefits */}
                  <div className="form-control">
                    <label className="label" htmlFor="benefits">
                      <span className="label-text font-medium">Benefits & Perks</span>
                    </label>
                    <textarea 
                      id="benefits" 
                      name="benefits" 
                      placeholder="Health insurance, 401k, flexible hours, remote work, etc..."
                      className="textarea textarea-bordered h-24 focus:textarea-primary"
                    ></textarea>
                  </div>

                  {/* Application Instructions */}
                  <div className="form-control">
                    <label className="label" htmlFor="applicationInstructions">
                      <span className="label-text font-medium">How to Apply</span>
                    </label>
                    <textarea 
                      id="applicationInstructions" 
                      name="applicationInstructions" 
                      placeholder="Provide instructions on how candidates should apply..."
                      className="textarea textarea-bordered h-24 focus:textarea-primary"
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button 
                      type="submit" 
                      className={`btn btn-primary flex-1 ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Publishing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Publish Job
                        </>
                      )}
                    </button>
                    <button type="button" className="btn btn-outline" disabled={isSubmitting}>
                      Save as Draft
                    </button>
                    <Link href="/dashboard" className="btn btn-ghost">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Preview Card */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg mb-6">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Job Preview
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Title:</span>
                    <span className="ml-2 text-base-content/70">Enter job title...</span>
                  </div>
                  <div>
                    <span className="font-medium">Company:</span>
                    <span className="ml-2 text-base-content/70">Enter company name...</span>
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>
                    <span className="ml-2 text-base-content/70">Enter location...</span>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                    <span className="ml-2 text-base-content/70">Select job type...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg mb-6">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  Tips for Success
                </h3>
                <ul className="space-y-2 text-sm text-base-content/70">
                  <li className="flex items-start gap-2">
                    <span className="text-success text-lg">•</span>
                    Use clear, descriptive job titles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success text-lg">•</span>
                    Include salary range if possible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success text-lg">•</span>
                    Be specific about requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success text-lg">•</span>
                    Highlight company benefits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success text-lg">•</span>
                    Use keywords candidates search for
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  Job Posting
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Free</div>
                  <p className="text-sm text-base-content/70 mb-4">
                    Post unlimited jobs at no cost
                  </p>
                  <ul className="text-sm text-base-content/70 space-y-1">
                    <li>✓ 30-day listing</li>
                    <li>✓ Unlimited applications</li>
                    <li>✓ Email notifications</li>
                    <li>✓ Basic analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
