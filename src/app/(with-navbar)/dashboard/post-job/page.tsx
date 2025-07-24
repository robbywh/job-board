import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PostJobForm from "./PostJobForm";

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
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li>Post Job</li>
          </ul>
        </div>

        <PostJobForm />
      </div>
    </div>
  );
} 
                