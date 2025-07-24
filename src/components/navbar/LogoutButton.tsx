'use client'

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface LogoutButtonProps {
  onClose?: () => void;
}

export default function LogoutButton({ onClose }: LogoutButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    onClose?.(); // Close dropdown first
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 hover:bg-error/10 hover:text-error transition-colors duration-200 w-full text-left"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
      </svg>
      Logout
    </button>
  );
}
