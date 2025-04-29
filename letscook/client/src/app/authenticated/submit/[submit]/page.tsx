"use server"

import SubmitSub from "@/components/ui/submitSub"
import AuthNav from "@/components/ui/authNav"
// import { createClientForServer } from "@/utils/supabase/supabaseClient";
// import axios from 'axios';

export default async function Submit({ params }: { params: { submit: string } }) {
    const newParam = await params;
    const postId = newParam.submit;
    console.log(postId);
    //need to set up endpoint to get the post info by postId and then also fetch the images by postId. returns an object with 2 objects: Post info and images
    //we then pass this info into the front end(SubmitSub) to display the post info and images
    // 1. set up endpoint to get the shit u need
    // 2. pass the info
    // 3. update frontend
    // 2 hours~ of time needed for this
    
    return (
        <div>
            <AuthNav highlight="Challenges" />
            <SubmitSub/>
        </div>
    )
}