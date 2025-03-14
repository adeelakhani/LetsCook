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


export default function Profile() {
    const chartData = [
        { month: "January", meals: 186, recipes: 80 },
        { month: "February", meals: 305, recipes: 200 },
        { month: "March", meals: 237, recipes: 120 },
        { month: "April", meals: 73, recipes: 190 },
        { month: "May", meals: 209, recipes: 130 },
        { month: "June", meals: 214, recipes: 140 },
    ]

    const chartConfig = {
        meals: {
          label: "Meals Cooked",
          color: "#ea580c",
        },
        recipes: {
          label: "Recipes Created",
          color: "#7f1d1d",
        },
      } satisfies ChartConfig

    const submissions = [
        { author: "Haris Khawja", recipe: "Hakka Chow Mein", difficulty: "Medium", points: 3 },
        { author: "Sir Williams", recipe: "Clam Chowder", difficulty: "Hard", points: 5 },
        { author: "ishowspeed", recipe: "Chicken Nuggets", difficulty: "Easy", points: 1 },
    ]

    return (
        <div className="min-w-screen min-h-screen">
            
            {/* Profile Card */}
            <div className="lg:flex lg:gap-10 flex-col-1 justify-center mx-auto content-center items-center bg-white">
                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-100 relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-orange-700">
                        <Image 
                            src="/LetsCook.png?v=2" 
                            width={150}
                            height={150}
                            alt="LetsCook" 
                            className="absolute inset-0 z-0 rounded-lg opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                        />
                        
                        <CardItem
                            translateZ="50"
                            className="flex"
                        >
                            <Image
                                src="/GoogleIcon.png"
                                width={75}
                                height={75}
                                alt="GoogleIcon"
                                className="border rounded-lg self-start"
                            />

                            <div className="flex-col ml-4">
                                <CardItem
                                translateZ="50"
                                className="text-4xl font-bold text-black dark:text-white"
                                >
                                    Haris Khawja
                                </CardItem>

                                <CardItem
                                translateZ="50"
                                className="text-xl text-black dark:text-white"
                                >
                                    hariskhawja@gmail.com
                                </CardItem>
                            </div>

                            <div className="flex-col mx-auto ml-10">
                                <Image
                                    src="/ChefHat.png"
                                    width={60}
                                    height={20}
                                    alt="Chef Hat"
                                    className="opacity-30"
                                />
                                <h1 className="text-center text-red-700 font-extrabold text-2xl">#245</h1>
                            </div>

                        </CardItem>
                        
                        <CardItem
                            translateZ="60"
                            className="text-black font-bold w-full text-m mt-2 flex"
                            >
                            <p>
                                Points: 5<br/>
                                Meals Cooked: 11<br/>
                                Created Recipes: 5
                            </p>
                            <Button variant="default" className="ml-auto mt-auto w-[8em] bg-orange-800 font-bold">Log Out</Button>

                        </CardItem>
                    </CardBody>
                </CardContainer>

                {/* Submissions Chart */}
                <CardContainer className="inter-var">
                    <ChartContainer config={chartConfig} className="min-w-[50em]">
                        <LineChart accessibilityLayer data={chartData} className="border border-orange-700 rounded-xl bg-gray-50 p-5 pl-0">
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis/>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} className="text-lg" />
                            <Line             
                                type="monotone" 
                                dataKey="meals" 
                                stroke="var(--color-meals)" 
                                strokeWidth={4} 
                                dot={{ r: 4 }}  
                            />
                            <Line             
                                type="monotone" 
                                dataKey="recipes" 
                                stroke="var(--color-recipes)" 
                                strokeWidth={4} 
                                dot={{ r: 4 }}  
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContainer>
            </div>

            {/* Past Submissions */}
            <div className="py-5 bg-gray-100 flex-col justify-center content-center items-center mx-auto text-black">
                <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">Past Submissions</h1>
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

                            {submissions.map( (submission, index) => {
                                return (
                                    <TableRow key={index} className="hover:bg-gray-300">
                                        <TableCell className="font-medium text-base">{submission.author}</TableCell>
                                        <TableCell className="text-base">{submission.recipe}</TableCell>
                                        <TableCell>
                                            {submission.difficulty == "Easy" && <Badge className="font-bold text-sm bg-cyan-700">Easy</Badge>}
                                            {submission.difficulty == "Medium" && <Badge className="font-bold text-sm bg-yellow-700">Medium</Badge>}
                                            {submission.difficulty == "Hard" && <Badge className="font-bold text-sm bg-red-700">Hard</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right text-base">{submission.points}</TableCell>   
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

            </div>

        </div>
    )
}