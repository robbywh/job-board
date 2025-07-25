import { Search, Home } from 'lucide-react'
import Link from 'next/link'

export default function JobNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-base-100 rounded-box shadow-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-warning" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <p className="text-base-content/70 mb-6">
            The job you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/jobs" className="btn btn-primary btn-sm flex-1">
              <Search className="w-4 h-4 mr-2" />
              Browse Jobs
            </Link>
            <Link href="/" className="btn btn-outline btn-sm flex-1">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </div>
          
          <div className="mt-6 pt-4 border-t border-base-300">
            <p className="text-sm text-base-content/60">
              Looking for something specific? Try using our job search filters.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}