"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import "@/styles/globals.css"

type Row = {
    rank: number,
    user: string, 
    points: number,
    meals_cooked: number, 
    created_recipes: number
}

type LeaderboardTable = {
    elements: Row[]
}

export default function LeaderboardTable({ elements }: LeaderboardTable) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter()

    return (
        <div className="w-[75%] mx-auto pb-3">
            <div className="text-center mb-2 text-gray-600 text-sm">
                Click on any chef to view profile
            </div>
            <Table className="overflow-hidden">
                <TableHeader className="text-xl bg-orange-800">
                    <TableRow>
                        <TableHead className="text-white font-bold">Rank</TableHead>
                        <TableHead className="text-white font-bold">Chef</TableHead>
                        <TableHead className="text-white font-bold">Points</TableHead>
                        <TableHead className="text-white font-bold">Meals Cooked</TableHead>
                        <TableHead className="text-white font-bold">Recipes Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    {elements.map((element: Row, index: number) => {
                        return (
                            <TableRow 
                                key={index} 
                                className={`
                                    cursor-pointer transition-all duration-200 
                                    border-b relative overflow-hidden
                                    ${hoveredIndex === index ? 'bg-orange-50 shadow-lg scale-[1.01] z-10' : 'hover:bg-gray-100 hover:shadow-md'}
                                `}
                                onClick={() => {
                                    router.push(`/users/${element.user}`)
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >   
                                <TableCell className="font-medium text-base">{element.rank}</TableCell>
                                <TableCell className="font-medium text-base">{element.user}</TableCell>
                                <TableCell className="font-medium text-base">{element.points}</TableCell>
                                <TableCell className="font-medium text-base">{element.meals_cooked}</TableCell>
                                <TableCell className="font-medium text-base">{element.created_recipes}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="text-center mt-3 opacity-75">
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    <span className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
                    Compete to enter the leaderboard!
                </span>
            </div>
        </div>
    )
}