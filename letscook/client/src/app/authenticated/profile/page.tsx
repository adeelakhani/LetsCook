"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image"
import "@/styles/globals.css"
import buttonStyles from "@/styles/button.module.css"
import titleStyles from "@/styles/title.module.css"

export default function Profile() {
    return (
        <div className="min-w-screen min-h-screen bg">
            
            {/* Profile Card */}
            <div>
            <CardContainer className="inter-var mr-auto ml-20">
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

            </div>

        </div>
    )
}