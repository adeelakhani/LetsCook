"use server"

import { redirect } from "next/navigation";
import { createClientForServer } from '@/utils/supabase/supabaseClient';


export default async function signOutFromGoogle() {
    const supabase = await createClientForServer();
    await supabase.auth.signOut();
    return redirect('/');
  }
