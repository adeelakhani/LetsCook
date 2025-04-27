"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/dropzone"
import { useSupabaseUpload } from "@/hooks/use-supabase-upload"
import { v4 as uuidv4 } from "uuid"
import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Loader2 } from "lucide-react"

interface RecipeSubProps {
  user_id: string
  token: string
}

export default function RecipeSub({ user_id, token }: RecipeSubProps) {
  const postId = uuidv4()
  const props = useSupabaseUpload({
    bucketName: "postimages",
    path: `posts/${user_id}/${postId}`,
    allowedMimeTypes: ["image/*"],
    maxFiles: 10,
    maxFileSize: 1000 * 1000 * 10,
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
    console.log(dishName, difficulty, description);
    const formData = new FormData()
    formData.append("dishName", dishName)
    formData.append("difficulty", difficulty)
    formData.append("description", description)
    // formData.append("postId", postId)

    // if (props.files.length > 0 && props.successes.length > 0) {
    //   props.files.forEach((file, index) => {
    //     if (props.successes.includes(file.name)) {
    //       formData.append(`fileNames[${index}]`, file.name)
    //       formData.append(`filePaths[${index}]`, `posts/${user_id}/${postId}/${file.name}`)
    //     }
    //   })
    // }

    try {
      const submission = await axios.post(`http://localhost:3001/api/createpost/${user_id}/${postId}`, formData, {
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
    <div className="min-w-screen min-h-screen bg-white">
      <div className="flex-col content-center justify-items-center pt-12 pb-8 text-center">
        <Badge className="scale-[2.5] bg-orange-700">Post a Recipe</Badge>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gray-50 border border-orange-800 rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="dishName" className="block text-xl font-semibold mb-2">
                Dish Name
              </label>
              <input
                type="text"
                id="dishName"
                name="dishName"
                value={dishName}
                placeholder="Enter your dish name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                onChange={(e) => setDishName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="difficulty" className="block text-xl font-semibold mb-2">
                Difficulty
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

            <div className="mb-6">
              <label htmlFor="description" className="block text-xl font-semibold mb-2">
                Recipe Description
              </label>
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

            <div className="mb-6">
              <label className="block text-xl font-semibold mb-2">
                Recipe Photos <span className="text-red-500">*</span>
              </label>
              <p className="text-gray-600 mb-4">
                Add photos of your dish to make your recipe more appealing. You can upload up to 10 images.
              </p>
              <div className="w-full dropzone-content-wrapper">
                <Dropzone {...props}>
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
              </div>
              {props.files.length === 0 && <p className="text-sm text-red-500 mt-2">At least one image is required.</p>}
              {props.files.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {props.files.length} file{props.files.length !== 1 ? "s" : ""} selected. They will be uploaded when
                  you click &quote;Create Post&quote;.
                </p>
              )}
            </div>

            <div className="text-center mt-8">
              <Button
                type="submit"
                className="scale-[1.2] font-bold bg-orange-600 hover:bg-orange-700"
                disabled={
                  isSubmitting || props.files.some((file) => file.errors.length > 0) || props.files.length === 0
                }
              >
                {isSubmitting ? (
                  <>
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading Images...
                      </>
                    ) : (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Post...
                      </>
                    )}
                  </>
                ) : (
                  "Create Post ➝"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
