"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  Clock,
  User,
  Camera,
  BookOpen,
  CheckCircle2,
  X,
  Check,
  Award,
  Loader2,
  Trash2,
} from "lucide-react"
import axios from "axios"

type PostInfo = {
  id: string
  user_id: string
  username: string
  dish_name: string
  difficulty?: string
  description: string
  profile_url: string
  created_at: string
  images: string[]
}

type SubmissionInfo = {
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
  images: string[]
}

interface UserSubmitSubProps {
  this_user_id: string
  token: string
  postData: { newObj: PostInfo } | PostInfo
  submissionData: { newObj: SubmissionInfo }
}

export default function UserSubmitSub({ this_user_id, token, postData, submissionData }: UserSubmitSubProps) {
  const router = useRouter()
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const post = "newObj" in postData ? postData.newObj : postData
  const submission = submissionData.newObj

  const isOwnSubmission = this_user_id === submission.submitted_by_id

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return "bg-gray-700"

    const difficultyLower = difficulty.toLowerCase()
    if (difficultyLower === "easy") return "bg-cyan-700"
    if (difficultyLower === "medium") return "bg-yellow-700"
    return "bg-red-700"
  }

  const getDifficultyPoints = (difficulty?: string) => {
    if (!difficulty) return "0"

    const difficultyLower = difficulty.toLowerCase()
    if (difficultyLower === "easy") return "2"
    if (difficultyLower === "medium") return "5"
    return "10"
  }

  const handleApproveSubmission = async () => {
    setIsApproving(true)
    try {
      const response = await axios.post(`http://localhost:3001/api/approveSubmission/${submission.id}`, submission, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        alert("Submission approved successfully!")
        router.push("/authenticated/submissions")
      } else {
        router.push("/authenticated/submissions")
      }
    } catch (error) {
      console.error("Error approving submission:", error)
      alert("Failed to approve submission. Please try again.")
    } finally {
      setIsApproving(false)
    }
  }

  const handleRejectSubmission = async () => {
    setIsRejecting(true)
    try {
      const response = await axios.patch(`http://localhost:3001/api/rejectSubmission/${submission.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.status === 200) {
        alert("Submission rejected successfully!")
        router.push("/authenticated/submissions")
      } else {
        throw new Error("Failed to reject submission")
      }
    } catch (error) {
      console.error("Error rejecting submission:", error)
      alert("Failed to reject submission. Please try again.")
    } finally {
      setIsRejecting(false)
    }
  }

  const handleDeleteSubmission = async () => {
    if (confirm("Are you sure you want to delete this submission? This action cannot be undone.")) {
      setIsDeleting(true)
      try {
        const response = await axios.delete(`http://localhost:3001/api/deleteSubmission/${submission.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.status === 200) {
          alert("Submission deleted successfully!")
          router.push("/authenticated/profile")
        } else {
          throw new Error("Failed to delete submission")
        }
      } catch (error) {
        console.error("Error deleting submission:", error)
        alert("Failed to delete submission. Please try again.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-orange-600 hover:text-orange-800 hover:bg-orange-100 -ml-2"
            onClick={() => router.push("/authenticated/submissions")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Submissions
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {isOwnSubmission ? "Your Submission" : "Submission Review"}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{submission.dish_name}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>Submitted by </span>
            <Link
              href={`/users/${submission.submitted_by_username}`}
              className="text-orange-600 hover:underline font-medium"
            >
              {submission.submitted_by_username}
            </Link>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4" />
            <span>{formatDate(submission.created_at)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
            <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                  Original Recipe
                </h2>
                <Badge className={getDifficultyColor(post.difficulty)}>{post.difficulty || "Unknown"}</Badge>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-10 h-10 mr-3">
                  <Image
                    src={post.profile_url || "/placeholder.svg"}
                    alt={post.username}
                    fill
                    className="rounded-full object-cover border-2 border-orange-200"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{post.username}</h3>
                  <p className="text-xs text-gray-500">Created on {formatDate(post.created_at)}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{post.description}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Camera className="h-4 w-4 mr-1 text-orange-500" />
                  Original Photos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {post.images &&
                    post.images.map((imageUrl, index) => (
                      <div
                        key={`original-${index}`}
                        className="relative aspect-square rounded-md overflow-hidden border border-orange-200 shadow-sm"
                      >
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={`${post.dish_name} - image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
            <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                  Submission
                </h2>
                <Badge className={getDifficultyColor(submission.difficulty)}>
                  {submission.difficulty || "Unknown"}
                </Badge>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-10 h-10 mr-3">
                  <Image
                    src={submission.submitted_by_profile_url || "/placeholder.svg"}
                    alt={submission.submitted_by_username}
                    fill
                    className="rounded-full object-cover border-2 border-orange-200"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{submission.submitted_by_username}</h3>
                  <p className="text-xs text-gray-500">Submitted on {formatDate(submission.created_at)}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{submission.description}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Camera className="h-4 w-4 mr-1 text-orange-500" />
                  Submission Photos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {submission.images &&
                    submission.images.map((imageUrl, index) => (
                      <div
                        key={`submission-${index}`}
                        className="relative aspect-square rounded-md overflow-hidden border border-orange-200 shadow-sm"
                      >
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={`${submission.dish_name} - image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {isOwnSubmission ? (
          <div className="flex justify-center mt-8">
            <Button
              className="bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 px-8"
              onClick={handleDeleteSubmission}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-5 w-5" />
                  Delete My Submission
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden col-span-2">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-orange-500" />
                  Submission Actions
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-800 mb-2">Difficulty Information</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getDifficultyColor(submission.difficulty)}>
                          {submission.difficulty || "Unknown"}
                        </Badge>
                        <span className="text-orange-600 font-medium">
                          ({getDifficultyPoints(submission.difficulty)} points)
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        This submission is rated as <strong>{submission.difficulty || "Unknown"}</strong> difficulty,
                        which awards <strong>{getDifficultyPoints(submission.difficulty)} points</strong> upon approval.
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h3 className="font-medium text-orange-800 mb-2">Review Guidelines</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Verify that the images match the original recipe
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Check that the submission follows the recipe instructions
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Ensure the submission meets quality standards
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Approve if the submission is satisfactory
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                        onClick={handleApproveSubmission}
                        disabled={isApproving || isRejecting}
                      >
                        {isApproving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="h-5 w-5" />
                            Approve Submission
                          </>
                        )}
                      </Button>

                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
                        onClick={handleRejectSubmission}
                        disabled={isApproving || isRejecting}
                      >
                        {isRejecting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5" />
                            Reject Submission
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="font-medium text-green-800 mb-2">Submission Information</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <span className="font-medium">Submitted by:</span> {submission.submitted_by_username}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <span className="font-medium">Submitted on:</span> {formatDate(submission.created_at)}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <span className="font-medium">Submission ID:</span> {submission.id.substring(0, 8)}...
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
