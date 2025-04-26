"use server";
import React from "react";
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import ChallengeTable from "@/components/ui/challengeTable";
import ProfileChart from "@/components/ui/profileChart";
import ProfileCard from "@/components/ui/profileCard";
import axios from 'axios';

import AuthNav from "@/components/ui/authNav";

const submissions = [
  { author: "Haris Khawja", recipe: "Hakka Chow Mein", difficulty: "Medium" },
  { author: "Sir Williams", recipe: "Clam Chowder", difficulty: "Hard" },
  { author: "ishowspeed", recipe: "Chicken Nuggets", difficulty: "Easy" },
];

const recipes = [
  { author: "harisk", recipe: "Chicken Biryani", difficulty: "Hard" },
  { author: "harisk", recipe: "Mashed Potatoes", difficulty: "Easy" },
  { author: "harisk", recipe: "Methi Aloo", difficulty: "Medium" },
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
  const userStats = await axios.get(`http://localhost:3001/api/getStats/${this_user_id}`);
  const userData = await axios.get(`http://localhost:3001/api/userPrivate/${this_user_id}`, {
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });

  const user = {
    username: userData.data[0].username,
    email: userData.data[0].email, 
    points: userStats.data.points,
    meals_cooked: userStats.data.meals_cooked,
    created_recipes: userStats.data.created_recipes,
    rank: userStats.data.rank,
    profile_pic: userData.data[0].image_url,
  };

  return (
    <div>
      <AuthNav highlight="Profile" />
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
          <ChallengeTable elements={submissions} description="Click on any challenge to view details"/>
        </div>

        {/* Recipes Created */}
        <div className="py-5 flex-col justify-center content-center items-center mx-auto text-black">
          <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">
            Recipes Created
          </h1>
          <ChallengeTable elements={recipes} description="Click on any recipe to view details"/>
        </div>
      </div>
    </div>
  )
}
