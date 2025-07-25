'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function deleteJob(jobId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: 'Authentication required' }
    }

    // Verify job ownership
    const { data: job, error: fetchError } = await supabase
      .from('jobs')
      .select('user_id')
      .eq('id', jobId)
      .single()

    if (fetchError || !job) {
      return { success: false, error: 'Job not found.' }
    }

    if (job.user_id !== user.id) {
      return { success: false, error: 'You can only delete your own job postings.' }
    }

    // Delete the job
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)

    if (deleteError) {
      console.error('Job deletion error:', deleteError)
      return { success: false, error: `Failed to delete job: ${deleteError.message}` }
    }

    revalidatePath('/dashboard')
    revalidatePath('/jobs')
    revalidatePath(`/dashboard/edit-job/${jobId}`)
    
    return { success: true }

  } catch (error) {
    console.error('Unexpected error deleting job:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

export async function toggleJobStatus(jobId: string, newStatus: 'active' | 'inactive'): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: 'Authentication required' }
    }

    // Verify job ownership
    const { data: job, error: fetchError } = await supabase
      .from('jobs')
      .select('user_id')
      .eq('id', jobId)
      .single()

    if (fetchError || !job) {
      return { success: false, error: 'Job not found.' }
    }

    if (job.user_id !== user.id) {
      return { success: false, error: 'You can only modify your own job postings.' }
    }

    // Update job status
    const { error: updateError } = await supabase
      .from('jobs')
      .update({ 
        status: newStatus
      })
      .eq('id', jobId)

    if (updateError) {
      console.error('Job status update error:', updateError)
      return { success: false, error: `Failed to update job status: ${updateError.message}` }
    }

    revalidatePath('/dashboard')
    revalidatePath('/jobs')
    revalidatePath(`/jobs/${jobId}`)
    
    return { success: true }

  } catch (error) {
    console.error('Unexpected error updating job status:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}