import { createClientForServer } from "@/utils/supabase/supabaseClient"
import { redirect } from "next/navigation"
import "@/styles/globals.css"
import ProfileChart from "@/components/ui/profileChart"
import ProfileCard from "@/components/ui/profileCard"
import ProfileChallengeTable from "@/components/ui/profile-challenge-table"
import ProfileSubmissionsTable from "@/components/ui/profile-submissions-table"
import axios from "axios"
import AuthNav from "@/components/ui/authNav"

type SubmitInfo = {
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

function generateChartData(posts: PostInfo[], submissions: SubmitInfo[]) {
  const currentYear = new Date().getFullYear()
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Create initial chart data with zeros
  const chartData = months.map((month) => ({
    month,
    meals: 0,
    recipes: 0,
  }))

  posts.forEach((post) => {
    const postDate = new Date(post.created_at)
    if (postDate.getFullYear() === currentYear) {
      const monthIndex = postDate.getMonth()
      chartData[monthIndex].recipes += 1
    }
  })

  submissions.forEach((submission) => {
    const submissionDate = new Date(submission.created_at)
    if (submissionDate.getFullYear() === currentYear) {
      const monthIndex = submissionDate.getMonth()
      chartData[monthIndex].meals += 1
    }
  })

  const currentMonthIndex = new Date().getMonth()
  return chartData.slice(0, currentMonthIndex + 1)
}

export default async function Profile() {
  const supabase = await createClientForServer()
  const { data, error } = await supabase.auth.getUser()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (error || !data?.user) {
    redirect("/login")
  }

  if (!session) {
    redirect("/login")
  }

  const token = session.access_token
  const this_user_id = data.user.id

  const userStats = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getStats/${this_user_id}`)
  const userData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/userPrivate/${this_user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const posts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/userCreations/${this_user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })

  if (posts.status !== 200) {
    alert("Failed to fetch posts")
    redirect("/login")
  }

  const submissions = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/userSubmissions/${this_user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })

  if (submissions.status !== 200) {
    alert("Failed to fetch submissions, please try again later")
    redirect("/login")
  }

  const chartData = generateChartData(posts.data, submissions.data)

  const user = {
    username: userData.data[0].username,
    email: userData.data[0].email,
    points: userStats.data.points,
    meals_cooked: userStats.data.meals_cooked,
    created_recipes: userStats.data.created_recipes,
    rank: userStats.data.rank,
    profile_pic: userData.data[0].image_url,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-50">
      <AuthNav highlight="Profile" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Hero Section with Profile Card and Chart */}
        <div className="mb-8 md:mb-12">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Culinary Journey</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Track your progress and celebrate your achievements
            </p>
          </div>

          {/* Profile Card and Chart Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            <div className="order-1 lg:order-1">
              <ProfileCard user={user} />
            </div>
            <div className="order-2 lg:order-2">
              <ProfileChart elements={chartData} />
            </div>
          </div>
        </div>

        {/* Past Submissions Section */}
        <div className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-200">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-4">
                <span className="text-2xl md:text-3xl">🍽️</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Cooking Adventures</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                All the delicious meals you've prepared and shared with the community
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ProfileSubmissionsTable submissions={submissions.data} />
            </div>
          </div>
        </div>

        {/* Recipes Created Section */}
        <div className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-white to-orange-50 rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-orange-200">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-4">
                <span className="text-2xl md:text-3xl">📝</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Recipe Creations</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Original recipes you've shared to inspire and challenge other chefs
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ProfileChallengeTable postsInfo={posts.data} />
            </div>
          </div>
        </div>

        {/* Achievement Summary Footer */}
        <div className="text-center py-6 md:py-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full shadow-sm border border-orange-200">
            <span className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="font-medium text-sm sm:text-base">Keep cooking to climb the leaderboard! 🚀</span>
          </div>
        </div>
      </div>
    </div>
  )
}
