'use client'

import { User } from "@supabase/supabase-js";
import DropdownNavLink from "./DropdownNavLink";
import LogoutButton from "./LogoutButton";

interface UserDropdownProps {
  user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const closeDropdown = () => {
    // Remove focus from the dropdown to close it
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
              </svg>
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"></path>
              </svg>
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
