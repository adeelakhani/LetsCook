"use server"

import SubmitSub from "@/components/ui/submitSub"
import AuthNav from "@/components/ui/authNav"
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import axios from 'axios';


export default async function Submit({ params }: { params: { submit: string } }) {
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

      const posts = await axios.get(`http://localhost:3001/api/getPostInfo/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
    console.log(posts.data);
    //need to set up endpoint to get the post info by postId and then also fetch the images by postId. returns an object with 2 objects: Post info and images
    //we then pass this info into the front end(SubmitSub) to display the post info and images
    // 1. set up endpoint to get the shit u need
    // 2. pass the info
    // 3. update frontend
    // 2 hours~ of time needed for this
    
    return (
        <div>
            <AuthNav highlight="Challenges" />
            <SubmitSub postInfo={posts.data} this_user_id={this_user_id}/>
        </div>
    )
}