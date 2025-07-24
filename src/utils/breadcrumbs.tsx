import { BreadcrumbItem } from "@/components/ui/Breadcrumb";

// Common icons
export const HomeIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const DashboardIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
  </svg>
);

export const JobsIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
  </svg>
);

// Breadcrumb configurations
export const getBreadcrumbs = {
  home: (): BreadcrumbItem[] => [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon
    }
  ],

  jobs: (): BreadcrumbItem[] => [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon
    },
    {
      label: "Jobs",
      isActive: true
    }
  ],

  jobDetail: (jobTitle: string): BreadcrumbItem[] => [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon
    },
    {
      label: "Jobs",
      href: "/jobs"
    },
    {
      label: jobTitle,
      isActive: true
    }
  ],

  dashboard: (): BreadcrumbItem[] => [
    {
      label: "Dashboard",
      isActive: true,
      icon: DashboardIcon
    }
  ],

  editJob: (): BreadcrumbItem[] => [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: DashboardIcon
    },
    {
      label: "Edit Job",
      isActive: true
    }
  ],

  postJob: (): BreadcrumbItem[] => [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: DashboardIcon
    },
    {
      label: "Post New Job",
      isActive: true
    }
  ]
};
