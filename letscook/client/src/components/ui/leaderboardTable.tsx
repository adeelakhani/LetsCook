"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Trophy, Star, Award, TrendingUp, Filter, ChevronUp, ChevronDown } from "lucide-react"
import { useRouter } from 'next/navigation';
import Link from "next/link"
import AuthNav from "@/components/ui/authNav"

import { createClientForServer } from "@/utils/supabase/supabaseClient";
import axios from 'axios';

type Row = {
    rank: number,
    user: string, 
    points: number,
    meals_cooked: number, 
    created_recipes: number
}

type LeaderboardTable = {
    elements: Row[]
}

export default function LeaderboardTable({ elements }: LeaderboardTable) {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("all-time")
    const [sortBy, setSortBy] = useState("points")
    const [sortOrder, setSortOrder] = useState("desc")
  
    // Filter leaderboard based on search term
    const filteredLeaderboard = elements.filter((chef) => chef.user.toLowerCase().includes(searchTerm.toLowerCase()))
  
    // Sort leaderboard based on selected criteria
    const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => {
      const multiplier = sortOrder === "desc" ? -1 : 1
      return multiplier * (a[sortBy] - b[sortBy])
    })
  
    // Get top 3 chefs for the podium
    const topThreeChefs = elements.slice(0, 3)
  
    // Calculate total stats
    const totalStats = elements.reduce(
      (acc, chef) => {
        acc.points += chef.points
        acc.meals_cooked += chef.meals_cooked
        acc.created_recipes += chef.created_recipes
        return acc
      },
      { points: 0, meals_cooked: 0, created_recipes: 0 },
    )
  
    // Toggle sort order
    const toggleSortOrder = () => {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc")
    }
  
    // Set sort criteria
    const handleSortBy = (criteria : any) => {
      if (sortBy === criteria) {
        toggleSortOrder()
      } else {
        setSortBy(criteria)
        setSortOrder("desc")
      }
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <AuthNav highlight="Leaderboard" />
  
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">Master Chef Leaderboard</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover the top culinary talents in our community. Will you be the next Master Chef?
            </p>
          </div>
  
          {/* Top Chefs Podium */}
          <div className="mb-12 bg-white rounded-xl p-6 shadow-md border border-orange-200">
            <h2 className="text-2xl font-bold text-orange-800 mb-6 flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-orange-500" />
              Top Chefs Podium
            </h2>
  
            <div className="flex flex-col md:flex-row justify-center items-end space-y-6 md:space-y-0 md:space-x-4">
              {/* Second Place */}
              {topThreeChefs[1] && (
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">🥈</span>
                    </div>
                  </div>
                  <div className="h-28 md:h-32 w-full max-w-[120px] bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg flex items-end justify-center pb-2">
                    <div className="text-center">
                      <p className="font-bold text-gray-800">{topThreeChefs[1].user}</p>
                      <p className="text-sm text-gray-600">{topThreeChefs[1].points} pts</p>
                    </div>
                  </div>
                </div>
              )}
  
              {/* First Place */}
              {topThreeChefs[0] && (
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-pulse-slow"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-3xl">👑</span>
                    </div>
                  </div>
                  <div className="h-36 md:h-40 w-full max-w-[140px] bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg flex items-end justify-center pb-2">
                    <div className="text-center">
                      <p className="font-bold text-gray-800">{topThreeChefs[0].user}</p>
                      <p className="text-sm text-gray-600">{topThreeChefs[0].points} pts</p>
                    </div>
                  </div>
                </div>
              )}
  
              {/* Third Place */}
              {topThreeChefs[2] && (
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xl">🥉</span>
                    </div>
                  </div>
                  <div className="h-24 md:h-28 w-full max-w-[100px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg flex items-end justify-center pb-2">
                    <div className="text-center">
                      <p className="font-bold text-gray-800">{topThreeChefs[2].user}</p>
                      <p className="text-sm text-gray-600">{topThreeChefs[2].points} pts</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
  
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Leaderboard Table Section */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
                <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <h2 className="text-2xl font-bold text-orange-800 flex items-center">
                      <Award className="mr-2 h-6 w-6 text-orange-500" />
                      Leaderboard Rankings
                    </h2>
  
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search chefs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 border-orange-200 focus:border-orange-400"
                        />
                      </div>
                      <Button variant="outline" size="icon" className="border-orange-200 text-orange-600">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
  
                <Tabs defaultValue="all-time" className="w-full" onValueChange={setActiveTab}>  
                  <TabsContent value="all-time" className="m-0">
                    <div className="p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-orange-100">
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rank</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Chef</th>
                              <th
                                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                                onClick={() => handleSortBy("points")}
                              >
                                <div className="flex items-center">
                                  Points
                                  {sortBy === "points" &&
                                    (sortOrder === "desc" ? (
                                      <ChevronDown className="ml-1 h-4 w-4" />
                                    ) : (
                                      <ChevronUp className="ml-1 h-4 w-4" />
                                    ))}
                                </div>
                              </th>
                              <th
                                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                                onClick={() => handleSortBy("meals_cooked")}
                              >
                                <div className="flex items-center">
                                  Meals Cooked
                                  {sortBy === "meals_cooked" &&
                                    (sortOrder === "desc" ? (
                                      <ChevronDown className="ml-1 h-4 w-4" />
                                    ) : (
                                      <ChevronUp className="ml-1 h-4 w-4" />
                                    ))}
                                </div>
                              </th>
                              <th
                                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                                onClick={() => handleSortBy("created_recipes")}
                              >
                                <div className="flex items-center">
                                  Recipes Created
                                  {sortBy === "created_recipes" &&
                                    (sortOrder === "desc" ? (
                                      <ChevronDown className="ml-1 h-4 w-4" />
                                    ) : (
                                      <ChevronUp className="ml-1 h-4 w-4" />
                                    ))}
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedLeaderboard.map((chef, index) => (
                              <tr
                                key={index}
                                className={`border-b border-orange-50 hover:bg-orange-50 hover:cursor-pointer transition-colors ${
                                  chef.rank <= 3 ? "bg-orange-50" : ""
                                }`}
                                onClick={() => router.push(`/users/${chef.user}`)}
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center">
                                    {chef.rank === 1 && <span className="mr-1">🥇</span>}
                                    {chef.rank === 2 && <span className="mr-1">🥈</span>}
                                    {chef.rank === 3 && <span className="mr-1">🥉</span>}
                                    <span className={chef.rank <= 3 ? "font-bold" : ""}>{chef.rank}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center mr-2">
                                      {chef.user.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={chef.rank <= 3 ? "font-semibold" : ""}>{chef.user}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant={chef.rank <= 3 ? "default" : "outline"}
                                    className={chef.rank <= 3 ? "bg-orange-500" : "border-orange-200 text-orange-600"}
                                  >
                                    {chef.points}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3">{chef.meals_cooked}</td>
                                <td className="px-4 py-3">{chef.created_recipes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
  
                  <TabsContent value="this-month" className="m-0">
                    <div className="p-8 text-center text-gray-500">Monthly leaderboard data will be available soon!</div>
                  </TabsContent>
  
                  <TabsContent value="this-week" className="m-0">
                    <div className="p-8 text-center text-gray-500">Weekly leaderboard data will be available soon!</div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
  
            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
              {/* Community Stats */}
              <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
                <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                  <h2 className="text-xl font-bold text-orange-800 flex items-center">
                    <Star className="mr-2 h-5 w-5 text-orange-500" />
                    Community Stats
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600">Total Points Earned</p>
                      <p className="text-3xl font-bold text-orange-600">{totalStats.points.toLocaleString()}</p>
                    </div>
  
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-600">Meals Cooked</p>
                        <p className="text-2xl font-bold text-orange-600">{totalStats.meals_cooked.toLocaleString()}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-600">Recipes Created</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {totalStats.created_recipes.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
  
              {/* Chef Spotlight */}
              <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
                <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                  <h2 className="text-xl font-bold text-orange-800 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                    Chef Spotlight
                  </h2>
                </div>
                <div className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-orange-100 border-4 border-orange-300 flex items-center justify-center mb-4">
                      <span className="text-3xl">👨‍🍳</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">{elements[0].user}</h3>
                    <p className="text-orange-600 font-semibold">Current #1 Chef</p>
                    <div className="mt-4 grid grid-cols-3 w-full gap-2 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Points</p>
                        <p className="font-bold text-gray-800">{elements[0].points}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Meals</p>
                        <p className="font-bold text-gray-800">{elements[0].meals_cooked}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Recipes</p>
                        <p className="font-bold text-gray-800">{elements[0].created_recipes}</p>
                      </div>
                    </div>
                    <div className="mt-4 w-full">
                      <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => router.push(`/users/${elements[0].user}`)}
                      >View Profile</Button>
                    </div>
                  </div>
                </div>
              </Card>
  
              {/* How to Climb */}
              <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
                <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                  <h2 className="text-xl font-bold text-orange-800">How to Climb the Ranks</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                        <span className="text-sm">🍳</span>
                      </div>
                      <p className="text-gray-700">
                        <span className="font-semibold">Cook Recipes</span> - Earn 2, 5, or 10 points for each meal you cook
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                        <span className="text-sm">📝</span>
                      </div>
                      <p className="text-gray-700">
                        <span className="font-semibold">Create Recipes</span> - Earn points everytime someone cooks your recipe
                      </p>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/authenticated/challenges">
                      <Button 
                      variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        Start Cooking
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        </div>
      )
}