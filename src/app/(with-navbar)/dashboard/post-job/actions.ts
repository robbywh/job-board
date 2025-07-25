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
      
      const { data: existingCompany, error: companyError } = await supabase
        .from('companies')
        .select('id')
        .eq('id', selectedCompanyId)
        .single()

      if (companyError || !existingCompany) {
        return {
          success: false,
          error: 'Selected company not found.',
          errors: {}
        }
      }
      company = existingCompany
    }

    // Create the job posting
    const { error: jobError } = await supabase
      .from('jobs')
      .insert({
        title,
        description,
        company_id: company.id,
        location,
        type: jobType,
        posted_by: user.id,
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
    revalidatePath('/jobs')
    
    return {
      success: true,
      error: null,
      errors: {}
    }

  } catch (error) {
    console.error('Unexpected error creating job:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
      errors: {}
    }
  }
}