import { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Home, Briefcase } from "lucide-react";

export const HomeIcon = <Home className="w-full h-full" />;
export const JobsIcon = <Briefcase className="w-full h-full" />;

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
      label: "Home",
      icon: HomeIcon,
      isActive: true
    }
  ],

  editJob: (): BreadcrumbItem[] => [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon
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
      icon: HomeIcon
    },
    {
      label: "Post New Job",
      isActive: true
    }
  ],
};
