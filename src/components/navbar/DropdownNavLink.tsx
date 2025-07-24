'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownNavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  colorScheme?: 'primary' | 'secondary';
  onClose?: () => void;
}

export default function DropdownNavLink({ 
  href, 
  children, 
  icon, 
  colorScheme = 'primary',
  onClose 
}: DropdownNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeClasses = colorScheme === 'primary' 
    ? 'bg-primary/10 text-primary' 
    : 'bg-secondary/10 text-secondary';
    
  const hoverClasses = colorScheme === 'primary' 
    ? 'hover:bg-primary/10 hover:text-primary' 
    : 'hover:bg-secondary/10 hover:text-secondary';

  return (
    <Link 
      href={href} 
      onClick={onClose}
      className={`flex items-center gap-2 transition-colors duration-200 ${hoverClasses} ${
        isActive ? activeClasses : ''
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
