'use client'

import { useState } from 'react'
import { XCircle, AtSign, Lock, LogIn, UserPlus, Mail, Info } from 'lucide-react'
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
                <XCircle className="stroke-current shrink-0 h-6 w-6" />
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
                  <AtSign className="w-4 h-4 mr-2" />
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
                  <Lock className="w-4 h-4 mr-2" />
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
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
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
                  <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
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
              <Mail className="w-8 h-8 text-primary-content" />
            </div>
            <h3 className="font-bold text-xl mb-2">Check Your Email</h3>
            <p className="text-base-content/70 mb-6">
              We&apos;ve sent you a confirmation link. Please check your email and click the link to verify your account.
            </p>
            
            <div className="alert alert-info mb-4">
              <Info className="w-5 h-5" />
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
