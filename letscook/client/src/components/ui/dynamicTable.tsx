"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Image from "next/image"
import "@/styles/globals.css"

type Row = [string, string, string, number]

type DynamicTable = {
    elements: Row[]
}

export default function DynamicTable({ elements }: DynamicTable) {
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
                                <TableCell className="text-right text-base">{element.points}</TableCell>   
                            </TableRow>
                        )
                    })}
                </TableBody>
        </Table>
    </div>
    )    
}

