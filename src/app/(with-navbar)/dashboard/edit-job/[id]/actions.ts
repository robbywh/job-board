'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface FormState {
  success: boolean;
  error: string | null;
  errors: Record<string, string[]>;
}

export async function updateJob(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      redirect('/')
    }

    const jobId = formData.get('jobId') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const jobType = formData.get('jobType') as string
    const companyId = formData.get('companyId') as string
    const logoUrl = formData.get('logoUrl') as string

    // Validation
    const errors: Record<string, string[]> = {}
    
    if (!title?.trim()) errors.title = ['Job title is required']
    if (!description?.trim()) errors.description = ['Job description is required']
    if (description && description.length < 50) errors.description = ['Job description must be at least 50 characters']
    if (!location?.trim()) errors.location = ['Location is required']
    if (!jobType) errors.jobType = ['Job type is required']

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        error: null,
        errors
      }
    }

    // Verify job ownership
    const { data: job, error: fetchError } = await supabase
      .from('jobs')
      .select('user_id')
      .eq('id', jobId)
      .single()

    if (fetchError || !job) {
      return {
        success: false,
        error: 'Job not found.',
        errors: {}
      }
    }

    if (job.user_id !== user.id) {
      return {
        success: false,
        error: 'You can only edit your own job postings.',
        errors: {}
      }
    }

    // Update the job
    const { error: updateError } = await supabase
      .from('jobs')
      .update({
        title,
        description,
        location,
        type: jobType,
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)

    if (updateError) {
      console.error('Job update error:', updateError)
      return {
        success: false,
        error: `Failed to update job: ${updateError.message}`,
        errors: {}
      }
    }

    // Update company logo if provided
    if (logoUrl && companyId) {
      const { error: companyUpdateError } = await supabase
        .from('companies')
        .update({
          logo_url: logoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', companyId)

      if (companyUpdateError) {
        console.error('Company logo update error:', companyUpdateError)
        // Don't fail the entire operation if just the logo update fails
      }
    }

    revalidatePath('/dashboard')
    revalidatePath('/jobs')
    revalidatePath(`/jobs/${jobId}`)
    
    return {
      success: true,
      error: null,
      errors: {}
    }

  } catch (error) {
    console.error('Unexpected error updating job:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
      errors: {}
    }
  }
}