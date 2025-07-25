import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PostJobFormServer from "./PostJobFormServer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata = {
  title: "Post a Job | Job Board",
  description: "Post your job opening and connect with qualified candidates.",
};

export default async function PostJobPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/');
  }

  return (
    <>
      <Breadcrumb items={getBreadcrumbs.postJob()} />

      <PostJobFormServer />
    </>
  );
} 
                