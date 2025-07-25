'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function getCompanies() {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      redirect('/')
    }

    const { data: companies, error } = await supabase
      .from('companies')
      .select('id, name, logo_url')
      .order('name')

    if (error) {
      console.error('Error fetching companies:', error)
      return []
    }

    return companies || []

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

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Only JPEG, PNG, and WebP images are allowed' }
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return { success: false, error: 'File size must be less than 5MB' }
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('company-logos')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return { success: false, error: 'Failed to upload logo' }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('company-logos')
      .getPublicUrl(fileName)

    return { success: true, url: publicUrl }

  } catch (error) {
    console.error('Unexpected error uploading logo:', error)
    return { success: false, error: 'An unexpected error occurred while uploading' }
  }
}