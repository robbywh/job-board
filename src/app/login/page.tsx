'use client'

import { useState } from 'react'
import { login, signup } from './actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData, action: typeof login | typeof signup) => {
    setIsLoading(true)
    setError(null)
    
    const result = await action(formData)
    
    if (result?.error) {
      setError(result.error)
    }
    
    setIsLoading(false)
  }
  return (
    <div className="min-h-screen hero bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="hero-content flex-col lg:flex-row-reverse relative z-10">
        <div className="text-center lg:text-left lg:ml-8">
          <div className="flex items-center justify-center lg:justify-start mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"></path>
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Job Board
            </h1>
          </div>
          <p className="text-xl mb-4 text-base-content/80">
            🚀 Your dream career starts here
          </p>
          <p className="py-6 text-base-content/70 max-w-md">
            Connect with top employers and discover opportunities that match your skills. 
            Join thousands of professionals building their future through our platform.
          </p>
          
          {/* Stats */}
          <div className="stats shadow bg-base-100/50 backdrop-blur-sm">
            <div className="stat place-items-center">
              <div className="stat-title">Active Jobs</div>
              <div className="stat-value text-primary">10K+</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Companies</div>
              <div className="stat-value text-secondary">500+</div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100/90 backdrop-blur-sm w-full max-w-sm shrink-0 shadow-2xl border border-base-300/50">
          <div className="card-body">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="text-sm text-base-content/60">Sign in to your account</p>
            </div>
            
            {/* Error Alert */}
            {error && (
              <div className="alert alert-error mb-4">
                <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm">{error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="btn btn-sm btn-ghost"
                >
                  ✕
                </button>
              </div>
            )}
            
            <form className="space-y-4">
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                    Email
                  </span>
                </label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  className="input input-bordered focus:input-primary transition-all duration-200" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Password
                  </span>
                </label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  className="input input-bordered focus:input-primary transition-all duration-200" 
                  required 
                />
              </div>
              
              <div className="form-control mt-6 space-y-3">
                <button 
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget.closest('form') as HTMLFormElement
                    const formData = new FormData(form)
                    handleSubmit(formData, login)
                  }}
                  disabled={isLoading}
                  className="btn btn-primary btn-block group"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                  )}
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                
                <div className="divider text-xs">or</div>
                
                <button 
                  type="button"
                  onClick={(e) => {
                    const form = e.currentTarget.closest('form') as HTMLFormElement
                    const formData = new FormData(form)
                    handleSubmit(formData, signup)
                  }}
                  disabled={isLoading}
                  className="btn btn-outline btn-secondary btn-block group"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  )}
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-base-content/50">
                By continuing, you agree to our 
                <a href="#" className="link link-primary"> Terms </a> 
                and 
                <a href="#" className="link link-primary"> Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="badge badge-primary badge-lg gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          Secure & Trusted
        </div>
      </div>
    </div>
  )
}