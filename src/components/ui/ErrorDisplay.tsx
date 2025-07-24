import Link from "next/link";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export default function ErrorDisplay({
  title = "Something went wrong",
  message = "We encountered an error while processing your request.",
  showHomeButton = true,
  showRetryButton = false,
  onRetry
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-base-content/70 mb-8">{message}</p>
        
        <div className="flex gap-4 justify-center">
          {showRetryButton && onRetry && (
            <button onClick={onRetry} className="btn btn-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Try Again
            </button>
          )}
          
          {showHomeButton && (
            <Link href="/" className="btn btn-outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Go Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function FormError({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;

  return (
    <div className="alert alert-error">
      <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <h3 className="font-bold">Please fix the following errors:</h3>
        <ul className="list-disc list-inside mt-2">
          {errors.map((error, index) => (
            <li key={index} className="text-sm">{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="alert alert-success">
      <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>{message}</span>
    </div>
  );
}
