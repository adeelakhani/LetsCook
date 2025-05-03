"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronRight, Clock, BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

type Submission = {
  id: string
  submitted_by_id: string
  submitted_by_username: string
  submitted_to_id: string
  post_id: string
  description: string
  submitted_by_profile_url: string
  created_at: string
  difficulty: string
  checked: boolean
  dish_name: string
}

interface ProfileSubmissionsTableProps {
  submissions: Submission[]
}

export default function ProfileSubmissionsTable({ submissions }: ProfileSubmissionsTableProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const router = useRouter()

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.dish_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.difficulty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage)

  return (
    <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
      <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-orange-800 flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-orange-500" />
            My Submissions
          </h2>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-orange-200 focus:border-orange-400"
              />
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">Recipes you've submitted to other chefs</p>
      </div>

      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-orange-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Recipe</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Difficulty</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-orange-500" />
                    Submission Date
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                    {searchTerm
                      ? "No submissions found matching your search."
                      : "You haven't made any submissions yet."}
                  </td>
                </tr>
              ) : (
                currentItems.map((submission, index) => (
                  <tr
                    key={index}
                    className={`border-b border-orange-50 hover:bg-orange-50 hover:cursor-pointer transition-colors ${
                      hoveredIndex === index ? "bg-orange-50" : ""
                    }`}
                    onClick={() => {
                      router.push(`/authenticated/user-submissions/${submission.id}`)
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Badge variant="outline" className="border-orange-200 text-orange-600 mr-2">
                          Recipe
                        </Badge>
                        {submission.dish_name}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {submission.difficulty === "easy" && (
                        <Badge className="bg-cyan-600 hover:bg-cyan-700">Easy</Badge>
                      )}
                      {submission.difficulty === "medium" && (
                        <Badge className="bg-yellow-600 hover:bg-yellow-700">Medium</Badge>
                      )}
                      {submission.difficulty === "hard" && <Badge className="bg-red-600 hover:bg-red-700">Hard</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                          {new Date(submission.created_at).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
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

        {filteredSubmissions.length > 0 && (
          <div className="flex items-center justify-between mt-4 border-t border-orange-100 pt-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredSubmissions.length)} of{" "}
              {filteredSubmissions.length} submissions
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
