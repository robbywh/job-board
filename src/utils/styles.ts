// Style and UI utility functions
export function getJobTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'full-time':
      return 'badge-primary';
    case 'part-time':
      return 'badge-secondary';
    case 'contract':
      return 'badge-accent';
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