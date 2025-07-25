import { createClient } from '@/utils/supabase/server'
import { User } from '@/types/database'

/**
 * Get user profile from the users table
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

/**
 * Get current authenticated user with profile
 */
export async function getCurrentUserWithProfile() {
  const supabase = await createClient()
  
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !authUser) {
    return { authUser: null, profile: null, error: authError }
  }

  const profile = await getUserProfile(authUser.id)
  
  return { authUser, profile, error: null }
}
