"use client"
import React from "react"
import { Badge } from "@/components/ui/badge"
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

type RecipeRow = {
    author: string, 
    recipe: string, 
    difficulty: string
}

type RecipeTable = {
    elements: RecipeRow[]
}

export default function RecipeTable({ elements }: RecipeTable) {
    return (
        <div className="w-[75%] mx-auto pb-3">
            <Table>
                <TableHeader className="text-xl bg-orange-800">
                    <TableRow>
                        <TableHead className="text-white font-bold">Author</TableHead>
                        <TableHead className="text-white font-bold">Recipe</TableHead>
                        <TableHead className="text-white font-bold">Difficulty</TableHead>
                        <TableHead className="text-white text-right font-bold">Points</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    {elements.map( (element: any, index: number) => {
                        return (
                            <TableRow key={index} className="hover:bg-gray-300">
                                <TableCell className="font-medium text-base">{element.author}</TableCell>
                                <TableCell className="text-base">{element.recipe}</TableCell>
                                <TableCell>
                                    {element.difficulty == "Easy" && <Badge className="font-bold text-sm bg-cyan-700">Easy</Badge>}
                                    {element.difficulty == "Medium" && <Badge className="font-bold text-sm bg-yellow-700">Medium</Badge>}
                                    {element.difficulty == "Hard" && <Badge className="font-bold text-sm bg-red-700">Hard</Badge>}
                                </TableCell>
                                <TableCell className="text-right text-base">
                                    {element.difficulty === "Easy" ? 2 : 
                                    element.difficulty === "Medium" ? 5 : 
                                    element.difficulty === "Hard" ? 10 : null}
                                </TableCell>   
                            </TableRow>
                        )
                    })}
                </TableBody>
        </Table>
    </div>
    )    
}

