import { Search, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-base-100 rounded-box shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-3">404</h1>
          <h2 className="text-xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-base-content/70 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn btn-primary flex-1">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
            <Link href="/jobs" className="btn btn-outline flex-1">
              <Search className="w-4 h-4 mr-2" />
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}