"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Award, Star, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

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

interface ProfileChallengeTableProps {
  postsInfo: PostInfoType[]
}

export default function ProfileChallengeTable({ postsInfo }: ProfileChallengeTableProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const router = useRouter()

  // Filter challenges based on search term
  const filteredChallenges = postsInfo.filter(
    (challenge) =>
      challenge.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.dish_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.difficulty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
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
    <div className="w-full p-4 md:p-6">
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center mb-2">
              <Award className="mr-2 h-5 w-5 text-orange-500" />
              Your Recipe Creations
            </h3>
            <p className="text-sm text-gray-600">Recipes you've created for others to try</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-400 w-full"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Recipe</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    <div className="flex items-center justify-end">
                      <Star className="mr-1 h-4 w-4 text-orange-500" />
                      Points
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Award className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium mb-2">
                          {searchTerm ? "No recipes found" : "No recipes created yet"}
                        </p>
                        <p className="text-sm">
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Create your first recipe to inspire others!"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((challenge, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-orange-50 hover:cursor-pointer transition-all duration-200 ${
                        hoveredIndex === index ? "bg-orange-50" : ""
                      }`}
                      onClick={() => {
                        router.push(`/authenticated/submit/${challenge.id}`)
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Badge variant="outline" className="border-orange-200 text-orange-600 mr-3 text-xs">
                            Recipe
                          </Badge>
                          <span className="font-medium text-gray-900">{challenge.dish_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {challenge.difficulty === "easy" && (
                          <Badge className="bg-cyan-600 hover:bg-cyan-700 text-xs">Easy</Badge>
                        )}
                        {challenge.difficulty === "medium" && (
                          <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs">Medium</Badge>
                        )}
                        {challenge.difficulty === "hard" && (
                          <Badge className="bg-red-600 hover:bg-red-700 text-xs">Hard</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <span className="font-medium mr-2 text-orange-600">
                            {getPointsForDifficulty(challenge.difficulty)}
                          </span>
                          <ChevronRight
                            className={`h-4 w-4 transition-all duration-200 ${
                              hoveredIndex === index ? "text-orange-600 translate-x-1" : "text-gray-400"
                            }`}
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
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {currentItems.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2 text-gray-700">
              {searchTerm ? "No recipes found" : "No recipes created yet"}
            </p>
            <p className="text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "Create your first recipe to inspire others!"}
            </p>
          </div>
        ) : (
          currentItems.map((challenge, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-orange-300 transition-all duration-200 cursor-pointer"
              onClick={() => {
                router.push(`/authenticated/submit/${challenge.id}`)
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="border-orange-200 text-orange-600 mr-2 text-xs">
                      Recipe
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base leading-tight mb-1">{challenge.dish_name}</h4>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
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
                  <span className="font-semibold text-sm">{getPointsForDifficulty(challenge.difficulty)} pts</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredChallenges.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600 text-center sm:text-left">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredChallenges.length)} of{" "}
            {filteredChallenges.length} recipes
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
    </div>
  )
}
