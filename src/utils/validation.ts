// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateJobForm(data: {
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title.trim()) errors.push('Job title is required');
  if (!data.company.trim()) errors.push('Company name is required');
  if (!data.location.trim()) errors.push('Location is required');
  if (!data.jobType) errors.push('Job type is required');
  if (!data.description.trim()) errors.push('Job description is required');
  
  if (data.title.length > 100) errors.push('Job title must be less than 100 characters');
  if (data.company.length > 100) errors.push('Company name must be less than 100 characters');
  if (data.description.length < 50) errors.push('Job description must be at least 50 characters');

  return {
    isValid: errors.length === 0,
    errors
  };
}