import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, XCircle, CheckCircle } from 'lucide-react';

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
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-base-content/70 mb-8">{message}</p>
        
        <div className="flex gap-4 justify-center">
          {showRetryButton && onRetry && (
            <button onClick={onRetry} className="btn btn-primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          )}
          
          {showHomeButton && (
            <Link href="/" className="btn btn-outline">
              <Home className="w-4 h-4 mr-2" />
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
      <XCircle className="stroke-current shrink-0 h-6 w-6" />
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
      <CheckCircle className="stroke-current shrink-0 h-6 w-6" />
      <span>{message}</span>
    </div>
  );
}
