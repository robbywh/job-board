import { AuthError } from '@supabase/supabase-js'
import { validateEmail } from '@/utils/validation'

export interface AuthResult {
  success: boolean
  error?: string
  redirectTo?: string
}

export function handleAuthError(error: AuthError | null): AuthResult {
  if (!error) {
    return { success: true }
  }

  console.error('Auth error:', error)

  // Map common auth errors to user-friendly messages
  switch (error.message) {
    case 'Invalid login credentials':
      return {
        success: false,
        error: 'Invalid email or password. Please check your credentials and try again.'
      }
    case 'Email not confirmed':
      return {
        success: false,
        error: 'Please check your email and confirm your account before signing in.'
      }
    case 'User already registered':
      return {
        success: false,
        error: 'An account with this email already exists. Please sign in instead.'
      }
    case 'Signup disabled':
      return {
        success: false,
        error: 'Account registration is currently disabled. Please contact support.'
      }
    default:
      return {
        success: false,
        error: error.message || 'An unexpected error occurred. Please try again.'
      }
  }
}

export function validateAuthInput(email: string, password: string): AuthResult {
  if (!email || !email.trim()) {
    return { success: false, error: 'Email is required' }
  }

  if (!validateEmail(email)) {
    return { success: false, error: 'Please enter a valid email address' }
  }

  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long' }
  }

  return { success: true }
}

