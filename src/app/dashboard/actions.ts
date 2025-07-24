'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createJob(formData: FormData) {
  const supabase = await createClient()

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  const jobData = {
    title: formData.get('title') as string,
    company: formData.get('company') as string,
    location: formData.get('location') as string,
    job_type: formData.get('jobType') as string,
    salary: formData.get('salary') as string,
    description: formData.get('description') as string,
    requirements: formData.get('requirements') as string,
    benefits: formData.get('benefits') as string,
    application_instructions: formData.get('applicationInstructions') as string,
    user_id: user.id,
    status: 'active'
  }

  // In a real app, you would save this to your database
  // For now, we'll just simulate success
  console.log('Creating job:', jobData)

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateJob(jobId: string, formData: FormData) {
  const supabase = await createClient()

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  const jobData = {
    title: formData.get('title') as string,
    company: formData.get('company') as string,
    location: formData.get('location') as string,
    job_type: formData.get('jobType') as string,
    salary: formData.get('salary') as string,
    description: formData.get('description') as string,
    requirements: formData.get('requirements') as string,
    benefits: formData.get('benefits') as string,
    application_instructions: formData.get('applicationInstructions') as string,
  }

  // In a real app, you would update this in your database
  // For now, we'll just simulate success
  console.log('Updating job:', jobId, jobData)

  revalidatePath('/dashboard')
  revalidatePath(`/jobs/${jobId}`)
  redirect('/dashboard')
}

export async function deleteJob(jobId: string) {
  const supabase = await createClient()

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  // In a real app, you would delete this from your database
  // For now, we'll just simulate success
  console.log('Deleting job:', jobId)

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function toggleJobStatus(jobId: string, status: 'active' | 'paused' | 'closed') {
  const supabase = await createClient()

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  // In a real app, you would update this in your database
  // For now, we'll just simulate success
  console.log('Toggling job status:', jobId, status)

  revalidatePath('/dashboard')
  revalidatePath(`/jobs/${jobId}`)
}
