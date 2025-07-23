import Link from 'next/link'

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen hero bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Check Your Email</h1>
            <p className="text-base-content/70">
              We&apos;ve sent you a confirmation link. Please check your email and click the link to verify your account.
            </p>
          </div>
          
          <div className="alert alert-info mb-6">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            <div>
              <h3 className="font-bold">Important!</h3>
              <div className="text-xs">Don&apos;t forget to check your spam folder if you don&apos;t see the email.</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link href="/login" className="btn btn-primary btn-block">
              Back to Sign In
            </Link>
            <Link href="/" className="btn btn-outline btn-block">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
