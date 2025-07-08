"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Search, Trophy, Star, Award, TrendingUp, ChevronUp, ChevronDown, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthNav from "@/components/ui/authNav"

type Row = {
  username: string
  points: number
  meals_cooked: number
  created_recipes: number
  rank: number
  image_url: string
}

type LeaderboardTable = {
  elements: Row[]
}

export default function LeaderboardTable({ elements }: LeaderboardTable) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<keyof Pick<Row, "points" | "meals_cooked" | "created_recipes">>("points")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Filter leaderboard based on search term
  const filteredLeaderboard = elements.filter((chef) => chef.username.toLowerCase().includes(searchTerm.toLowerCase()))

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
  const handleSortBy = (criteria: keyof Pick<Row, "points" | "meals_cooked" | "created_recipes">) => {
    if (sortBy === criteria) {
      toggleSortOrder()
    } else {
      setSortBy(criteria)
      setSortOrder("desc")
    }
  }

  // Safely navigate to user profiles
  const navigateToProfile = (username: string) => {
    try {
      router.push(`/users/${username}`)
    } catch (error) {
      console.error("Navigation error:", error)
      window.location.href = `/users/${username}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <AuthNav highlight="Leaderboard" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-4">Master Chef Leaderboard</h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
            Discover the top culinary talents in our community. Will you be the next Master Chef?
          </p>
        </div>

        {/* Top Chefs Podium */}
        <div className="mb-8 md:mb-12 bg-white rounded-xl p-4 md:p-6 shadow-md border border-orange-200">
          <h2 className="text-xl md:text-2xl font-bold text-orange-800 mb-4 md:mb-6 flex items-center">
            <Trophy className="mr-2 h-5 w-5 md:h-6 md:w-6 text-orange-500" />
            Top Chefs Podium
          </h2>

          {/* Mobile Layout */}
          <div className="sm:hidden">
            <div className="space-y-4">
              {/* First Place - Mobile */}
              {topThreeChefs[0] && (
                <div className="flex items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border-2 border-yellow-300">
                  <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">👑</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="text-2xl mr-2">🥇</span>
                      <span className="text-lg font-bold text-gray-800">1st Place</span>
                    </div>
                    <p className="font-bold text-gray-900 truncate">{topThreeChefs[0].username}</p>
                    <p className="text-sm text-gray-600">{topThreeChefs[0].points} points</p>
                  </div>
                </div>
              )}

              {/* Second Place - Mobile */}
              {topThreeChefs[1] && (
                <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-300">
                  <div className="relative w-14 h-14 mr-4 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xl">🥈</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="text-xl mr-2">🥈</span>
                      <span className="text-base font-bold text-gray-800">2nd Place</span>
                    </div>
                    <p className="font-bold text-gray-900 truncate">{topThreeChefs[1].username}</p>
                    <p className="text-sm text-gray-600">{topThreeChefs[1].points} points</p>
                  </div>
                </div>
              )}

              {/* Third Place - Mobile */}
              {topThreeChefs[2] && (
                <div className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border-2 border-amber-300">
                  <div className="relative w-12 h-12 mr-4 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-lg">🥉</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="text-lg mr-2">🥉</span>
                      <span className="text-base font-bold text-gray-800">3rd Place</span>
                    </div>
                    <p className="font-bold text-gray-900 truncate">{topThreeChefs[2].username}</p>
                    <p className="text-sm text-gray-600">{topThreeChefs[2].points} points</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex justify-center items-end space-x-4">
            {/* Second Place */}
            {topThreeChefs[1] && (
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xl md:text-2xl">🥈</span>
                  </div>
                </div>
                <div className="h-24 md:h-28 w-full max-w-[100px] md:max-w-[120px] bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg flex items-end justify-center pb-2">
                  <div className="text-center">
                    <p className="font-bold text-gray-800 text-sm md:text-base truncate px-1">
                      {topThreeChefs[1].username}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">{topThreeChefs[1].points} pts</p>
                  </div>
                </div>
              </div>
            )}

            {/* First Place */}
            {topThreeChefs[0] && (
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl">👑</span>
                  </div>
                </div>
                <div className="h-28 md:h-32 w-full max-w-[120px] md:max-w-[140px] bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg flex items-end justify-center pb-2">
                  <div className="text-center">
                    <p className="font-bold text-gray-800 text-sm md:text-base truncate px-1">
                      {topThreeChefs[0].username}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">{topThreeChefs[0].points} pts</p>
                  </div>
                </div>
              </div>
            )}

            {/* Third Place */}
            {topThreeChefs[2] && (
              <div className="flex flex-col items-center">
                <div className="relative w-14 h-14 md:w-16 md:h-16 mb-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lg md:text-xl">🥉</span>
                  </div>
                </div>
                <div className="h-20 md:h-24 w-full max-w-[90px] md:max-w-[100px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg flex items-end justify-center pb-2">
                  <div className="text-center">
                    <p className="font-bold text-gray-800 text-sm truncate px-1">{topThreeChefs[2].username}</p>
                    <p className="text-xs text-gray-600">{topThreeChefs[2].points} pts</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Leaderboard Table Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <h2 className="text-xl md:text-2xl font-bold text-orange-800 flex items-center">
                      <Award className="mr-2 h-5 w-5 md:h-6 md:w-6 text-orange-500" />
                      Leaderboard Rankings
                    </h2>
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search chefs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 border-orange-200 focus:border-orange-400 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all-time" className="w-full">
                <TabsContent value="all-time" className="m-0">
                  {/* Desktop Table View */}
                  <div className="hidden md:block p-4">
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
                              onClick={() => navigateToProfile(chef.username)}
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
                                    {chef.username.charAt(0).toUpperCase()}
                                  </div>
                                  <span className={chef.rank <= 3 ? "font-semibold" : ""}>{chef.username}</span>
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

                  {/* Mobile Card View */}
                  <div className="md:hidden">
                    {sortedLeaderboard.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">No chefs found matching your search.</div>
                    ) : (
                      <div className="divide-y divide-orange-100">
                        {sortedLeaderboard.map((chef, index) => (
                          <div
                            key={index}
                            className={`p-4 hover:bg-orange-50 active:bg-orange-100 transition-colors cursor-pointer ${
                              chef.rank <= 3 ? "bg-orange-50" : ""
                            }`}
                            onClick={() => navigateToProfile(chef.username)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="flex items-center mr-3">
                                  {chef.rank === 1 && <span className="mr-1 text-lg">🥇</span>}
                                  {chef.rank === 2 && <span className="mr-1 text-lg">🥈</span>}
                                  {chef.rank === 3 && <span className="mr-1 text-lg">🥉</span>}
                                  <span className={`text-lg ${chef.rank <= 3 ? "font-bold" : "font-medium"}`}>
                                    #{chef.rank}
                                  </span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center mr-3 flex-shrink-0">
                                  {chef.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p
                                    className={`text-gray-900 truncate ${chef.rank <= 3 ? "font-semibold" : "font-medium"}`}
                                  >
                                    {chef.username}
                                  </p>
                                  <p className="text-sm text-gray-500">Chef</p>
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <Badge
                                  variant={chef.rank <= 3 ? "default" : "outline"}
                                  className={`text-xs ${
                                    chef.rank <= 3 ? "bg-orange-500" : "border-orange-200 text-orange-600"
                                  }`}
                                >
                                  {chef.points} pts
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">Points</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{chef.meals_cooked}</p>
                                <p className="text-xs text-gray-500">Meals</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{chef.created_recipes}</p>
                                <p className="text-xs text-gray-500">Recipes</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-4 md:space-y-6">
            {/* Community Stats */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-lg md:text-xl font-bold text-orange-800 flex items-center">
                  <Star className="mr-2 h-4 w-4 md:h-5 md:w-5 text-orange-500" />
                  Community Stats
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">Total Points Earned</p>
                    <p className="text-2xl md:text-3xl font-bold text-orange-600">
                      {totalStats.points.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-lg p-3 md:p-4 text-center">
                      <p className="text-xs md:text-sm text-gray-600">Meals Cooked</p>
                      <p className="text-lg md:text-2xl font-bold text-orange-600">
                        {totalStats.meals_cooked.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 md:p-4 text-center">
                      <p className="text-xs md:text-sm text-gray-600">Recipes Created</p>
                      <p className="text-lg md:text-2xl font-bold text-orange-600">
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
                <h2 className="text-lg md:text-xl font-bold text-orange-800 flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 md:h-5 md:w-5 text-orange-500" />
                  Chef Spotlight
                </h2>
              </div>
              <div className="p-4">
                {elements.length > 0 ? (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-100 border-4 border-orange-300 flex items-center justify-center mb-4">
                      <span className="text-2xl md:text-3xl">{elements[0].username.charAt(0).toUpperCase()}</span>
                    </div>
                    <h3 className="font-bold text-base md:text-lg text-gray-800">{elements[0].username}</h3>
                    <p className="text-orange-600 font-semibold text-sm md:text-base">Current #1 Chef</p>
                    <div className="mt-4 grid grid-cols-3 w-full gap-2 text-center">
                      <div>
                        <p className="text-xs md:text-sm text-gray-600">Points</p>
                        <p className="font-bold text-gray-800 text-sm md:text-base">{elements[0].points}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-600">Meals</p>
                        <p className="font-bold text-gray-800 text-sm md:text-base">{elements[0].meals_cooked}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-600">Recipes</p>
                        <p className="font-bold text-gray-800 text-sm md:text-base">{elements[0].created_recipes}</p>
                      </div>
                    </div>
                    <div className="mt-4 w-full">
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700 text-sm md:text-base"
                        onClick={() => navigateToProfile(elements[0].username)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 text-gray-500">No chef data available</div>
                )}
              </div>
            </Card>

            {/* How to Climb */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-lg md:text-xl font-bold text-orange-800">How to Climb the Ranks</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-sm">🍳</span>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base">
                      <span className="font-semibold">Cook Recipes</span> - Earn 2, 5, or 10 points for each meal you
                      cook
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-sm">📝</span>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base">
                      <span className="font-semibold">Create Recipes</span> - Earn points everytime someone cooks your
                      recipe
                    </p>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link href="/authenticated/challenges">
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 text-sm md:text-base bg-transparent"
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
