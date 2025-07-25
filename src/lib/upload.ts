import { createClient } from '@/utils/supabase/client';
import { createClient as createServerClient } from '@/utils/supabase/server';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface UploadProgress {
  isUploading: boolean;
  preview?: string;
}

/**
 * Validates file for logo upload
 */
export function validateLogoFile(file: File): { valid: boolean; error?: string } {
  if (file.size > 2 * 1024 * 1024) {
    return { valid: false, error: 'Logo file must be less than 2MB' };
  }
  
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Logo must be a PNG, JPG, WebP, or SVG file' };
  }

  return { valid: true };
}

/**
 * Generates file preview as data URL
 */
export function generateFilePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      resolve(preview);
    };
    reader.onerror = () => reject(new Error('Failed to generate preview'));
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a company logo to Supabase storage
 */
export async function uploadCompanyLogo(file: File): Promise<UploadResult> {
  try {
    const validation = validateLogoFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const supabase = createClient();
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

/**
 * Uploads a company logo to Supabase storage (server-side)
 */
export async function uploadCompanyLogoServer(file: File): Promise<UploadResult> {
  try {
    const validation = validateLogoFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const supabase = await createServerClient();
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

/**
 * Complete logo upload process with validation, preview generation, and upload
 */
export async function processLogoUpload(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<{ preview: string; uploadResult: UploadResult }> {
  try {
    // Validate file
    const validation = validateLogoFile(file);
    if (!validation.valid) {
      return {
        preview: '',
        uploadResult: { success: false, error: validation.error }
      };
    }

    // Generate preview
    onProgress?.({ isUploading: true });
    const preview = await generateFilePreview(file);
    onProgress?.({ isUploading: true, preview });

    // Upload file
    const uploadResult = await uploadCompanyLogo(file);
    onProgress?.({ isUploading: false, preview });

    return { preview, uploadResult };
  } catch (error) {
    onProgress?.({ isUploading: false });
    return {
      preview: '',
      uploadResult: { success: false, error: 'Failed to process logo upload' }
    };
  }
}