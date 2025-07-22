'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  user?: {
    email: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
              <svg className="w-4 h-4 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"></path>
              </svg>
            </div>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Job Board
            </Link>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 hidden md:flex">
            <li>
              <Link 
                href="/jobs" 
                className={pathname === '/jobs' ? 'active' : ''}
              >
                Browse Jobs
              </Link>
            </li>
            {user && (
              <li>
                <Link 
                  href="/dashboard" 
                  className={pathname?.startsWith('/dashboard') ? 'active' : ''}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          
          {/* User Menu */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-content text-sm font-bold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="menu-title">
                    <span>{user.email}</span>
                  </li>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                  <li><Link href="/dashboard/post-job">Post Job</Link></li>
                  <li><a>Profile</a></li>
                  <li><a>Settings</a></li>
                  <div className="divider my-1"></div>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary btn-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
