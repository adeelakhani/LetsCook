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
  const submission = await axios.get(
    `http://localhost:3001/api/getSubmissionInfo/${submissionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (submission.status !== 200) {
    throw new Error("Failed to submit recipe");
  }
  const posts = await axios.get(
    `http://localhost:3001/api/getPostInfo/${submission.data.newObj.post_id}`,
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
  // console.log(submission.data)
  // console.log(submission.data.newObj.post_id);
  return (
    <div>
      <AuthNav highlight="Submissions" />
      <UserSubmitSub this_user_id={this_user_id} token={token} postData={posts.data} submissionData={submission.data}/>
    </div>
  );
}
