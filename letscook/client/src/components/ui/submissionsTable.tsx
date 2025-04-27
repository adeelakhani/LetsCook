"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronRight, Clock, Users, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import "@/styles/globals.css"

import { useRouter } from "next/navigation"

type Row = {
  user: string
  recipe: string
  submission_time: Date
}

type SubmissionsTable = {
  elements: Row[]
  description: string
}

export default function SubmissionsTable({ elements, description }: SubmissionsTable) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Filter submissions based on search term
  const filteredSubmissions = elements.filter(
    (submission) =>
      submission.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.recipe.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date to be more readable
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return date.toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">Recipe Submissions</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Track all recipe submissions from our community chefs.
          </p>
        </div>

        {/* Main Content */}
        <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
          <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-orange-800 flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-orange-500" />
                Submissions
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
            <p className="text-gray-600 text-sm mt-2">{description}</p>
          </div>

          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Recipe</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-orange-500" />
                        Submission Time
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                        No submissions found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((submission, index) => (
                      <tr
                        key={index}
                        className={`border-b border-orange-50 hover:bg-orange-50 hover:cursor-pointer transition-colors ${
                          hoveredIndex === index ? "bg-orange-50" : ""
                        }`}
                        onClick={() => {
                          router.push(
                            `/authenticated/user-submissions/${submission.recipe.replaceAll(" ", "-")}_${submission.user}`,
                          )
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center mr-2">
                              {submission.user.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{submission.user}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Badge variant="outline" className="border-orange-200 text-orange-600 mr-2">
                              Recipe
                            </Badge>
                            {submission.recipe}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">{formatDate(submission.submission_time)}</span>
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
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-orange-600">{elements.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unique Chefs</p>
                <p className="text-2xl font-bold text-orange-600">{new Set(elements.map((item) => item.user)).size}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unique Recipes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {new Set(elements.map((item) => item.recipe)).size}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Reminder */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg shadow-sm border border-orange-200">
            <span className="h-3 w-3 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="font-medium">Remember to mark submissions as complete!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
