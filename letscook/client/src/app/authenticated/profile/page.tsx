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
import Image from "next/image"
import "@/styles/globals.css"
import buttonStyles from "@/styles/button.module.css"
import titleStyles from "@/styles/title.module.css"


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
          label: "Meals",
          color: "#ea580c",
        },
        recipes: {
          label: "Recipes",
          color: "#7f1d1d",
        },
      } satisfies ChartConfig      

    return (
        <div className="min-w-screen min-h-screen">
            
            {/* Profile Card */}
            <div className="lg:flex lg:gap-10 flex-col-1 justify-center mx-auto content-center items-center">
                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-100 relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-orange-700">
                        <Image 
                            src="/LetsCook.png?v=2" 
                            width={150}
                            height={150}
                            alt="LetsCook" 
                            className="grayscale absolute inset-0 z-0 rounded-lg opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
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
                            <Button variant="default" className="ml-auto mt-auto w-[8em] bg-orange-800">Log Out</Button>

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

        </div>
    )
}