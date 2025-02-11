"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card"
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect"
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards"
// import { Button } from "../components/ui/moving-border"
import { WobbleCard } from "../components/ui/wobble-card";
import Image from "next/image"
import "../styles/globals.css"
import buttonStyles from "../styles/button.module.css"
import titleStyles from "../styles/title.module.css"

// Acertinity UI
// ShadCN UI

export default function Landing() {      
    return (
      <div className="min-w-screen min-h-screen bg">   
        {/* Top Horizontal Row */}
        <div className="flex pl-3 pt-2 pb-2">
          <Image
            src="/LetsCook.png"
            width={50}
            height={50}
            alt="LetsCook"
          />
          <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>
          <Button className="flex-right ml-auto mt-1 mr-5 font-bold bg-orange-700">Login</Button>
        </div>
        <hr/>

        {/* Title */}
        <div className="flex-col content-center justify-items-center pt-[8em] pb-[9em]">
          <Badge className="scale-[2] bg-orange-700">Want to cook?</Badge>
          <h1 className="text-[8em]">LetsCook</h1>
          <Button className="scale-[1.5] mt-[3em] font-bold bg-orange-600">Start Cooking ➝</Button>
        </div>

        {/* Benefits */}
        <div className="bg-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto w-full pt-20 pb-20 pl-10 pr-10">
            <WobbleCard containerClassName="col-span-1 max-h-[22em] bg-gray-50 text-black border border-orange-800">
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]">
                Cook 🍳
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base lg:text-xl text-black">
                Find a posted recipe on the taskboard and cook it up! Submit pictures of your masterpiece to earn
                points.
              </p>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 max-h-[22em] bg-gray-50 text-black border border-orange-800">
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]">
                Challenge ⚔️
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base lg:text-xl text-black">
                Challenge the community with your own recipe! Post the steps on the taskboard and earn points for 
                completed submissions.
              </p>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 max-h-[22em] bg-gray-50 text-black border border-orange-800">
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em]">
                Compete 👑
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base lg:text-xl text-black">
                Compete against the world to gather the most amount of points, and become a <br/><span className="font-bold underline text-orange-800">Master Chef!</span>
              </p>
            </WobbleCard>
          </div>
        </div>

        {/* Brief Statistics */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-10 max-w-xl lg:max-w-6xl mx-auto w-full pt-5 pb-5 pl-10 pr-10">
            <WobbleCard containerClassName="col-span-1 max-h-[22em] text-black bg-white content-center">
                <div className="flex justify-center">
                  <Image
                    src="/ChefHat.png"
                    width={75}
                    height={75}
                    alt="Chef Hat"
                  />
                </div>
                <h2 className="mx-auto mt-7 mb-1 max-w-80 text-orange-600 text-balance text-base md:text-xl lg:text-3xl font-extrabold tracking-[-0.015em] text-center">
                  96,000
                </h2>
                <h2 className="mx-auto max-w-80 text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-center">
                  Chefs
                </h2>
              </WobbleCard>

              <WobbleCard containerClassName="col-span-1 max-h-[22em] text-black bg-white content-center">
                <div className="flex justify-center">
                  <Image
                    src="/CookBook.png"
                    width={75}
                    height={75}
                    alt="Cook Book"
                  />
                </div>
                <h2 className="mx-auto mt-7 mb-1 max-w-80 text-orange-600 text-balance text-base md:text-xl lg:text-3xl font-extrabold tracking-[-0.015em] text-center">
                  145,000
                </h2>
                <h2 className="mx-auto max-w-80 text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-center">
                  Recipes
                </h2>
              </WobbleCard>

              <WobbleCard containerClassName="col-span-1 max-h-[22em] text-black bg-white content-center">
                <div className="flex justify-center">
                  <Image
                    src="/Chart.png"
                    width={75}
                    height={75}
                    alt="Chart"
                  />
                </div>
                <h2 className="mx-auto mt-7 pl-0 mb-1 max-w-80 text-orange-600 text-balance text-base md:text-xl lg:text-3xl font-extrabold tracking-[-0.015em] text-center">
                  345,001
                </h2>
                <h2 className="mx-auto text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-center">
                  Meals
                </h2>
              </WobbleCard>
              
              <WobbleCard containerClassName="col-span-1 max-h-[22em] text-black bg-white content-center">
                <div className="flex justify-center">
                  <Image
                    src="/Trophy.png"
                    width={75}
                    height={75}
                    alt="Trophy"
                  />
                </div>
                <h2 className="mx-auto mt-7 mb-1 max-w-80 text-orange-600 text-balance text-base md:text-xl lg:text-3xl font-extrabold tracking-[-0.015em] text-center">
                  100%
                </h2>
                <h2 className="mx-auto max-w-80 text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-center">
                  Success
                </h2>
              </WobbleCard>
          </div>
        </div>

        {/* Quote */}
        <div className="flex-col content-center justify-items-center pt-[6em] pb-[6em] px-10 bg-gray-100">
          <h1 className="text-[2em]">"The difference between humans and animals? We can cook. Tell a dog to make dinner—he’ll  look at you thinking you’re the one who needs a lesson.
            So get to the kitchen and start cooking, why don't you?" <br/><span className="text-[0.75em] text-gray-700">— Haris Khawja, Co-Founder</span>
          </h1>
          <Button className="scale-[1.5] mt-[3em] font-bold bg-orange-600">Count me in! 🤝</Button>
        </div>
      </div>
    )
}