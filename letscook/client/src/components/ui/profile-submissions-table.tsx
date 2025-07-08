"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Clock, BookOpen, Search, Calendar } from "lucide-react"
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
    <div className="w-full p-4 md:p-6">
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center mb-2">
              <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
              Your Cooking Submissions
            </h3>
            <p className="text-sm text-gray-600">Recipes you've submitted to other chefs</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search submissions..."
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-orange-500" />
                      Submission Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium mb-2">
                          {searchTerm ? "No submissions found" : "No submissions yet"}
                        </p>
                        <p className="text-sm">
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Start cooking to see your submissions here!"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((submission, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-orange-50 hover:cursor-pointer transition-all duration-200 ${
                        hoveredIndex === index ? "bg-orange-50" : ""
                      }`}
                      onClick={() => {
                        router.push(`/authenticated/user-submissions/${submission.id}`)
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Badge variant="outline" className="border-orange-200 text-orange-600 mr-3 text-xs">
                            Recipe
                          </Badge>
                          <span className="font-medium text-gray-900">{submission.dish_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {submission.difficulty === "easy" && (
                          <Badge className="bg-cyan-600 hover:bg-cyan-700 text-xs">Easy</Badge>
                        )}
                        {submission.difficulty === "medium" && (
                          <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs">Medium</Badge>
                        )}
                        {submission.difficulty === "hard" && (
                          <Badge className="bg-red-600 hover:bg-red-700 text-xs">Hard</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">
                            {new Date(submission.created_at).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
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
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2 text-gray-700">
              {searchTerm ? "No submissions found" : "No submissions yet"}
            </p>
            <p className="text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "Start cooking to see your submissions here!"}
            </p>
          </div>
        ) : (
          currentItems.map((submission, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-orange-300 transition-all duration-200 cursor-pointer"
              onClick={() => {
                router.push(`/authenticated/user-submissions/${submission.id}`)
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="border-orange-200 text-orange-600 mr-2 text-xs">
                      Recipe
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base leading-tight mb-1">{submission.dish_name}</h4>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {submission.difficulty === "easy" && (
                    <Badge className="bg-cyan-600 hover:bg-cyan-700 text-xs">Easy</Badge>
                  )}
                  {submission.difficulty === "medium" && (
                    <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs">Medium</Badge>
                  )}
                  {submission.difficulty === "hard" && (
                    <Badge className="bg-red-600 hover:bg-red-700 text-xs">Hard</Badge>
                  )}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(submission.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredSubmissions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600 text-center sm:text-left">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredSubmissions.length)} of{" "}
            {filteredSubmissions.length} submissions
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
