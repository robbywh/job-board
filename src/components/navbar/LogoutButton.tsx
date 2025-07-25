'use client'

import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';
import { createClient } from "@/utils/supabase/client";

interface LogoutButtonProps {
  onClose?: () => void;
}

export default function LogoutButton({ onClose }: LogoutButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    onClose?.();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-ghost btn-sm justify-start text-error hover:bg-error/10 hover:text-error w-full"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
