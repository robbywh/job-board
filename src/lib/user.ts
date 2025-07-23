import { createClient } from '@/utils/supabase/server'
import { User, UserInsert } from '@/types/database'

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
 * Create or update user profile in the users table
 */
export async function upsertUserProfile(userData: UserInsert): Promise<User | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('users')
    .upsert(userData, {
      onConflict: 'id'
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating/updating user profile:', error)
    return null
  }

  return data
}

/**
 * Check if user profile exists
 */
export async function userProfileExists(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile !== null
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
