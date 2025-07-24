import { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Home, LayoutDashboard, Briefcase } from "lucide-react";

// Common icons
export const HomeIcon = <Home className="w-full h-full" />;

export const DashboardIcon = <LayoutDashboard className="w-full h-full" />;

export const JobsIcon = <Briefcase className="w-full h-full" />;

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
      icon: JobsIcon,
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
      icon: DashboardIcon,
      isActive: true
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
