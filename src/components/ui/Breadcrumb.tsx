import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-base-100 border-b border-base-200">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="breadcrumbs text-xs sm:text-sm">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="flex items-center gap-1 sm:gap-2 hover:text-primary transition-colors"
                  >
                    {item.icon && (
                      <div className="w-3 h-3 sm:w-4 sm:h-4">
                        {item.icon}
                      </div>
                    )}
                    <span className={item.isActive ? "text-primary font-medium" : ""}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span className={`flex items-center gap-1 sm:gap-2 ${item.isActive ? "text-primary font-medium" : ""}`}>
                    {item.icon && (
                      <div className="w-3 h-3 sm:w-4 sm:h-4">
                        {item.icon}
                      </div>
                    )}
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
