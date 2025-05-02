"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { usePathname, notFound, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, Clock, User, Award, Check, X, Camera, ChefHat, BookOpen } from "lucide-react"

type RecipeData = {
  user: string
  recipe: string
  difficulty: string
  submission_date: Date
  description: string
}

export default function RecipeSubmissionDetails() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<{ name: string; url: string }[]>([])
  const [isApproving, setIsApproving] = useState(false)
  const maxImages = 10
  const router = useRouter()

  const pathname = usePathname()
  const recipeName = pathname.split("/").slice(-1)[0].split("_")[0].replaceAll("-", " ")
  const user = pathname.split("/").slice(-1)[0].split("_")[1]

  const submissionData: RecipeData = {
    user: user,
    recipe: recipeName,
    difficulty: "Medium",
    submission_date: new Date(2025, 2, 18),
    description: `Hakka Chow Mein is a stir-fried noodle dish popular in Indian-Chinese cuisine. It features wok-tossed noodles with vegetables, soy-based sauces, and sometimes protein like chicken, shrimp, or tofu. The dish is known for its bold umami flavors, slightly smoky aroma from high-heat cooking, and crispy yet chewy texture.

Ingredients: 
- 200g Hakka noodles (or thin wheat noodles)
- 2 tbsp oil (vegetable or sesame)
- 1 cup mixed vegetables (carrot, cabbage, bell peppers, beans)
- 1/2 cup protein (chicken, shrimp, tofu – optional)
- 3 cloves garlic (minced)
- 1-inch ginger (grated)
- 2 spring onions (chopped, white and green parts separated)
- 1 tbsp soy sauce
- 1 tbsp dark soy sauce (for color)
- 1 tsp vinegar (white or rice vinegar)
- 1/2 tsp chili sauce (adjust to taste)
- 1/2 tsp black pepper
- 1/2 tsp salt
- 1/2 tsp sugar (optional, balances flavors)

Recipe:
1. Boil the Noodles
   - Bring a pot of water to a rolling boil.  
   - Add Hakka noodles and cook according to package instructions (usually 3-4 minutes).  
   - Drain and rinse under cold water to prevent sticking. Toss with a little oil and set aside.

2. Prepare the Stir-Fry Base
   - Heat oil in a large wok or pan over high heat.  
   - Add minced garlic, grated ginger, and white parts of spring onions. Stir-fry for 30 seconds until fragrant.

3. Cook the Vegetables & Protein
   - Add chopped vegetables and stir-fry for 2-3 minutes on high heat until slightly tender but still crisp.  
   - If using protein, add it now and cook until done (chicken should turn golden, shrimp should be pink, tofu should be lightly browned).

4. Add Noodles & Sauces
   - Add the cooked noodles to the wok.  
   - Pour in soy sauce, dark soy sauce, vinegar, chili sauce, salt, sugar, and black pepper.  
   - Toss everything well using tongs or chopsticks to coat the noodles evenly. Stir-fry for another 2 minutes.

5. Final Touch & Serve
   - Sprinkle the green parts of spring onions on top.  
   - Give one last toss and remove from heat.  
   - Serve hot with extra chili sauce or vinegar on the side.`,
  }

  if (false) {
    notFound()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[]

    if (uploadedFiles.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`)
      return
    }

    setUploadedFiles([...uploadedFiles, ...files])
  }

  // Generate image previews whenever uploaded files change
  useEffect(() => {
    interface ImagePreview {
      name: string
      url: string
    }
    const newPreviews: ImagePreview[] = []

    uploadedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        newPreviews.push({
          name: file.name,
          url: e.target?.result as string,
        })

        if (newPreviews.length === uploadedFiles.length) {
          setImagePreviews(newPreviews)
        }
      }

      reader.readAsDataURL(file)
    })

    if (uploadedFiles.length === 0) {
      setImagePreviews([])
    }
  }, [uploadedFiles])

  const removeImage = (index: number): void => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleApproveSubmission = () => {
    setIsApproving(true)
    // Simulate API call
    setTimeout(() => {
      setIsApproving(false)
      // Show success message or redirect
      router.push("/authenticated/submissions")
    }, 1500)
  }

  // Format the recipe description sections
  const formatRecipeSection = (section: string, content: string) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-2">{section}</h3>
        <div className="pl-2 border-l-2 border-orange-200">
          {content.split("\n").map((line, i) => (
            <p key={i} className="mb-1">
              {line}
            </p>
          ))}
        </div>
      </div>
    )
  }

  // Split the description into sections
  const descriptionParts = submissionData.description.split("\n\n")
  const introduction = descriptionParts[0]
  const ingredients = descriptionParts[1]
  const recipe = descriptionParts.slice(2).join("\n\n")

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
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

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Recipe Submission
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{submissionData.recipe}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>Submitted by </span>
            <Link href={`/users/${submissionData.user}`} className="text-orange-600 hover:underline font-medium">
              {submissionData.user}
            </Link>
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
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`
                      ${
                        submissionData.difficulty === "Easy"
                          ? "bg-cyan-700"
                          : submissionData.difficulty === "Medium"
                            ? "bg-yellow-700"
                            : "bg-red-700"
                      }
                    `}
                    >
                      {submissionData.difficulty}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {submissionData.submission_date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Introduction */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{introduction}</p>
                </div>

                {/* Ingredients */}
                {formatRecipeSection("Ingredients", ingredients.replace("Ingredients:", ""))}

                {/* Recipe Steps */}
                {formatRecipeSection("Preparation", recipe.replace("Recipe:", ""))}
              </div>
            </Card>

            {/* Image Upload Section */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden mt-6">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-orange-500" />
                  Submission Photos
                </h2>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">
                      {imagePreviews.length > 0
                        ? `Selected Images (${imagePreviews.length}/${maxImages})`
                        : `No images uploaded yet (0/${maxImages})`}
                    </p>
                    <label className="cursor-pointer bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-md transition-colors">
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                      Add Images
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden border border-orange-200 shadow-sm group"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${preview.url})`,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {imagePreviews.length < maxImages && (
                    <label className="cursor-pointer aspect-square bg-orange-50 rounded-md flex flex-col items-center justify-center border-2 border-dashed border-orange-200 hover:bg-orange-100 transition-colors">
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                      <Camera className="h-8 w-8 text-orange-400 mb-2" />
                      <span className="text-sm text-orange-600">Add Photos</span>
                    </label>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Chef Info */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <ChefHat className="mr-2 h-5 w-5 text-orange-500" />
                  Chef Profile
                </h2>
              </div>
              <div className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-orange-100 border-4 border-orange-300 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-orange-800">
                      {submissionData.user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{submissionData.user}</h3>
                  <p className="text-orange-600 font-medium">Master Chef</p>

                  <div className="mt-4 w-full">
                    <Link href={`/users/${submissionData.user}`}>
                      <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            {/* Submission Actions */}
            <Card className="bg-white shadow-md border border-orange-200 overflow-hidden">
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                <h2 className="text-xl font-bold text-orange-800 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-orange-500" />
                  Submission Actions
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
                    onClick={handleApproveSubmission}
                    disabled={isApproving}
                  >
                    {isApproving ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="h-5 w-5" />
                        Approve Submission
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-medium text-orange-800 mb-2">Submission Guidelines</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Verify that the images provided match the recipe steps 
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Inspect validity of images
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      If the submission seems good, approve it
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
