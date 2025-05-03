import { createClientForServer } from "@/utils/supabase/supabaseClient"
import UnauthNav from "@/components/ui/unauthNav"
import "@/styles/globals.css"
import AuthNav from "@/components/ui/authNav"
import { Trophy, Utensils, ChefHat, Award } from "lucide-react"
import Image from "next/image"
import axios from "axios"

export default async function UserPage({
  params,
}: {
  params: { user: string }
}) {
  const newParam = await params
  const username = newParam.user

  const supabase = await createClientForServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  try {
    const userLookupResponse = await axios.get(`http://localhost:3001/api/userProfile/${username}`)

    if (userLookupResponse.status !== 200 || !userLookupResponse.data) {
      return <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">User not found</h1>
          <p className="mt-2 text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    }

    const userData = userLookupResponse.data
    const user = {
      username: userData.username,
      points: userData.points,
      meals_cooked: userData.meals_cooked,
      created_recipes: userData.created_recipes,
      rank: userData.rank,
      image_url: userData.image_url,
    }


    return (
      <div className="min-h-screen bg-gray-50">
        {!session && <UnauthNav highlight="na" />}
        {session && <AuthNav highlight="Profile" />}

        <div className="w-full h-56 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"></div>
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 -mt-24">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-sm opacity-75"></div>
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                  <Image
                    src={userData.image_url || "/placeholder.svg?height=144&width=144"}
                    width={144}
                    height={144}
                    alt={`${userData.username}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{user.username}</h1>
                
                <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                  <div className="mt-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-full font-medium shadow-md flex items-center">
                    <Trophy size={18} className="mr-2" />
                    {user.points} points
                  </div>
                  
                  <div className="mt-2 bg-white border border-amber-200 text-amber-700 px-5 py-2 rounded-full font-medium shadow-sm flex items-center">
                    <Award size={18} className="mr-2" />
                    {user.rank}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-50 border-t border-gray-100">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-transform hover:transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Utensils className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{user.meals_cooked}</div>
                    <div className="text-sm text-gray-500">Meals Cooked</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-transform hover:transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <ChefHat className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{user.created_recipes}</div>
                    <div className="text-sm text-gray-500">Recipes Created</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-transform hover:transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Award className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{user.rank}</div>
                    <div className="text-sm text-gray-500">Current Rank</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-10 border-t border-gray-100 bg-gradient-to-br from-white to-amber-50">
              <h2 className="text-2xl font-bold text-amber-700 mb-6 flex items-center">
                <span className="mr-3 bg-amber-100 p-2 rounded-full">👨‍🍳</span>
                About {user.username}
              </h2>

              <div className="bg-white p-8 rounded-2xl shadow-md border border-amber-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 -mt-10 -mr-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-28 h-28 -mb-8 -ml-8 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-full opacity-40"></div>
                
                <div className="relative z-10">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <span className="font-medium text-amber-600">{user.username}</span> has cooked 
                    <span className="font-semibold text-amber-700"> {user.meals_cooked} meals</span> and created 
                    <span className="font-semibold text-amber-700"> {user.created_recipes} recipes</span> in our community.
                  </p>
                  
                  <div className="mt-6 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                      <Trophy size={24} className="text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-800">Current Rank: <span className="text-amber-700">{user.rank}</span></p>
                      <p className="text-gray-600">Total Points: <span className="font-medium">{user.points}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching user data:", error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600">Sorry, we couldn't load this user profile. Please try again later.</p>
        </div>
      </div>
    )
  }
}