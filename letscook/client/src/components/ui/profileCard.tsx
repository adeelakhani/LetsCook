"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import signOutFromGoogle from "@/utils/supabase/signOutFromGoogle"
import { Trophy, Star, ChefHat, LogOut } from "lucide-react"

type Person = {
  username: string
  email: string
  points: number
  meals_cooked: number
  created_recipes: number
  rank: number
  profile_pic: string
}

type ProfileCardProps = {
  user: Person
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="bg-white shadow-lg border border-orange-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header with Background Pattern */}
      <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-4 md:p-6">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/LetsCook.png?v=2"
            width={200}
            height={200}
            alt="LetsCook"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Profile Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <Image
                src={user.profile_pic || "/placeholder.svg"}
                width={96}
                height={96}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Rank Badge */}
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-600">#{user.rank}</span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{user.username}</h1>
            <p className="text-orange-100 text-sm md:text-base">
              {user.email.length > 30 ? user.email.slice(0, 25) + "..." : user.email}
            </p>

            {/* Points Badge */}
            <div className="mt-3">
              <Badge className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-3 py-1">
                <Star className="h-4 w-4 mr-1" />
                {user.points} Points
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 md:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-lg">🍽️</span>
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-orange-600">{user.meals_cooked}</p>
            <p className="text-xs md:text-sm text-gray-600 font-medium">Meals Cooked</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-lg">📝</span>
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-orange-600">{user.created_recipes}</p>
            <p className="text-xs md:text-sm text-gray-600 font-medium">Recipes Created</p>
          </div>
        </div>

        {/* Achievement Level */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <ChefHat className="h-6 w-6 text-orange-500 mr-2" />
            <span className="font-semibold text-gray-700">Chef Level</span>
          </div>
          <div className="text-lg font-bold text-orange-600">
            {user.rank <= 3
              ? "Master Chef"
              : user.rank <= 10
                ? "Expert Chef"
                : user.rank <= 50
                  ? "Skilled Chef"
                  : "Aspiring Chef"}
          </div>
          <p className="text-sm text-gray-500 mt-1">Rank #{user.rank} globally</p>
        </div>

        {/* Sign Out Button */}
        <Button
          onClick={signOutFromGoogle}
          variant="outline"
          className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 font-semibold bg-transparent"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  )
}
