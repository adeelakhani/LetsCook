"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronRight, Clock, Users, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import "@/styles/globals.css";
import Image from "next/image";

import { useRouter } from "next/navigation";

type Submission = {
  id: string;
  submitted_by_id: string;
  submitted_by_username: string;
  submitted_to_id: string;
  post_id: string;
  description: string;
  submitted_by_profile_url: string;
  created_at: string;
  difficulty: string;
  checked: boolean;
  dish_name: string;
};

type SubmissionsTable = {
  submissions: Submission[];
  description: string;
};

export default function SubmissionsTable({
  submissions,
  description,
}: SubmissionsTable) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const router = useRouter();

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.submitted_by_username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.dish_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Recipe Submissions
          </h1>
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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Recipe
                    </th>
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
                      <td
                        colSpan={3}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No submissions found.
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
                          router.push(
                            `/authenticated/user-submissions/${submission.id}`
                          );
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center mr-2">
                              <Image
                                src={submission.submitted_by_profile_url}
                                width={75}
                                height={75}
                                alt="GoogleIcon"
                                className="border rounded-lg self-start"
                              />
                            </div>
                            <span className="font-medium">
                              {submission.submitted_by_username}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="border-orange-200 text-orange-600 mr-2"
                            >
                              Recipe
                            </Badge>
                            {submission.dish_name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">
                              {new Date(submission.created_at).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric"
                                }
                              )}
                            </span>
                            <ChevronRight
                              className={`
                                ${
                                  hoveredIndex === index
                                    ? "text-orange-600 translate-x-1"
                                    : "text-gray-400"
                                } 
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

        {filteredSubmissions.length > 0 && (
          <div className="flex items-center justify-between mt-4 border-t border-orange-100 pt-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredSubmissions.length)} of{" "}
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-md border border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50"
              >
                <ChevronRight className="h-4 w-4 text-orange-600" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-orange-600">
                  {submissions.length}
                </p>
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
                <p className="text-2xl font-bold text-orange-600">
                  {
                    new Set(
                      submissions.map((item) => item.submitted_by_username)
                    ).size
                  }
                </p>
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
                  {new Set(submissions.map((item) => item.dish_name)).size}
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
            <span className="font-medium">
              Remember to mark submissions as complete!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
