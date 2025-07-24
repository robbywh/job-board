import Link from "next/link";
import { User } from "@supabase/supabase-js";
import UserDropdown from "./UserDropdown";

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
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-all duration-500 transform hover:scale-105">
            Job Board
          </div>
        </div>
      </div>

      <div className="navbar-end">
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-primary btn-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary border-none">
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
