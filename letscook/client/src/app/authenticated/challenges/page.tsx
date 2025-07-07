"use server"
import React from "react"
import ChallengeTable from "@/components/ui/challengeTable" 
import AuthNav from "@/components/ui/authNav";

import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import axios from 'axios';

export default async function Challenges() {
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
      
      const posts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllRecipes`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          if(posts.status !== 200) {
            console.log("Error fetching posts");
            redirect("/login");
        }
        posts.data = [...posts.data].sort(() => Math.random() - 0.5);

    return (
        <div>
            <AuthNav highlight="Challenges" />
            <div className="py-5 bg-gradient-to-b from-orange-50 via-white to-orange-50 flex-col justify-center content-center items-center mx-auto text-black">            
                <ChallengeTable postsInfo={posts.data} description="Click on any challenge to view details"/>
                <div className="text-center mt-3 opacity-75">
                    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        <span className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
                        Challenges update daily
                    </span>
                </div>
            </div>
        </div>
    )
}