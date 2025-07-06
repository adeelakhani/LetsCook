"use server";
import React from "react";
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import ProfileChart from "@/components/ui/profileChart";
import ProfileCard from "@/components/ui/profileCard";
import ProfileChallengeTable from "@/components/ui/profile-challenge-table"
import ProfileSubmissionsTable from "@/components/ui/profile-submissions-table"

import axios from 'axios';

import AuthNav from "@/components/ui/authNav";


type SubmitInfo = {
  id: string
  user_id: string
  username: string
  dish_name: string
  difficulty?: string
  description: string
  profile_url: string
  created_at: string
  images: string[]
}
type PostInfo = {
  id: string;
  user_id: string;
  username: string;
  dish_name: string;
  difficulty?: string;
  description: string;
  profile_url: string;
  created_at: string;
  images: string[];
};


function generateChartData(posts: PostInfo[], submissions: SubmitInfo[]) {
  const currentYear = new Date().getFullYear()

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Create initial chart data with zeros
  const chartData = months.map((month) => ({
    month,
    meals: 0,
    recipes: 0,
  }))

  posts.forEach((post) => {
    const postDate = new Date(post.created_at)
    if (postDate.getFullYear() === currentYear) {
      const monthIndex = postDate.getMonth()
      chartData[monthIndex].recipes += 1
    }
  })

  submissions.forEach((submission) => {
    const submissionDate = new Date(submission.created_at)
    if (submissionDate.getFullYear() === currentYear) {
      const monthIndex = submissionDate.getMonth()
      chartData[monthIndex].meals += 1
    }
  })

  const currentMonthIndex = new Date().getMonth()

  return chartData.slice(0, currentMonthIndex + 1)
}


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
  const userStats = await axios.get(`${process.env.API_URL}/api/getStats/${this_user_id}`);
  const userData = await axios.get(`${process.env.API_URL}/api/userPrivate/${this_user_id}`, {
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });
  const posts = await axios.get(`${process.env.API_URL}/api/userCreations/${this_user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  if (posts.status !== 200) {
    alert("Failed to fetch posts");
    redirect("/login");
  }
  const submissions = await axios.get(`${process.env.API_URL}/api/userSubmissions/${this_user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  if(submissions.status !== 200) {
    alert("Failed to fetch submissions");
    redirect("/login");
  }
  const chartData = generateChartData(posts.data, submissions.data)


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
        <div className="lg:flex lg:gap-10 flex-col-1 justify-center mx-auto content-center items-center bg-white">
          <ProfileCard user={user} />

          <ProfileChart elements={chartData} />
        </div>

        <div className="py-5 bg-gray-100 flex-col justify-center content-center items-center mx-auto text-black">
          <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">
            Past Submissions
          </h1>
          <ProfileSubmissionsTable submissions={submissions.data} />
        </div>

        <div className="py-5 flex-col justify-center content-center items-center mx-auto text-black">
          <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">
            Recipes Created
          </h1>
          <ProfileChallengeTable postsInfo={posts.data} />
        </div>
      </div>
    </div>
  )
}
