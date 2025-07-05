"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import "../styles/globals.css"

import {redirect} from "next/navigation"
import UnauthNav from "@/components/ui/unauthNav";

// Acertinity UI
// ShadCN UI

export default function Landing() {
    return (
      <div className="min-w-screen min-h-screen animate-fadeIn">  
        {/* Top Horizontal Navbar */}
        <UnauthNav highlight="Home"/>
  
        {/* Title */}
        <div className="flex flex-col items-center justify-center pt-[8em] pb-[9em]">
          <div className="scale-[2]">
            <Badge className="bg-orange-600 shadow-md transition-all duration-300 hover:-translate-y-2">Want to cook?</Badge>
          </div>
          <h1 className="text-[8em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 animate-pulse-slow">LetsCook</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
          Join the community, join the vision; Learn to cook, learn with precision; Become a chef, become a magician ✨ 
          </p>
          <div className="scale-[1.5] mt-[3em]">
            <Button onClick={() => redirect("/login")} className="font-bold bg-orange-600 shadow-md transition-all duration-300 hover:-translate-y-2">Start Cooking ➝</Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-100">
          <div className="pt-20 text-center">
            <h2 className="text-5xl font-bold text-orange-800">How It Works</h2>
            <p className="text-lg mt-4 text-gray-600">Three simple ways to engage with our cooking community...</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-[75%] mx-auto pt-10 pb-20">

            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <Link href="/authenticated/challenges" className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-5xl animate-bounce-slow animation-delay-250">
                🍳
                </div>
                <h3 className="text-orange-800 text-2xl font-semibold mb-2 text-center">Cook</h3>
                <p className="text-gray-700 text-center">Find a posted recipe on the taskboard and cook it up! Submit pictures of your masterpiece to earn
                points.</p>
              </Link>
            </div>

            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <Link href="/authenticated/createpost" className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-5xl animate-bounce-slow animation-delay-500">
                ⚔️
                </div>
                <h3 className="text-orange-800 text-2xl font-semibold mb-2 text-center">Challenge</h3>
                <p className="text-gray-700 text-center">Challenge the community with your own recipe! Post the steps on the taskboard and earn points for 
                completed submissions.</p>
              </Link>
            </div>

            <div className="justify-self-center col-span-2 lg:col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <Link href="/authenticated/leaderboard" className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-5xl animate-bounce-slow animation-delay-750">
                👑
                </div>
                <h3 className="text-orange-800 text-2xl font-semibold mb-2 text-center">Compete</h3>
                <p className="text-gray-700 text-center">Compete against the world to gather the most amount of points, and become a <br/><span className="font-bold underline text-orange-600">Master Chef!</span></p>
              </Link>
            </div>
          </div>
        </div>

      {/* Why LetsCook Section */}
      <div id="stats" className="pt-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-orange-800">Why LetsCook?</h2>
            <p className="mt-4 text-lg text-gray-700">The perfect platform for cooking enthusiasts</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 w-full pt-10 pb-20">
            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-5xl animate-bounce-slow">🏆</div>
                <h3 className="text-orange-800 text-2xl font-semibold mb-2 text-center">Compete</h3>
                <p className="text-gray-700 text-center">Challenge others and earn recognition</p>
              </div>
            </div>

            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-5xl animate-bounce-slow animation-delay-250">
                  🧑‍🍳
                </div>
                <h3 className="text-orange-800 text-2xl font-semibold mb-2 text-center">Learn</h3>
                <p className="text-gray-700 text-center">Improve your cooking skills with each recipe</p>
              </div>
            </div>

            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-5xl animate-bounce-slow animation-delay-500">
                  🔎
                </div>
                <h3 className="text-orange-800 text-2xl font-semibold mb-2 text-center">Discover</h3>
                <p className="text-gray-700 text-center">Discover new cultures and delicate dishes</p>
              </div>
            </div>

            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-5xl animate-bounce-slow animation-delay-750">
                  👥
                </div>
                <h3 className="text-orange-800 text-2xl font-semibold mb-2 text-center">Connect</h3>
                <p className="text-gray-700 text-center">Join a community of passionate food lovers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Quote */}
        <div className="flex flex-col items-center justify-center pt-[4em] pb-[4em] px-10 bg-gray-100">
          <svg
            className="w-12 h-12 text-orange-300 mx-auto mb-6 animate-pulse-slow"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <h1 className="text-[1.5em] max-w-[30em] text-center">"You can’t cook if you don’t like people." <br/><span className="text-[0.75em] text-gray-700">— Joël Robuchon</span>
          </h1>
          <div className="scale-[1.5] mt-[3em]">
            <Button onClick={() => redirect("/login")} className="font-bold bg-orange-600 shadow-md transition-all duration-300 hover:-translate-y-2">Count me in! 🤝</Button>
          </div>
        </div>
      </div>
    )
}