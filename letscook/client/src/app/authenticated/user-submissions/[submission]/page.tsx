"use server";

import AuthNav from "@/components/ui/authNav";
import UserSubmitSub from "@/components/ui/userSubmitSub";
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function Submit({
  params,
}: {
  params: { submission: string };
}) {
  const newParam = await params;
  const submissionId = newParam.submission;
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
      <AuthNav highlight="Submissions" />
      <UserSubmitSub />
    </div>
  );
}
