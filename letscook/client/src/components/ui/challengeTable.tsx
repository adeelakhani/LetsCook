"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronRight, Award, BookOpen, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

import "@/styles/globals.css";

import { useRouter } from "next/navigation";

type ChallengeTable = {
  this_user_id: string;
  postsInfo: PostInfoType[];
  description: string;
};
type PostInfoType = {
  id: string;
  user_id: string;
  username: string;
  dish_name: string;
  difficulty: string;
  description: string;
  profile_url: string;
  created_at: string;
};

export default function ChallengeTable({
  this_user_id,
  postsInfo,
  description,
}: ChallengeTable) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Filter challenges based on search term
  const filteredChallenges = postsInfo.filter(
    (challenge) =>
      challenge.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.dish_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(this_user_id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Recipe Challenges
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Test your culinary skills with these exciting recipe challenges.
          </p>
        </div>

        {/* Main Content */}
        <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
          <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-orange-800 flex items-center">
                <Award className="mr-2 h-6 w-6 text-orange-500" />
                Challenges
              </h2>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search challenges..."
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
                      Author
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Recipe
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Difficulty
                    </th>
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
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No challenges found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredChallenges.map((challenge, index) => (
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
                            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center mr-2">
                              <Image
                                src={challenge.profile_url}
                                width={75}
                                height={75}
                                alt="GoogleIcon"
                                className="border rounded-lg self-start"
                              />
                            </div>
                            <span className="font-medium">
                              {challenge.username}
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
                            {challenge.dish_name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {challenge.difficulty === "easy" && (
                            <Badge className="bg-cyan-600 hover:bg-cyan-700">
                              Easy
                            </Badge>
                          )}
                          {challenge.difficulty === "medium" && (
                            <Badge className="bg-yellow-600 hover:bg-yellow-700">
                              Medium
                            </Badge>
                          )}
                          {challenge.difficulty === "hard" && (
                            <Badge className="bg-red-600 hover:bg-red-700">
                              Hard
                            </Badge>
                          )}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Challenges</p>
                <p className="text-2xl font-bold text-orange-600">
                  {postsInfo.length}
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
                <p className="text-sm text-gray-600">Unique Authors</p>
                <p className="text-2xl font-bold text-orange-600">
                  {new Set(postsInfo.map((item) => item.username)).size}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-md border border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Max Points Available</p>
                <p className="text-2xl font-bold text-orange-600">
                  {postsInfo.reduce(
                    (total, item) =>
                      total +
                      (item.difficulty === "easy"
                        ? 2
                        : item.difficulty === "medium"
                        ? 5
                        : item.difficulty === "hard"
                        ? 10
                        : 0),
                    0
                  )}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Reminder */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg shadow-sm border border-orange-200">
            <span className="h-3 w-3 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="font-medium">
              Complete challenges to earn points and badges!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
