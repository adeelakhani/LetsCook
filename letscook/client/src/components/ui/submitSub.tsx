"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2, Upload, AlertCircle } from "lucide-react"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/dropzone"
import axios from "axios"
import { useSupabaseUpload } from "@/hooks/use-supabase-upload"
import { v4 as uuidv4 } from "uuid"


import { useState, useEffect } from "react";
import {
  ChevronLeft,
  Clock,
  User,
  Camera,
  BookOpen,
  Info,
  Utensils,
  CheckCircle2,
  Trash2,
} from "lucide-react";

// Define the data structure for the post info
type PostInfo = {
  id: string;
  user_id: string;
  username: string;
  dish_name: string;
  difficulty?: string; // Make difficulty optional
  description: string;
  profile_url: string;
  created_at: string;
  images: string[];
};

// Component props
interface SubmitSubProps {
  token: string;

  postInfo: PostInfo | { newObj: PostInfo }; // Accept either direct PostInfo or wrapped in newObj
  this_user_id: string;
}

export default function SubmitSub({ token, postInfo, this_user_id }: SubmitSubProps) {
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
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the case where postInfo might be wrapped in a newObj property
  const post = "newObj" in postInfo ? postInfo.newObj : postInfo;

  // Check if this is the user's own post
  const isOwnPost = post.user_id === this_user_id;
  const submissionId = uuidv4()
  const props = useSupabaseUpload({
    bucketName: "postimages",
    path: `submissions/${this_user_id}/${post.id}/${submissionId}`,
    allowedMimeTypes: ["image/*"],
    maxFiles: 10,
    maxFileSize: 1000 * 1000 * 10,
  })
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
    const formData = new FormData()
    formData.append("description", description)
    formData.append("difficulty", post.difficulty? post.difficulty : "easy");

    try {
      const submission = await axios.post(`http://localhost:3001/api/submitRecipe/${this_user_id}/${post.user_id}/${post.id}/${submissionId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      if (submission.status !== 200) {
        throw new Error("Failed to submit recipe")
      }
      alert("Recipe submitted!")

      setDescription("")
      props.setFiles([])
      router.push("/authenticated/challenges")
    } catch (e) {
      console.error(e)
      alert("Submission failed, please try again")
    } finally {
      setIsSubmitting(false)
    }
  }
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Safely get difficulty level with null checks
  const getDifficultyColor = () => {
    if (!post.difficulty) return "bg-gray-700";

    const difficultyLower = post.difficulty.toLowerCase();
    if (difficultyLower === "easy") return "bg-cyan-700";
    if (difficultyLower === "medium") return "bg-yellow-700";
    return "bg-red-700";
  };

  // Get difficulty points safely
  const getDifficultyPoints = () => {
    if (!post.difficulty) return "0";

    const difficultyLower = post.difficulty.toLowerCase();
    if (difficultyLower === "easy") return "2";
    if (difficultyLower === "medium") return "5";
    return "10";
  };

  // Handle delete post
  const handleDeletePost = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      // This is where you would make the API call to delete the post
      // Example API call:
      // await fetch(`/api/recipes/${post.id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect after successful deletion
      router.push("/authenticated/challenges");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-orange-600 hover:text-orange-800 hover:bg-orange-100 -ml-2"
            onClick={() => router.push("/authenticated/challenges")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Challenges
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Recipe Challenge
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
            {post.dish_name}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>Created by </span>
            <Link
              href={`/users/${post.username}`}
              className="text-orange-600 hover:underline font-medium"
            >
              {post.username}
            </Link>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4" />
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-orange-800 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                    Recipe Details
                  </h2>
                  <Badge className={getDifficultyColor()}>
                    {post.difficulty || "Unknown"}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Submitted Images */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden mt-6">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-orange-500" />
                  Submitted Photos
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {post.images &&
                    post.images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden border border-orange-200 shadow-sm group"
                      >
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={`${post.dish_name} - image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
                      </div>
                    ))}
                </div>
              </div>
            </Card>
            {!isOwnPost && (<form onSubmit={handleSubmit}>
                  <div className="space-y-6 mt-6">
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Recipe Description <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Include ingredients, step-by-step instructions, and any other pieces of information to help {post.username} decide!
                      </p>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Share how you replicated it, ingredients, and step-by-step instructions..."
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
                      <p className="text-xs text-gray-500 mb-4">
                        Add photos of your dish to make your recipe more appealing. You can upload up to 10 images. <span className="text-red-600 font-extrabold">*DO NOT INCLUDE SCREENSHOTS*</span>
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
                            <span>Submit Challenge Submission</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>)}
          </div>
          {/* HERERERERE */}

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* User Profile */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <User className="mr-2 h-5 w-5 text-orange-500" />
                  {isOwnPost ? "Your Submission" : "Chef Profile"}
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={post.profile_url || "/placeholder.svg"}
                      alt={post.username}
                      fill
                      className="rounded-full object-cover border-2 border-orange-200"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-800">
                      {post.username}
                    </h3>
                    {isOwnPost ? (
                      <p className="text-sm text-orange-600">
                        This is your recipe submission
                      </p>
                    ) : (
                      <Link
                        href={`/users/${post.username}`}
                        className="text-sm text-orange-600 hover:underline"
                      >
                        View Profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Recipe Stats */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-orange-500" />
                  Recipe Stats
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <Utensils className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Difficulty</h3>
                      <p className="text-gray-600">
                        {post.difficulty || "Unknown"}{" "}
                        <span className="text-orange-600 font-medium">
                          ({getDifficultyPoints()} points)
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <Camera className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Photos</h3>
                      <p className="text-gray-600">
                        {post.images ? post.images.length : 0} images submitted
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-medium text-orange-800 mb-2">
                    Recipe Information
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Created on {formatDate(post.created_at)}
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Recipe ID: {post.id && post.id.substring(0, 8)}...
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Part of the Recipe Challenge
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Actions - Only showing delete for owner */}
            {isOwnPost && (
              <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
                <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                  <h2 className="text-xl font-bold text-orange-800 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                    Actions
                  </h2>
                </div>
                <div className="p-4">
                  <Button
                    className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 border-red-200"
                    variant="outline"
                    onClick={handleDeletePost}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Delete Recipe
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
