'use client'

import { User } from "@supabase/supabase-js";
import { Briefcase, LayoutDashboard } from 'lucide-react';
import DropdownNavLink from "./DropdownNavLink";
import LogoutButton from "./LogoutButton";

interface UserDropdownProps {
  user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const closeDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button"
        className="btn btn-ghost btn-circle hover:bg-primary/10 transition-all duration-300"
      >
        <div className="avatar placeholder">
          <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-10 h-10 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center">
            <div className="text-sm font-bold w-10 h-10 flex items-center justify-center">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-300 animate-in slide-in-from-top-2 duration-300">
        <li className="menu-title mb-2">
          <span className="text-primary font-semibold">{user?.email}</span>
        </li>
        <li>
          <DropdownNavLink 
            href="/dashboard"
            colorScheme="primary"
            onClose={closeDropdown}
            icon={
              <LayoutDashboard className="w-4 h-4" />
            }
          >
            Dashboard
          </DropdownNavLink>
        </li>
        <li>
          <DropdownNavLink 
            href="/jobs"
            colorScheme="secondary"
            onClose={closeDropdown}
            icon={
              <Briefcase className="w-4 h-4" />
            }
          >
            Browse Jobs
          </DropdownNavLink>
        </li>
        <div className="divider my-1"></div>
        <li>
          <LogoutButton onClose={closeDropdown} />
        </li>
      </ul>
    </div>
  );
}
