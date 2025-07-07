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
        // redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback`, 
        redirectTo: `${process.env.SITE_URL}/login/callback`,
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