import { createClient } from '@/utils/supabase/client';
import { Company } from '@/types/database';

export async function getAllCompaniesClient(): Promise<Company[]> {
  const supabase = createClient();
  
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