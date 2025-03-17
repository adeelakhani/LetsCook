"use server";
import { createClient } from '@supabase/supabase-js'

import RecipeSub from "@/components/ui/recipeSub";

export default async function RecipeSubmissionPage() {
  return (
    <RecipeSub />
  )
}