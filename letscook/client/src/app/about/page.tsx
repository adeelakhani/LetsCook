"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from 'lucide-react'

import UnauthNav from "@/components/ui/unauthNav"
import CTA from "@/components/ui/cta"

export default function AboutPage() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 animate-fadeIn">
      {/* Top Horizontal Navbar */}
      <UnauthNav highlight="About"/>

      {/* Back to Home Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link href="/">
          <Button variant="ghost" className="flex items-center text-orange-600 hover:text-orange-700 hover:bg-orange-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* About Us Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">About LetsCook</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover our story, our mission, and the team behind the cooking revolution.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12 border border-orange-200">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                LetsCook was born from a simple idea: cooking should be fun, social, and rewarding. Founded in 2023 by Adeel Akhani and Haris Khawja, our platform began as a small community of food enthusiasts sharing recipes and cooking tips.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a passion project quickly grew into something bigger. We noticed that people weren't just sharing recipes—they were forming connections, learning new skills, and challenging themselves to become better cooks.
              </p>
              <p className="text-gray-700">
                Today, LetsCook is a thriving community where home chefs can discover new recipes, challenge others, and showcase their culinary creations. Our mission remains the same: to bring people together through the joy of cooking.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden shadow-lg animate-shimmer-border">
                <Image 
                  src="/placeholder.svg?height=400&width=600" 
                  alt="LetsCook Team" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12 border border-orange-200">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="text-4xl text-orange-500 mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">Connect</h3>
              <p className="text-gray-700">
                Build a global community of food lovers who share their passion, knowledge, and cultural traditions through cooking.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="text-4xl text-orange-500 mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">Educate</h3>
              <p className="text-gray-700">
                Empower people with the skills and confidence to create delicious meals, regardless of their experience level.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="text-4xl text-orange-500 mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">Inspire</h3>
              <p className="text-gray-700">
                Motivate home chefs to push their boundaries, try new recipes, and celebrate the art of cooking.
              </p>
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12 border border-orange-200">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-orange-300">
                <Image 
                  src="/Adeel.png" 
                  alt="Adeel Akhani" 
                  width={160} 
                  height={160}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-orange-800">Adeel Akhani</h3>
              <p className="text-orange-600 mb-2">Co-Founder & CEO</p>
              <p className="text-gray-700 text-center max-w-md">
                With a background in technology and a passion for food, Adeel brings the technical expertise needed to build our platform.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-orange-300">
                <Image 
                  src="/Xerxes.jpg" 
                  alt="Haris Khawja"
                  width={160} 
                  height={160}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-orange-800">Xerxes Radon</h3>
              <p className="text-orange-600 mb-2">Co-Founder & COO</p>
              <p className="text-gray-700 text-center max-w-md">
                A culinary enthusiast with a knack for business development, Xerxes oversees operations and community growth.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <CTA />
      </div>
    </div>
  )
}