import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/navbar/Navbar";

export default async function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
