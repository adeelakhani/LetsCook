"use server";
import { createClientForServer } from '@/utils/supabase/supabaseClient'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClientForServer()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  // else{
  //   console.log(data.user);
  // }

  return (
    <div>
      {/* Top Horizontal Row */}
      <main>{children}</main>
    </div>
  );
}
