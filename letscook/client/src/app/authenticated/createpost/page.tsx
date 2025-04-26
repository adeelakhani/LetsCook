"use server";
import RecipeSub from "@/components/ui/recipeSub";
import AuthNav from "@/components/ui/authNav";

export default async function RecipeSubmissionPage() {
  return (
    <div>
      <AuthNav highlight="Create" />
      <RecipeSub />
    </div>
  )
}