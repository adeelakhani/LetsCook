"use server";
import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

import AuthNav from "@/components/ui/authNav";

export default async function Explore() {
  
  return (
    <div>
      <AuthNav highlight="Explore" />
      <div className="min-w-screen min-h-screen bg">
        {/* Header Section */}
        <div className="flex-col content-center justify-items-center pt-16 pb-12 px-10 text-center">
          <Badge className="scale-[1.5] bg-orange-700 mb-4">Explore</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Culinary Challenges</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
            Master your cooking skills by taking on recipe challenges posted by chefs worldwide.
            Complete recipes, submit your results, and earn points to level up your cooking profile!
          </p>
        </div>

        {/* Featured Challenges */}
        <div className="bg-gray-100 py-16 px-10">
          <div className="flex justify-between items-center max-w-5xl mx-auto mb-8">
            <h2 className="text-3xl font-bold">Beginner Recipes</h2>
            <div className="flex gap-3">
              {/* <Button variant="outline" className="border-orange-600 text-orange-600">Filter</Button>
              <Button variant="outline" className="border-orange-600 text-orange-600">Difficulty</Button> */}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Challenge Card 1 */}
            <div className="col-span-1 bg-white text-black border-l-4 border-orange-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Badge className="bg-orange-600">Medium</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600 font-bold">125 Points</span>
                    <span className="text-gray-500 text-sm">923 Attempts</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Simple Sandwitch</h3>
                <p className="text-gray-700 mb-4">
                  A basic starter guide on making a simple sandwitch with sourdough bread, cheese, lettuce, tomatoes and mayonaise.
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-xs">AA</span>
                    </div>
                    <span className="text-sm">Posted by <span className="font-medium">Adeel Akhani</span></span>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">View Challenge</Button>
                </div>
              </div>
            </div>

            {/* Challenge Card 2 */}
            <div className="col-span-1 bg-white text-black border-l-4 border-green-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Badge className="bg-green-600">Easy</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600 font-bold">75 Points</span>
                    <span className="text-gray-500 text-sm">1.2k Attempts</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Homemade Sourdough Bread</h3>
                <p className="text-gray-700 mb-4">
                  Create your own sourdough starter and bake a perfect loaf with a crispy crust and chewy interior.
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-xs">SB</span>
                    </div>
                    <span className="text-sm">Posted by <span className="font-medium">SourdoughBaker</span></span>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">View Challenge</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="py-16 px-10">
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Choose a Challenge</h3>
              <p className="text-gray-700">
                Browse challenges posted by other chefs. Filter by difficulty, cuisine, or ingredients.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Cook & Document</h3>
              <p className="text-gray-700">
                Follow the recipe instructions and take photos of your process and final dish.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Submit & Earn Points</h3>
              <p className="text-gray-700">
                Upload your creation to earn points and climb the leaderboard to become a Master Chef!
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-12 px-10 text-center bg-gray-100">
          <h2 className="text-3xl font-bold mb-6">Ready to test your skills?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
            Join thousands of cooking enthusiasts challenging themselves daily!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/authenticated/challenge" key="Browse Challenges">
              <Button variant="ghost" className="mr-5 text-[1em]  bg-orange-500 text-white hover:bg-orange-400 hover:text-white">Browse Challenges</Button>
            </Link>
            <Link href="/authenticated/createpost" key="Create your own challenge">
            <Button variant="ghost" className="mr-5 text-[1em]  bg-orange-500 text-white hover:bg-orange-400 hover:text-white">Create Your Own Challenge</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}