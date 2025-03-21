"use client"
import React, { useState } from "react"
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

import { useRouter } from "next/navigation";

type Row = {
    author: string, 
    recipe: string, 
    difficulty: string
}

type DynamicTable = {
    elements: Row[],
    description: string
}

export default function DynamicTable({ elements, description }: DynamicTable) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter();

    return (
        <div className="w-[75%] mx-auto pb-3">
            <div className="text-center mb-2 text-gray-600 text-sm">
                {description}
            </div>
            <Table className="overflow-hidden">
                <TableHeader className="text-xl bg-orange-800">
                    <TableRow>
                        <TableHead className="text-white font-bold">Author</TableHead>
                        <TableHead className="text-white font-bold">Recipe</TableHead>
                        <TableHead className="text-white font-bold">Difficulty</TableHead>
                        <TableHead className="text-white text-right font-bold">Points</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    {elements.map((element: any, index: number) => {
                        return (
                            <TableRow 
                                key={index} 
                                className={`
                                    cursor-pointer transition-all duration-200 
                                    border-b relative overflow-hidden
                                    ${hoveredIndex === index ? 'bg-orange-50 shadow-lg scale-[1.01] z-10' : 'hover:bg-gray-100 hover:shadow-md'}
                                `}
                                onClick={() => {
                                    console.log("Clicked");
                                    router.push("/authenticated/submit");
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <TableCell className="font-medium text-base">{element.author}</TableCell>
                                <TableCell className="text-base">
                                    <div className="flex items-center">
                                        {element.recipe}
                                        {/* {hoveredIndex === index && (
                                            <span className="ml-2 text-xs text-orange-600 font-medium">
                                                VIEW
                                            </span>
                                        )} */}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {element.difficulty == "Easy" && <Badge className="font-bold text-sm bg-cyan-700">Easy</Badge>}
                                    {element.difficulty == "Medium" && <Badge className="font-bold text-sm bg-yellow-700">Medium</Badge>}
                                    {element.difficulty == "Hard" && <Badge className="font-bold text-sm bg-red-700">Hard</Badge>}
                                </TableCell>
                                <TableCell className="text-right text-base">
                                    <div className="flex items-center justify-end gap-2">
                                        <span>
                                            {element.difficulty === "Easy" ? 2 : 
                                            element.difficulty === "Medium" ? 5 : 
                                            element.difficulty === "Hard" ? 10 : null}
                                        </span>
                                        <ChevronRight 
                                            className={`
                                                ${hoveredIndex === index ? 'text-orange-600 translate-x-1' : 'text-gray-500'} 
                                                transition-all duration-200
                                            `}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="text-center mt-3 opacity-75">
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    <span className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
                    Challenges update daily
                </span>
            </div>
        </div>
    )    
}