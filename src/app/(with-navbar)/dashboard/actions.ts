'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface FormState {
  success: boolean;
  error: string | null;
  errors: Record<string, string[]>;
}

export async function createJob(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      redirect('/')
    }

    // Extract form data
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const jobType = formData.get('jobType') as string
    const companyName = formData.get('companyName') as string
    const isNewCompany = formData.get('isNewCompany') === 'true'
    const selectedCompanyId = formData.get('selectedCompanyId') as string
    const logoUrl = formData.get('logoUrl') as string


    // Validation
    const errors: Record<string, string[]> = {}
    
    if (!title?.trim()) errors.title = ['Job title is required']
    if (!description?.trim()) errors.description = ['Job description is required']
    if (description && description.length < 50) errors.description = ['Job description must be at least 50 characters']
    if (!location?.trim()) errors.location = ['Location is required']
    if (!jobType) errors.jobType = ['Job type is required']
    if (!companyName?.trim()) errors.company = ['Company is required']

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        error: null,
        errors
      }
    }

    let company: { id: string } | null = null

    if (isNewCompany) {
      // Check if company name already exists (enforce uniqueness)
      const { data: existingCompany } = await supabase
        .from('companies')
        .select('id')
        .eq('name', companyName)
        .single()

      if (existingCompany) {
        return {
          success: false,
          error: 'A company with this name already exists. Please choose a different name or select the existing company.',
          errors: {}
        }
      }

      // Use the pre-uploaded logo URL from client
      const finalLogoUrl = logoUrl || null

      // Create new company
      const { data: newCompany, error: createCompanyError } = await supabase
        .from('companies')
        .insert({ 
          name: companyName,
          logo_url: finalLogoUrl
        })
        .select('id')
        .single()

      if (createCompanyError) {
        console.error('Company creation error:', createCompanyError)
        return {
          success: false,
          error: `Failed to create company: ${createCompanyError.message}`,
          errors: {}
        }
      }
      company = newCompany
    } else {
      // Use existing company
      if (!selectedCompanyId) {
        return {
          success: false,
          error: 'Please select a company.',
          errors: {}
        }
      }
      
      // Update existing company logo if new logo was uploaded
      if (logoUrl) {
        const { error: updateError } = await supabase
          .from('companies')
          .update({ logo_url: logoUrl })
          .eq('id', selectedCompanyId)

        if (updateError) {
          console.error('Company logo update error:', updateError)
          return {
            success: false,
            error: `Failed to update company logo: ${updateError.message}`,
            errors: {}
          }
        }
      }
      
      company = { id: selectedCompanyId }
    }

    // Create the job
    const { error: jobError } = await supabase
      .from('jobs')
      .insert({
        title,
        description,
        location,
        type: jobType as 'Full-Time' | 'Part-Time' | 'Contract',
        user_id: user.id,
        company_id: company.id
      })

    if (jobError) {
      console.error('Job creation error:', jobError)
      return {
        success: false,
        error: `Failed to create job: ${jobError.message}`,
        errors: {}
      }
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')

  } catch (error) {
    // Don't catch redirect errors
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      throw error
    }
    
    console.error('Unexpected error in createJob:', error)
    return {
      success: false,
      error: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
      errors: {}
    }
  }
}

export async function updateJob(jobId: string, formData: FormData) {
  const supabase = await createClient()

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  // Ensure user exists in users table
  const { data: existingUser, error: userCheckError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (userCheckError && userCheckError.code === 'PGRST116') {
    // User doesn't exist, create user record
    const { error: createUserError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email || ''
      })

    if (createUserError) {
      throw new Error(`Failed to create user record: ${createUserError.message}`)
    }
  } else if (userCheckError) {
    throw new Error(`User verification failed: ${userCheckError.message}`)
  }

  const companyName = formData.get('company') as string
  const isNewCompany = formData.get('isNewCompany') === 'true'
  const existingCompanyId = formData.get('companyId') as string
  const logoUrl = formData.get('logoUrl') as string
  
  let company: { id: string } | null = null

  if (isNewCompany) {
    // Check if company name already exists (enforce uniqueness)
    const { data: existingCompany } = await supabase
      .from('companies')
      .select('id')
      .eq('name', companyName)
      .single()

    if (existingCompany) {
      throw new Error('A company with this name already exists. Please choose a different name or select the existing company.')
    }

    // Use the pre-uploaded logo URL from client
    const finalLogoUrl = logoUrl || null

    // Create new company
    const { data: newCompany, error: createCompanyError } = await supabase
      .from('companies')
      .insert({ 
        name: companyName,
        logo_url: finalLogoUrl
      })
      .select('id')
      .single()

    if (createCompanyError) {
      throw new Error('Failed to create company')
    }
    company = newCompany
  } else {
    // Use existing company
    if (!existingCompanyId) {
      throw new Error('No company selected')
    }
    
    // Update existing company logo if new logo was uploaded
    if (logoUrl) {
      const { error: updateError } = await supabase
        .from('companies')
        .update({ logo_url: logoUrl })
        .eq('id', existingCompanyId)

      if (updateError) {
        throw new Error('Failed to update company logo')
      }
    }
    
    company = { id: existingCompanyId }
  }

  // Update the job
  const { error: jobError } = await supabase
    .from('jobs')
    .update({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
      type: formData.get('jobType') as 'Full-Time' | 'Part-Time' | 'Contract',
      company_id: company.id
    })
    .eq('id', jobId)
    .eq('user_id', user.id) // Ensure user can only update their own jobs

  if (jobError) {
    throw new Error('Failed to update job')
  }

  revalidatePath('/dashboard')
  revalidatePath(`/jobs/${jobId}`)
  redirect('/dashboard')
}

export async function deleteJob(jobId: string) {
  const supabase = await createClient()

  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      redirect('/')
    }

    // Ensure user exists in users table
    const { error: userCheckError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (userCheckError && userCheckError.code === 'PGRST116') {
      // User doesn't exist, create user record
      const { error: createUserError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email || ''
        })

      if (createUserError) {
        throw new Error(`Failed to create user record: ${createUserError.message}`)
      }
    } else if (userCheckError) {
      throw new Error(`User verification failed: ${userCheckError.message}`)
    }

    // Delete the job
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)
      .eq('user_id', user.id) // Ensure user can only delete their own jobs

    if (error) {
      console.error('Job deletion error:', error)
      throw new Error(`Failed to delete job: ${error.message}`)
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')

  } catch (error) {
    // Don't catch redirect errors
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      throw error
    }
    
    console.error('Unexpected error in deleteJob:', error)
    throw new Error(`Failed to delete job: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Note: toggleJobStatus function removed as 'status' field doesn't exist in the database schema
// If you need job status functionality, you would need to add a status column to the jobs table
