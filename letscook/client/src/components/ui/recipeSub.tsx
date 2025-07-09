"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/dropzone"
import { useSupabaseUpload } from "@/hooks/use-supabase-upload"
import { v4 as uuidv4 } from "uuid"
import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Loader2, Camera, ChefHat, BookOpen, Upload, Info, AlertCircle } from "lucide-react"

interface RecipeSubmissionFormProps {
  user_id: string
  token: string
}

export default function RecipeSubmissionForm({ user_id, token }: RecipeSubmissionFormProps) {
  const postId = uuidv4()
  const props = useSupabaseUpload({
    bucketName: "postimages",
    path: `posts/${user_id}/${postId}`,
    allowedMimeTypes: ["image/*"],
    maxFiles: 10,
    maxFileSize: 2 * 1000 * 1000,
  })

  const [dishName, setDishName] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .dropzone-content-wrapper .mt-2 button {
        display: none !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (props.files.length === 0) {
      alert("Please add at least one image of your dish.")
      return
    }

    setIsSubmitting(true)

    if (props.files.length > 0) {
      setIsUploading(true)
      try {
        await props.onUpload()
        setIsUploading(false)

        if (props.errors.length > 0) {
          console.error("Some files failed to upload:", props.errors)
          alert("Some files failed to upload. Please try again.")
          setIsSubmitting(false)
          return
        }
      } catch (error) {
        console.error("Error uploading files:", error)
        alert("File upload failed. Please try again.")
        setIsSubmitting(false)
        setIsUploading(false)
        return
      }
    }
    console.log(dishName, difficulty, description)
    const formData = new FormData()
    formData.append("dishName", dishName)
    formData.append("difficulty", difficulty)
    formData.append("description", description)

    try {
      const submission = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/createpost/${user_id}/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(submission)
      alert("Recipe submitted!")

      setDishName("")
      setDifficulty("")
      setDescription("")
      props.setFiles([])
    } catch (e) {
      console.error(e)
      alert("Submission failed, please try again")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Create New Recipe
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">Share Your Culinary Creation</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your favorite recipes with the community. Add detailed instructions, ingredients, and photos to
            inspire other chefs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-orange-800 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                    Recipe Details
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Dish Name */}
                    <div>
                      <label htmlFor="dishName" className="block text-sm font-medium text-gray-700 mb-1">
                        Dish Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="dishName"
                        name="dishName"
                        value={dishName}
                        placeholder="Enter your dish name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                        onChange={(e) => setDishName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                        Difficulty Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="difficulty"
                        name="difficulty"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="" disabled hidden>
                          Select difficulty level
                        </option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Recipe Description <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Include ingredients, step-by-step instructions, and any tips for making this dish. A video link could also help!
                      </p>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Share your recipe's story, ingredients, and step-by-step instructions..."
                        value={description}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recipe Photos <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-1">
                        Add photos of your dish to make your recipe more appealing. You can upload up to 10 images.
                      </p>
                      <p className="text-xs text-red-600 font-extrabold mb-4">
                      *ALL FILE NAMES WITH SPACES WILL BE REPLACED WITH "_" s
                        SO WATCH OUT FOR DUPLICATE FILE NAMES*
                    </p>
                      <div className="w-full dropzone-content-wrapper border-2 border-dashed border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
                        <Dropzone {...props}>
                          <DropzoneEmptyState />
                          <DropzoneContent />
                        </Dropzone>
                      </div>
                      {props.files.length === 0 && (
                        <p className="text-sm text-red-500 mt-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          At least one image is required
                        </p>
                      )}
                      {props.files.length > 0 && (
                        <p className="text-sm text-gray-600 mt-2 flex items-center">
                          <Camera className="h-4 w-4 mr-1 text-orange-500" />
                          {props.files.length} file{props.files.length !== 1 ? "s" : ""} selected
                        </p>
                      )}
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-medium flex items-center justify-center gap-2"
                        disabled={
                          isSubmitting || props.files.some((file) => file.errors.length > 0) || props.files.length === 0
                        }
                      >
                        {isSubmitting ? (
                          <>
                            {isUploading ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Uploading Images...</span>
                              </>
                            ) : (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Creating Recipe...</span>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5" />
                            <span>Publish Recipe</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-orange-500" />
                  Recipe Tips
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-3">
                    <h3 className="font-medium text-orange-800 mb-1">Writing Great Recipes</h3>
                    <ul className="text-sm text-gray-700 space-y-2 pl-5 list-disc">
                      <li>Be specific with measurements and quantities</li>
                      <li>Include preparation and cooking times</li>
                      <li>List ingredients in order of use</li>
                      <li>Break down instructions into clear steps</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3">
                    <h3 className="font-medium text-orange-800 mb-1">Taking Great Food Photos</h3>
                    <ul className="text-sm text-gray-700 space-y-2 pl-5 list-disc">
                      <li>Use natural lighting when possible</li>
                      <li>Take photos from multiple angles</li>
                      <li>Show the finished dish and the process</li>
                      <li>Keep backgrounds simple and clean</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3">
                    <h3 className="font-medium text-orange-800 mb-1">Recipe Format</h3>
                    <p className="text-sm text-gray-700">A good recipe includes:</p>
                    <ul className="text-sm text-gray-700 space-y-2 pl-5 list-disc mt-1">
                      <li>Brief introduction or story</li>
                      <li>Ingredients list</li>
                      <li>Step-by-step instructions</li>
                      <li>Serving suggestions and tips</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Points Card */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <ChefHat className="mr-2 h-5 w-5 text-orange-500" />
                  Earn Points
                </h2>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-2">
                    <ChefHat className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">Chef Rewards</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border-b border-orange-100">
                    <span className="text-gray-700">Easy Recipe</span>
                    <Badge className="bg-cyan-700">+2 Points</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border-b border-orange-100">
                    <span className="text-gray-700">Medium Recipe</span>
                    <Badge className="bg-yellow-700">+5 Points</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-gray-700">Hard Recipe</span>
                    <Badge className="bg-red-700">+10 Points</Badge>
                  </div>
                </div>

                {/* <div className="mt-4 p-3 bg-orange-50 rounded-lg text-sm text-gray-700">
                  <p>Good luck!</p>
                </div> */}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
