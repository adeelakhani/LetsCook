"use client"

import Image from "next/image";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePathname, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { ExecOptionsWithStringEncoding } from "child_process";

type RecipeData = {
    author: string,
    recipe: string,
    difficulty: string,
    creation_date: Date,
    description: string
}

const str = `Hakka Chow Mein is a stir-fried noodle dish popular in Indian-Chinese cuisine. It features wok-tossed noodles with vegetables, soy-based sauces, and sometimes protein like chicken, shrimp, or tofu. The dish is known for its bold umami flavors, slightly smoky aroma from high-heat cooking, and crispy yet chewy texture.

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
   - Serve hot with extra chili sauce or vinegar on the side.`;


export default function SubmitSub() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<{ name: string; url: string }[]>([]);
    const maxImages = 10;

    const pathName = usePathname();
    const recipe = pathName.split('/').slice(-1)[0].replaceAll("-", " ")

    const submissionData : RecipeData = {
      author: "Haris-Khawja",
      recipe: recipe,
      difficulty: "Medium",
      creation_date: new Date(2025, 2, 18),
      description: str
  }
    
    if (false) {
        notFound();
    }
  
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []) as File[];
  
      if (uploadedFiles.length + files.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images.`);
        return;
      }
  
      setUploadedFiles([...uploadedFiles, ...files]);
    };
  
    // Generate image previews whenever uploaded files change
    useEffect(() => {
      interface ImagePreview {
          name: string;
          url: string;
      }
      const newPreviews: ImagePreview[] = [];
  
      uploadedFiles.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = (e: ProgressEvent<FileReader>) => {
          newPreviews.push({
            name: file.name,
            url: e.target?.result as string,
          });
  
          if (newPreviews.length === uploadedFiles.length) {
            setImagePreviews(newPreviews);
          }
        };
  
        reader.readAsDataURL(file);
      });
  
      if (uploadedFiles.length === 0) {
        setImagePreviews([]);
      }
    }, [uploadedFiles]);
  
  
  
  const removeImage = (index: number): void => {
      setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };
  
    return (
      <div className="min-w-screen min-h-screen bg-white">
        <div className="flex-col content-center justify-items-center pt-12 pb-8 text-center">
          <Badge className="scale-[2.5] bg-orange-700">Submit to Recipe</Badge>
        </div>
  
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="bg-gray-50 border border-orange-800 rounded-lg p-8">
            <form>
              <div className="mb-6">
                <span className="flex mb-2">
                    <h1 className="block text-xl font-semibold">{submissionData.recipe}</h1>
                    {submissionData.difficulty == "Easy" && <Badge className="font-bold text-sm bg-cyan-700 ml-2 h-7">Easy</Badge>}
                    {submissionData.difficulty == "Medium" && <Badge className="font-bold text-sm bg-yellow-700 ml-2 h-7">Medium</Badge>}
                    {submissionData.difficulty == "Hard" && <Badge className="font-bold text-sm bg-red-700 ml-2 h-7">Hard</Badge>}
                </span>
                <h1 className="block text-sm mb-2">Made by <Link href={`/users/${submissionData.author}`}><span className="text-blue-700 hover:underline">{submissionData.author}</span></Link>, {submissionData.creation_date.toDateString()}</h1>
                <pre style={{whiteSpace: "pre-wrap", wordWrap: "break-word" }} className="w-full px-4 py-3 border border-gray-300 rounded-md h-fit focus:outline-none focus:ring-2 focus:ring-orange-600">
                    {submissionData.description}
                </pre>
              </div>
    
            <div className="mb-6">
                <label className="block text-xl font-semibold mb-2">
                  Upload Images to Submit! (up to 10)
                </label>
  
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-600 hover:bg-orange-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg
                        className="h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="mt-2 text-base text-gray-700">
                        Drag and drop your images here, or{" "}
                        <span className="text-orange-600 font-medium">
                          click to select files
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB each (maximum 10 images)
                      </p>
                    </div>
                  </label>
                </div>
  
                <div className="mt-4">
                  <p className="text-lg font-medium mb-2">
                    {imagePreviews.length > 0
                      ? `Selected Images (${imagePreviews.length}/${maxImages})`
                      : `Image Previews (0/${maxImages})`}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative aspect-square border border-gray-200 rounded-md overflow-hidden bg-white"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${preview.url})`,
                            width: "100%",
                            height: "100%",
                          }}
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
  
                    {Array.from({
                      length: Math.max(0, maxImages - imagePreviews.length),
                    }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="aspect-square bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300"
                      >
                        <span className="text-2xl text-gray-400">+</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  
              <div className="text-center mt-8">
                <Button className="scale-[1.2] font-bold bg-orange-600 hover:bg-orange-700">
                  Submit Meal ➝
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
}