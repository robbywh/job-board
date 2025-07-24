import { createClient } from '@/utils/supabase/server';
import { Job, Company } from '@/types/database';

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedAt: string;
  companyLogo?: string | null;
}

export interface JobListItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedAt: string;
  companyId: string;
  companyLogo?: string | null;
}

export interface JobsResult {
  jobs: JobListItem[];
  totalCount: number;
  totalPages: number;
}

export type JobWithCompany = Job & {
  companies: Company;
};

const JOBS_PER_PAGE = 10;

export async function getJobById(id: string): Promise<JobData | null> {
  const supabase = await createClient();
  
  const { data: job, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        id,
        name,
        logo_url
      )
    `)
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }

  return {
    id: job.id,
    title: job.title,
    company: job.companies?.name || 'Unknown Company',
    location: job.location,
    type: job.type,
    description: job.description,
    postedAt: job.created_at,
    companyLogo: job.companies?.logo_url || null,
  };
}

export async function getJobsWithPagination(page: number = 1): Promise<JobsResult> {
  const supabase = await createClient();
  
  const from = (page - 1) * JOBS_PER_PAGE;
  const to = from + JOBS_PER_PAGE - 1;
  
  const { data: jobs, error, count } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        id,
        name,
        logo_url
      )
    `, { count: 'exact' })
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching jobs:', error);
    return { jobs: [], totalCount: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil((count || 0) / JOBS_PER_PAGE);
  
  const transformedJobs = jobs?.map(job => ({
    id: job.id,
    title: job.title,
    company: job.companies?.name || 'Unknown Company',
    location: job.location,
    type: job.type,
    description: job.description,
    postedAt: job.created_at,
    companyId: job.company_id,
    companyLogo: job.companies?.logo_url || null,
  })) || [];

  return {
    jobs: transformedJobs,
    totalCount: count || 0,
    totalPages,
  };
}

export async function getJobByIdWithAuth(id: string, userId: string): Promise<JobWithCompany | null> {
  const supabase = await createClient();
  
  const { data: job, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        id,
        name,
        logo_url
      )
    `)
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }

  return job as JobWithCompany;
}

export async function getUserJobs(userId: string): Promise<JobWithCompany[]> {
  const supabase = await createClient();
  
  const { data: userJobs, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        id,
        name,
        logo_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user jobs:', error);
    return [];
  }

  return (userJobs || []) as JobWithCompany[];
}
