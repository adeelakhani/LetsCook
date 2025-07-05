"use server";

import SubmitSub from "@/components/ui/submitSub";
import AuthNav from "@/components/ui/authNav";
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function Submit({
  params,
}: {
  params: Promise<{ submit: string }>;
}) {
  const newParam = await params;
  const postId = newParam.submit;
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

  const posts = await axios.get(
    `http://localhost:3001/api/getPostInfo/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (posts.status !== 200) {
    throw new Error("Failed to submit recipe");
  }

  return (
    <div>
      <AuthNav highlight="Challenges" />
      <SubmitSub
        token={token}
        postInfo={posts.data}
        this_user_id={this_user_id}
      />
    </div>
  );
}
