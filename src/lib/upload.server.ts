import { createClient } from '@/utils/supabase/server';
import { validateLogoFile, UploadResult } from './upload';

export async function uploadCompanyLogoServer(file: File): Promise<UploadResult> {
  try {
    const validation = validateLogoFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const supabase = await createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `company-logos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('company-logo')
      .upload(filePath, file);

    if (uploadError) {
      return { success: false, error: 'Failed to upload logo' };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('company-logo')
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'An unexpected error occurred during upload' };
  }
}