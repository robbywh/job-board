'use client'

import { AlertTriangle, RefreshCw, Search } from 'lucide-react'
import Link from 'next/link'

export default function JobsError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-base-100 rounded-box shadow-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-error" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-2">Unable to Load Jobs</h2>
          <p className="text-base-content/70 mb-6">
            There was an error loading the job listings. Please try again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="btn btn-primary btn-sm flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
            <Link href="/" className="btn btn-outline btn-sm flex-1">
              <Search className="w-4 h-4 mr-2" />
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}