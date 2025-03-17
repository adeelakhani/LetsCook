"use server"
import React from "react"
import DynamicTable from "@/components/ui/dynamicTable" 

const leaderboard = [
    { author: "Haris Khawja", recipe: "Hakka Chow Mein", difficulty: "Medium" },
    { author: "Sir Williams", recipe: "Clam Chowder", difficulty: "Hard" },
    { author: "ishowspeed", recipe: "Chicken Nuggets", difficulty: "Easy" },
]

export default async function Leaderboard() {
    return (
        <div className="py-5 bg-gray-100 flex-col justify-center content-center items-center mx-auto text-black">
            <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">Past Submissions</h1>
            <DynamicTable elements={leaderboard}>
            </DynamicTable>
        </div>
    )
}