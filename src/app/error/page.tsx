'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') || 'Something went wrong. Please try again.'

  return (
    <div className="min-h-screen hero bg-gradient-to-br from-error/20 via-base-200 to-warning/20">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-error-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-error">Oops! Something went wrong</h1>
            <div className="alert alert-error mb-6">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm">{message}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link href="/login" className="btn btn-primary btn-block">
              Try Again
            </Link>
            <Link href="/" className="btn btn-outline btn-block">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}