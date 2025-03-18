"use server"
import React from "react"
import LeaderboardTable from "@/components/ui/leaderboardTable"

const leaderboard = [
    { rank: 1, user: "Haris Khawja", points: 256, meals_cooked: 56, created_recipes: 12 },
    { rank: 2, user: "Aisha Patel", points: 242, meals_cooked: 52, created_recipes: 10 },
    { rank: 3, user: "Liam Chen", points: 230, meals_cooked: 49, created_recipes: 9 },
    { rank: 4, user: "Sophia Martinez", points: 215, meals_cooked: 45, created_recipes: 8 },
    { rank: 5, user: "Noah Kim", points: 200, meals_cooked: 41, created_recipes: 7 },
    { rank: 6, user: "Emma Johnson", points: 188, meals_cooked: 38, created_recipes: 6 },
    { rank: 7, user: "Ethan Brown", points: 175, meals_cooked: 34, created_recipes: 5 },
    { rank: 8, user: "Olivia Davis", points: 160, meals_cooked: 30, created_recipes: 4 },
    { rank: 9, user: "Mason Wilson", points: 145, meals_cooked: 27, created_recipes: 3 },
    { rank: 10, user: "Isabella Lee", points: 130, meals_cooked: 24, created_recipes: 2 }
]

export default async function Leaderboard() {
    return (
        <div className="py-5 bg-gray-100 flex-col justify-center content-center items-center mx-auto text-black">
            <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">The Master Chefs 👑</h1>
            <LeaderboardTable elements={leaderboard} />
        </div>
    )
}