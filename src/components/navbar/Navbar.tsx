import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Briefcase, LogOut } from 'lucide-react';
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
            <Briefcase className="w-5 h-5 text-primary-content transform transition-transform duration-300 group-hover:scale-110" />
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
              <LogOut className="w-4 h-4 mr-1" />
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
