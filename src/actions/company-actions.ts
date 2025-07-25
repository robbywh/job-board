'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getAllCompanies } from '@/lib/companies'
import { uploadCompanyLogoServer } from '@/lib/upload'

export async function getCompanies() {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      redirect('/')
    }

    const companies = await getAllCompanies()
    return companies.map(company => ({
      id: company.id,
      name: company.name,
      logo_url: company.logo_url
    }))

  } catch (error) {
    console.error('Unexpected error fetching companies:', error)
    return []
  }
}

export async function uploadCompanyLogo(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: 'Authentication required' }
    }

    const file = formData.get('logo') as File
    
    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    const uploadResult = await uploadCompanyLogoServer(file)
    return uploadResult

  } catch (error) {
    console.error('Unexpected error uploading logo:', error)
    return { success: false, error: 'An unexpected error occurred while uploading' }
  }
}