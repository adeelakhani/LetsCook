"use client"
import React from "react"
import { usePathname, notFound } from "next/navigation";
import DynamicTable from "@/components/ui/challengeTable";
import UserCard from "@/components/ui/userCard";
import ProfileChart from "@/components/ui/profileChart";

export default function UserPageRender() {
    const pathName = usePathname();
    const username = pathName.split('/').slice(-1)[0]
    
    if (false) {
        notFound();
    }

    const chartData = [
        { month: "January", meals: 0, recipes: 80 },
        { month: "February", meals: 305, recipes: 200 },
        { month: "March", meals: 237, recipes: 120 },
        { month: "April", meals: 73, recipes: 190 },
        { month: "May", meals: 209, recipes: 130 },
        { month: "June", meals: 214, recipes: 140 },
    ];

    const user = {
        username: username,
        points: 0,
        meals_cooked: 0,
        created_recipes: 0,
        rank: 1,
        profile_pic: "/ilikepics",
    };

    const submissions = [
        { author: "Haris Khawja", recipe: "Hakka Chow Mein", difficulty: "Medium" },
        { author: "Sir Williams", recipe: "Clam Chowder", difficulty: "Hard" },
        { author: "ishowspeed", recipe: "Chicken Nuggets", difficulty: "Easy" },
    ];

    return (
    <div className="min-w-screen min-h-screen">
      {/* Profile Card */}
      <div className="lg:flex lg:gap-10 flex-col-1 justify-center mx-auto content-center items-center bg-white">
        <UserCard user={user} />

        {/* Submissions Chart */}
        <ProfileChart elements={chartData} />
      </div>

      {/* Past Submissions */}
      <div className="py-5 bg-gray-100 flex-col justify-center content-center items-center mx-auto text-black">
        <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">
          Past Submissions
        </h1>
        <DynamicTable elements={submissions} description="Click on any challenge to view details"/>
      </div>
    </div>
    );
  }