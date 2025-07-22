// Date utilities
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

// Job utilities
export function getJobTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'full-time':
      return 'badge-primary';
    case 'part-time':
      return 'badge-secondary';
    case 'contract':
      return 'badge-accent';
    case 'internship':
      return 'badge-info';
    case 'freelance':
      return 'badge-warning';
    default:
      return 'badge-neutral';
  }
}

export function getJobStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
      return 'badge-success';
    case 'paused':
      return 'badge-warning';
    case 'closed':
      return 'badge-error';
    case 'draft':
      return 'badge-ghost';
    default:
      return 'badge-neutral';
  }
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// URL utilities
export function createJobSlug(title: string, company: string): string {
  const combined = `${title}-at-${company}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

// Search utilities
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
}

// Local storage utilities
export function saveToLocalStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

// Array utilities
export function removeDuplicates<T>(array: T[], key?: keyof T): T[] {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}
