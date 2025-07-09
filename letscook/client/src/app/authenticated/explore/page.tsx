"use server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import AuthNav from "@/components/ui/authNav"
import { Users, Trophy, TrendingUp, ChefHat, Target, Award } from "lucide-react"

export default async function Explore() {
  return (
    <div>
      <AuthNav highlight="Explore" />
      <div className="min-w-screen min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        {/* Hero Section */}
        <div className="flex-col content-center justify-items-center pt-8 md:pt-16 pb-8 md:pb-12 px-4 md:px-10 text-center">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-full px-6 py-2 mb-6 inline-block shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <Badge className="scale-125 md:scale-[1.5] bg-transparent text-white border-0 hover:bg-transparent">Explore 🍳</Badge>
          </div>
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2 pb-2 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent leading-[1.2]"
            style={{overflow: 'visible'}}
          >Culinary Challenges</h1>
          <Card className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-orange-200 max-w-4xl mx-auto hover:shadow-3xl transition-all duration-300">
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              Master your cooking skills by taking on recipe challenges posted by chefs worldwide. Complete recipes,
              submit your results, and earn points to level up your cooking profile! 🎯
            </p>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="py-12 md:py-16 px-4 md:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 text-center bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl md:text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-orange-800">Choose a Challenge</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Browse challenges posted by other chefs. Filter by difficulty, cuisine, or ingredients.
              </p>
            </Card>
            <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl md:text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-orange-800">Cook & Document</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Follow the recipe instructions and take photos of your process and final dish.
              </p>
            </Card>
            <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl md:text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-orange-800">Submit & Earn Points</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Upload your creation to earn points and climb the leaderboard to become a Master Chef!
              </p>
            </Card>
          </div>
        </div>

        {/* Platform Features Section */}
        <div className="py-12 md:py-16 px-4 md:px-10 bg-gradient-to-br from-white via-orange-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">Why Choose Our Platform?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
                We've built the ultimate cooking challenge experience with features designed to help you grow as a chef.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 */}
              <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-orange-800">Skill-Based Progression</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Earn points and unlock new challenges as you improve. Track your culinary journey from beginner to
                  master chef.
                </p>
              </Card>
              {/* Feature 2 */}
              <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-800">Community Driven</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Learn from experienced chefs and share your own expertise. Build connections with fellow cooking
                  enthusiasts.
                </p>
              </Card>
              {/* Feature 3 */}
              <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-green-800">Detailed Feedback</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Get constructive feedback on your submissions and learn from every challenge you complete.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Challenge Categories Section */}
        <div className="py-12 md:py-16 px-4 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">Explore Culinary Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
                From quick weeknight dinners to elaborate weekend projects, find challenges that match your skill level
                and interests.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Category 1 */}
              <Card className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 md:p-6 text-center border-red-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">🍝</span>
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-red-800">Italian Classics</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Master pasta, risotto, and traditional Italian techniques
                </p>
              </Card>
              {/* Category 2 */}
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 md:p-6 text-center border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">🍜</span>
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-orange-800">Asian Cuisine</h3>
                <p className="text-gray-600 text-xs md:text-sm">Explore the flavors of Asia with authentic recipes</p>
              </Card>
              {/* Category 3 */}
              <Card className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 md:p-6 text-center border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">🧁</span>
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-pink-800">Baking & Pastry</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  Perfect your baking skills with sweet and savory treats
                </p>
              </Card>
              {/* Category 4 */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 md:p-6 text-center border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">🥗</span>
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-green-800">Healthy & Fresh</h3>
                <p className="text-gray-600 text-xs md:text-sm">Nutritious meals that don't compromise on flavor</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-12 px-4 md:px-10 text-center bg-gradient-to-br from-orange-100 via-white to-orange-100">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-orange-200 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">Ready to test your skills?</h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 md:mb-8 text-gray-700 px-4">
              Join thousands of cooking enthusiasts challenging themselves daily!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/authenticated/challenges" key="Browse Challenges">
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto text-sm sm:text-base bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Browse Challenges
                </Button>
              </Link>
              <Link href="/authenticated/createpost" key="Create your own challenge">
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto text-sm sm:text-base bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Create Your Own Challenge
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}