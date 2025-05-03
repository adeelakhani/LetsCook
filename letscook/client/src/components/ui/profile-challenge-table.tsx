"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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

  return (
    <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
      <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-orange-800 flex items-center">
            <Award className="mr-2 h-6 w-6 text-orange-500" />
            My Recipes
          </h2>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-orange-200 focus:border-orange-400"
              />
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">Recipes you've created for others to try</p>
      </div>

      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-orange-100">
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
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                    {searchTerm ? "No recipes found matching your search." : "You haven't created any recipes yet."}
                  </td>
                </tr>
              ) : (
                currentItems.map((challenge, index) => (
                  <tr
                    key={index}
                    className={`border-b border-orange-50 hover:bg-orange-50 hover:cursor-pointer transition-colors ${
                      hoveredIndex === index ? "bg-orange-50" : ""
                    }`}
                    onClick={() => {
                        router.push(`/authenticated/submit/${challenge.id}`);
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Badge variant="outline" className="border-orange-200 text-orange-600 mr-2">
                          Recipe
                        </Badge>
                        {challenge.dish_name}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {challenge.difficulty === "easy" && <Badge className="bg-cyan-600 hover:bg-cyan-700">Easy</Badge>}
                      {challenge.difficulty === "medium" && (
                        <Badge className="bg-yellow-600 hover:bg-yellow-700">Medium</Badge>
                      )}
                      {challenge.difficulty === "hard" && <Badge className="bg-red-600 hover:bg-red-700">Hard</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end">
                        <span className="font-medium mr-2">
                          {challenge.difficulty === "easy"
                            ? 2
                            : challenge.difficulty === "medium"
                              ? 5
                              : challenge.difficulty === "hard"
                                ? 10
                                : 0}
                        </span>
                        <ChevronRight
                          className={`
                            ${hoveredIndex === index ? "text-orange-600 translate-x-1" : "text-gray-400"} 
                            transition-all duration-200
                          `}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredChallenges.length > 0 && (
          <div className="flex items-center justify-between mt-4 border-t border-orange-100 pt-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredChallenges.length)} of{" "}
              {filteredChallenges.length} recipes
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50"
              >
                <ChevronRight className="h-4 w-4 text-orange-600 transform rotate-180" />
              </button>
              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-md border border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50"
              >
                <ChevronRight className="h-4 w-4 text-orange-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
