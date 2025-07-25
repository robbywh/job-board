import { createClient } from '@/utils/supabase/server';
import { Company } from '@/types/database';

export async function getAllCompanies(): Promise<Company[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
  
  return data || [];
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching company:', error);
    return null;
  }
  
  return data;
}

export async function getCompanyByName(name: string): Promise<Company | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('name', name)
    .single();
  
  if (error) {
    // Don't log error if company doesn't exist
    if (error.code !== 'PGRST116') {
      console.error('Error fetching company by name:', error);
    }
    return null;
  }
  
  return data;
}

export async function companyNameExists(name: string): Promise<boolean> {
  const company = await getCompanyByName(name);
  return company !== null;
}

export async function createCompany(company: { name: string; logo_url?: string | null }): Promise<Company | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('companies')
    .insert({
      name: company.name,
      logo_url: company.logo_url || null
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating company:', error);
    return null;
  }
  
  return data;
}

export async function updateCompanyLogo(id: string, logoUrl: string): Promise<boolean> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('companies')
    .update({
      logo_url: logoUrl
    })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating company logo:', error);
    return false;
  }
  
  return true;
}