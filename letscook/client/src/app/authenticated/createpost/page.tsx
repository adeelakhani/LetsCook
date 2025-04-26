"use server";
import RecipeSub from "@/components/ui/recipeSub";

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
    <RecipeSub />
  )
}