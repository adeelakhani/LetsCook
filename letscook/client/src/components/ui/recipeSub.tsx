"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useState, useEffect } from "react";

export default function RecipeSub() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<{ name: string; url: string }[]>([]);
  //   const submissionData = {
  //     author: "Haris Khawja",
  //     recipe: "Hakka Chow Mein",
  //     difficulty: "Hard",
  //     creation_date: new Date(2025, 2, 18),
  //     description: str
  // }
    const [formData, setFormData] = useState(
      {
        author: "",
        recipe: "",
        difficulty: "",
        creation_date: (new Date()).toDateString(),
        description: ``
      }
    );
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent page reload

      console.log(formData);
    
      // Submit to supabase
      // formData

      setFormData({author: "", recipe: "", difficulty: "", creation_date: (new Date()).toDateString(), description: ``});
    };

    const maxImages = 10;
  
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
          <Badge className="scale-[2.5] bg-orange-700">Post a Recipe</Badge>
          {/* <h2 className="text-5xl mt-3">Post your recipe for others to see</h2> */}
        </div>
  
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-gray-50 border border-orange-800 rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="dishName"
                  className="block text-xl font-semibold mb-2"
                >
                  Dish Name
                </label>
                <input
                  type="text"
                  id="recipe"
                  name="recipe"
                  placeholder="Enter your dish name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                  value={formData.recipe}
                  onChange={handleChange}
                />
              </div>
  
              <div className="mb-6">
                <label
                  htmlFor="difficulty"
                  className="block text-xl font-semibold mb-2"
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  defaultValue=""
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white"
                  required
                  value={formData.difficulty}
                  onChange={handleChange}
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
                <label
                  htmlFor="description"
                  className="block text-xl font-semibold mb-2"
                >
                  Recipe Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Share your recipe's story, ingredients, and step-by-step instructions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
  
              <div className="mb-6">
                <label className="block text-xl font-semibold mb-2">
                  Upload Images (up to 10)
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
                  Submit Recipe ➝
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
}