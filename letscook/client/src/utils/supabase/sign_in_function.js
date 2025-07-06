"use server"

import { redirect } from "next/navigation";
import { createClientForServer } from '@/utils/supabase/supabaseClient';
export default async function signInWithGoogle() {

    const supabase = await createClientForServer();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // redirectTo: `http://localhost:3001/api/auth/callback`, 
        redirectTo: `https://letscook-silk.vercel.app//login/callback`,
        skipBrowserRedirect: false,
      },
    });
    // console.log(data);
    if (error) {
        console.error("Google Sign-In Error:", error.message);
    }
    else{
        return redirect(data.url);
    }
  }