'use client'

import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface NavbarProps {
  user?: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className={`navbar transition-all duration-300 sticky top-0 z-50 bg-base-100/90 backdrop-blur-sm shadow-sm px-5`}>
      <div className="navbar-start">
        <div className="flex items-center group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-3 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl">
            <svg className="w-5 h-5 text-primary-content transform transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"></path>
            </svg>
          </div>
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-all duration-500 transform hover:scale-105">
            Job Board
          </Link>
        </div>
      </div>
      
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          <li>
            <Link 
              href="/jobs" 
              className="relative transition-all duration-300 hover:text-primary"
            >
              Browse Jobs
            </Link>
          </li>
          {user && (
            <li>
              <Link 
                href="/dashboard" 
                className="relative transition-all duration-300 hover:text-primary"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
      
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar group hover:bg-primary/10 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <span className="text-white text-sm font-bold">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-300 animate-in slide-in-from-top-2 duration-300">
              <li className="menu-title mb-2">
                <span className="text-primary font-semibold">{user?.email}</span>
              </li>
              <li>
                <Link href="/dashboard" className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/post-job" className="flex items-center gap-2 hover:bg-secondary/10 hover:text-secondary transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Post Job
                </Link>
              </li>
              <li>
                <a className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Profile
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2 hover:bg-info/10 hover:text-info transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Settings
                </a>
              </li>
              <div className="divider my-1"></div>
              <li>
                <a className="flex items-center gap-2 hover:bg-error/10 hover:text-error transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-primary btn-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary border-none">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
