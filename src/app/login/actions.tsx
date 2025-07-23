'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { handleAuthError, validateAuthInput } from '@/lib/auth'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate input
  const validation = validateAuthInput(email, password)
  if (!validation.success) {
    redirect(`/error?message=${encodeURIComponent(validation.error!)}`)
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  const authResult = handleAuthError(error)
  if (!authResult.success) {
    redirect(`/error?message=${encodeURIComponent(authResult.error!)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate input
  const validation = validateAuthInput(email, password)
  if (!validation.success) {
    redirect(`/error?message=${encodeURIComponent(validation.error!)}`)
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  const authResult = handleAuthError(authError)
  if (!authResult.success) {
    redirect(`/error?message=${encodeURIComponent(authResult.error!)}`)
  }

  revalidatePath('/', 'layout')
  
  // Check if email confirmation is required
  if (authData.user && !authData.user.email_confirmed_at) {
    redirect('/auth/confirm-email')
  }
  
  redirect('/dashboard')
}