'use client'

import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-error/10 via-base-200 to-error/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-base-100 rounded-box shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-error" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-3">Something went wrong!</h1>
          <p className="text-base-content/70 mb-6">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left mb-6 p-4 bg-base-200 rounded-lg">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 text-sm text-error whitespace-pre-wrap overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="btn btn-primary flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
            <Link href="/" className="btn btn-outline flex-1">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}