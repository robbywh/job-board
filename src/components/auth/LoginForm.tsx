'use client'

import { useState } from 'react'
import { login, signup } from '@/app/login/actions'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailConfirmModal, setShowEmailConfirmModal] = useState(false)

  const handleSubmit = async (formData: FormData, action: typeof login | typeof signup) => {
    setIsLoading(true)
    setError(null)
    
    const result = await action(formData)
    
    if (result?.error) {
      setError(result.error)
    } else if (result && 'emailConfirmation' in result) {
      setShowEmailConfirmModal(true)
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <div className="card bg-base-100/90 backdrop-blur-sm w-full max-w-sm shrink-0 shadow-2xl border border-base-300/50">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <p className="text-sm text-base-content/60">Sign in to your account</p>
          </div>
          
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
            error ? 'max-h-20 mb-4' : 'max-h-0 mb-0'
          }`}>
            <div className={`transform transition-all duration-300 ease-in-out ${
              error 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-2 scale-95'
            }`}>
              <div className="alert alert-error">
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
            </div>
          </div>
          
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

      <div className={`modal ${showEmailConfirmModal ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">Check Your Email</h3>
            <p className="text-base-content/70 mb-6">
              We&apos;ve sent you a confirmation link. Please check your email and click the link to verify your account.
            </p>
            
            <div className="alert alert-info mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <div className="text-sm">
                Don&apos;t forget to check your spam folder if you don&apos;t see the email.
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                className="btn btn-primary btn-block"
                onClick={() => setShowEmailConfirmModal(false)}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
        <div className="modal-backdrop" onClick={() => setShowEmailConfirmModal(false)}></div>
      </div>
    </>
  )
}
