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
            src="/LetsCook2.png"
            width={50}
            height={50}
            alt="LetsCook"
          />
          <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>
          <Button className="flex-right ml-auto mt-1 mr-5 font-bold bg-orange-700">Login</Button>
        </div>
        <hr/>

        {/* Title */}
        <div className="flex-col content-center justify-items-center pt-[8em] pb-[8em]">
          <Badge className="scale-[2] bg-orange-700">Want to cook?</Badge>
          <h1 className="text-[8em]">LetsCook</h1>
          <Button className="scale-[1.5] mt-[2em] font-bold bg-orange-600">Start Cooking ➝</Button>
        </div>

        {/* Benefits */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto w-full bg-blue-800">
          <WobbleCard containerClassName="col-span-1 max-h-[20em] bg-black">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              No shirt, no shoes, no weapons.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              If someone yells “stop!”, goes limp, or taps out, the fight is over.
            </p>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 max-h-[20em]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              No shirt, no shoes, no weapons.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              If someone yells “stop!”, goes limp, or taps out, the fight is over.
            </p>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 max-h-[20em]">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Signup for blazing-fast cutting-edge state of the art Gippity AI
                wrapper today!
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
poo              </p>
          </WobbleCard>
        </div>


      </div>
    )
}