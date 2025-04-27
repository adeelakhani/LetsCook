"use server";
import RecipeSub from "@/components/ui/recipeSub";
import AuthNav from "@/components/ui/authNav";
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";

export default async function RecipeSubmissionPage() {
  const supabase = await createClientForServer();
  const { data, error } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (error || !data?.user) {
    redirect("/login");
  }
  if (!session) {
    redirect("/login");
  }
  const token = session.access_token;
  const this_user_id = data.user.id;
  return (
    <div>
      <AuthNav highlight="Create" />
      <RecipeSub user_id={this_user_id} token={token}/>
    </div>
  )
}