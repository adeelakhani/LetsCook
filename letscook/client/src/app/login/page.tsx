"use server";
import React from "react";
import signInWithGoogle from '@/utils/supabase/sign_in_function';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = await createClientForServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/authenticated/explore');
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-orange-200">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/LetsCook.png"
            width={50}
            height={50}
            alt="LetsCook"
          />
          <h1 className="text-3xl ml-3 font-bold">LetsCook</h1>
        </div>
        
        <div className="text-center mb-8">
          <Badge className="bg-orange-700 mb-4 text-md">Welcome Chef!</Badge>
          <h2 className="text-2xl font-bold mb-2">Sign in to start cooking</h2>
          <p className="text-gray-600">Join our community of cooking enthusiasts</p>
        </div>
        
        <Button 
          onClick={signInWithGoogle} 
          className="w-full py-6 font-bold bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-3"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24"
            className="fill-white"
          >
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}