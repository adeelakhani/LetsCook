"use server";
import React from "react";
import { createClientForServer } from '@/utils/supabase/supabaseClient'
import { redirect } from 'next/navigation'

import "@/styles/globals.css";
import DynamicTable from "@/components/ui/dynamicTable";
import ProfileChart from "@/components/ui/profileChart";
import ProfileCard from "@/components/ui/profileCard";

const submissions = [
  { author: "Haris Khawja", recipe: "Hakka Chow Mein", difficulty: "Medium" },
  { author: "Sir Williams", recipe: "Clam Chowder", difficulty: "Hard" },
  { author: "ishowspeed", recipe: "Chicken Nuggets", difficulty: "Easy" },
];

const chartData = [
  { month: "January", meals: 0, recipes: 80 },
  { month: "February", meals: 305, recipes: 200 },
  { month: "March", meals: 237, recipes: 120 },
  { month: "April", meals: 73, recipes: 190 },
  { month: "May", meals: 209, recipes: 130 },
  { month: "June", meals: 214, recipes: 140 },
];

export default async function Profile() {
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const user = {
    username: data.user.user_metadata.full_name,
    email: data.user.user_metadata.email,
    points: 42,
    meals_cooked: 15,
    created_recipes: 2,
    rank: 245,
    profile_pic: data.user.user_metadata.avatar_url,
  };

  return (
    <div className="min-w-screen min-h-screen">
      {/* Profile Card */}
      <div className="lg:flex lg:gap-10 flex-col-1 justify-center mx-auto content-center items-center bg-white">
        <ProfileCard user={user} />

        {/* Submissions Chart */}
        <ProfileChart elements={chartData} />
      </div>

      {/* Past Submissions */}
      <div className="py-5 bg-gray-100 flex-col justify-center content-center items-center mx-auto text-black">
        <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">
          Past Submissions
        </h1>
        <DynamicTable elements={submissions} />
      </div>
    </div>
  );
}
