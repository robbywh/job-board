import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PostJobFormServer from "./PostJobFormServer";

export const metadata = {
  title: "Post a Job | Job Board",
  description: "Post your job opening and connect with qualified candidates.",
};

export default async function PostJobPage() {
  // Server-side authentication check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/');
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-base-100 border-b border-base-200">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="breadcrumbs text-xs sm:text-sm">
            <ul>
              <li>
                <Link href="/dashboard" className="flex items-center gap-1 sm:gap-2 hover:text-primary transition-colors">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
                  </svg>
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Link>
              </li>
              <li className="text-primary font-medium">Post New Job</li>
            </ul>
          </div>
        </div>
      </div>

      <PostJobFormServer />
    </>
  );
} 
                