'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { handleAuthError, validateAuthInput } from '@/lib/auth'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validation = validateAuthInput(email, password)
  if (!validation.success) {
    return { error: validation.error }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  const authResult = handleAuthError(error)
  if (!authResult.success) {
    return { error: authResult.error }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data: existingUserId } = await supabase.rpc(
    'get_user_id_by_email',
    { email }
  )

  if (existingUserId) {
    return { error: 'An account with this email already exists. Please sign in instead.' }
  }

  const validation = validateAuthInput(email, password)
  if (!validation.success) {
    return { error: validation.error }
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  const authResult = handleAuthError(authError)
  if (!authResult.success) {
    return { error: authResult.error }
  }

  const userIdResult = handleAuthError(authError)
  if (!userIdResult.success) {
    return { error: userIdResult.error }
  }

  revalidatePath('/', 'layout')

  if (authData.user && !authData.user.email_confirmed_at) {
    return { emailConfirmation: true }
  }

  redirect('/dashboard')
}