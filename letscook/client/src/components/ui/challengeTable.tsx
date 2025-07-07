"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronRight, Award, BookOpen, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type ChallengeTable = {
  postsInfo: PostInfoType[]
  description: string
}

type PostInfoType = {
  id: string
  user_id: string
  username: string
  dish_name: string
  difficulty: string
  description: string
  profile_url: string
  created_at: string
}

export default function ChallengeTable({ postsInfo, description }: ChallengeTable) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const router = useRouter()

  const filteredChallenges = postsInfo.filter(
    (challenge) =>
      challenge.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.dish_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.difficulty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredChallenges.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage)

  const getPointsForDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return 2
      case "medium":
        return 5
      case "hard":
        return 10
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-4">Recipe Challenges</h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
            Test your culinary skills with these exciting recipe challenges.
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
          {/* Card Header */}
          <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-orange-800 flex items-center">
                  <Award className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                  Challenges
                </h2>
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search challenges..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 border-orange-200 focus:border-orange-400 w-full"
                    />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Author</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Recipe</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Difficulty</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                      <div className="flex items-center justify-end">
                        <Star className="mr-1 h-4 w-4 text-orange-500" />
                        Points
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChallenges.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                        No challenges found matching your search.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((challenge, index) => (
                      <tr
                        key={index}
                        className={`border-b border-orange-50 hover:bg-orange-50 hover:cursor-pointer transition-colors ${
                          hoveredIndex === index ? "bg-orange-50" : ""
                        }`}
                        onClick={() => router.push(`/authenticated/submit/${challenge.id}`)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center mr-2 overflow-hidden">
                              <Image
                                src={challenge.profile_url || "/placeholder.svg?height=32&width=32"}
                                width={32}
                                height={32}
                                alt="Profile"
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{challenge.username}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Badge variant="outline" className="border-orange-200 text-orange-600 mr-2">
                              Recipe
                            </Badge>
                            {challenge.dish_name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {challenge.difficulty === "easy" && (
                            <Badge className="bg-cyan-600 hover:bg-cyan-700">Easy</Badge>
                          )}
                          {challenge.difficulty === "medium" && (
                            <Badge className="bg-yellow-600 hover:bg-yellow-700">Medium</Badge>
                          )}
                          {challenge.difficulty === "hard" && (
                            <Badge className="bg-red-600 hover:bg-red-700">Hard</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end">
                            <span className="font-medium mr-2">{getPointsForDifficulty(challenge.difficulty)}</span>
                            <ChevronRight
                              className={`${
                                hoveredIndex === index ? "text-orange-600 translate-x-1" : "text-gray-400"
                              } transition-all duration-200`}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {filteredChallenges.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No challenges found matching your search.</div>
            ) : (
              <div className="divide-y divide-orange-100">
                {currentItems.map((challenge, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-orange-50 active:bg-orange-100 transition-colors cursor-pointer"
                    onClick={() => router.push(`/authenticated/submit/${challenge.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center mr-3 overflow-hidden flex-shrink-0">
                          <Image
                            src={challenge.profile_url || "/placeholder.svg?height=40&width=40"}
                            width={40}
                            height={40}
                            alt="Profile"
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{challenge.username}</p>
                          <p className="text-sm text-gray-500">Author</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="border-orange-200 text-orange-600 mr-2 text-xs">
                          Recipe
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base leading-tight">{challenge.dish_name}</h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {challenge.difficulty === "easy" && (
                          <Badge className="bg-cyan-600 hover:bg-cyan-700 text-xs">Easy</Badge>
                        )}
                        {challenge.difficulty === "medium" && (
                          <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs">Medium</Badge>
                        )}
                        {challenge.difficulty === "hard" && (
                          <Badge className="bg-red-600 hover:bg-red-700 text-xs">Hard</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-orange-600">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="font-semibold text-sm">
                          {getPointsForDifficulty(challenge.difficulty)} pts
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Pagination */}
        {filteredChallenges.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 border-t border-orange-100 pt-4 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600 text-center sm:text-left">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredChallenges.length)} of{" "}
              {filteredChallenges.length} challenges
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-orange-600 transform rotate-180" />
              </button>
              <span className="text-sm font-medium text-gray-700 px-2">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-md border border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-orange-600" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Challenges</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">{postsInfo.length}</p>
              </div>
              <div className="bg-orange-100 p-2 md:p-3 rounded-full">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              </div>
            </div>
          </Card>
          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unique Authors</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">
                  {new Set(postsInfo.map((item) => item.username)).size}
                </p>
              </div>
              <div className="bg-orange-100 p-2 md:p-3 rounded-full">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              </div>
            </div>
          </Card>
          <Card className="bg-white shadow-md border border-orange-200 p-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Max Points Available</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">
                  {postsInfo.reduce((total, item) => total + getPointsForDifficulty(item.difficulty), 0)}
                </p>
              </div>
              <div className="bg-orange-100 p-2 md:p-3 rounded-full">
                <Star className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-6 md:mt-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg shadow-sm border border-orange-200">
            <span className="h-3 w-3 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="font-medium text-sm sm:text-base">Complete challenges to earn points and badges!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
