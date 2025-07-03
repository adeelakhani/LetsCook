"use server";
import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import AuthNav from "@/components/ui/authNav"
import { Users, Trophy, TrendingUp } from "lucide-react"

export default async function Explore() {
  return (
    <div>
      <AuthNav highlight="Explore" />
      <div className="min-w-screen min-h-screen bg">
        <div className="flex-col content-center justify-items-center pt-16 pb-12 px-10 text-center">
          <Badge className="scale-[1.5] bg-orange-700 mb-4">Explore</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Culinary Challenges</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
            Master your cooking skills by taking on recipe challenges posted by chefs worldwide. Complete recipes,
            submit your results, and earn points to level up your cooking profile!
          </p>
        </div>

        {/* Challenge Categories Section */}
        <div className="bg-gray-50 py-16 px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Culinary Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From quick weeknight dinners to elaborate weekend projects, find challenges that match your skill level
                and interests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category 1 */}
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🍝</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Italian Classics</h3>
                <p className="text-gray-600 text-sm">Master pasta, risotto, and traditional Italian techniques</p>
              </div>

              {/* Category 2 */}
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🍜</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Asian Cuisine</h3>
                <p className="text-gray-600 text-sm">Explore the flavors of Asia with authentic recipes</p>
              </div>

              {/* Category 3 */}
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🧁</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Baking & Pastry</h3>
                <p className="text-gray-600 text-sm">Perfect your baking skills with sweet and savory treats</p>
              </div>

              {/* Category 4 */}
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🥗</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Healthy & Fresh</h3>
                <p className="text-gray-600 text-sm">Nutritious meals that don't compromise on flavor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features Section */}
        <div className="py-16 px-10 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've built the ultimate cooking challenge experience with features designed to help you grow as a chef.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Skill-Based Progression</h3>
                <p className="text-gray-600">
                  Earn points and unlock new challenges as you improve. Track your culinary journey from beginner to
                  master chef.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                <p className="text-gray-600">
                  Learn from experienced chefs and share your own expertise. Build connections with fellow cooking
                  enthusiasts.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Detailed Feedback</h3>
                <p className="text-gray-600">
                  Get constructive feedback on your submissions and learn from every challenge you complete.
                </p>
              </div>
            </div>
          </div>
        </div>

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

        <div className="py-12 px-10 text-center bg-gray-100">
          <h2 className="text-3xl font-bold mb-6">Ready to test your skills?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
            Join thousands of cooking enthusiasts challenging themselves daily!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/authenticated/challenges" key="Browse Challenges">
              <Button
                variant="ghost"
                className="mr-5 text-[1em] bg-orange-500 text-white hover:bg-orange-400 hover:text-white"
              >
                Browse Challenges
              </Button>
            </Link>
            <Link href="/authenticated/createpost" key="Create your own challenge">
              <Button
                variant="ghost"
                className="mr-5 text-[1em] bg-orange-500 text-white hover:bg-orange-400 hover:text-white"
              >
                Create Your Own Challenge
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
