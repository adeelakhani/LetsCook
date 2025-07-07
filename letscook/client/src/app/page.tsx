"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import UnauthNav from "@/components/ui/unauthNav"

export default function Landing() {
  const router = useRouter()

  return (
    <div className="min-w-screen min-h-screen animate-fadeIn">
      {/* Top Horizontal Navbar */}
      <UnauthNav highlight="Home" />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-16 md:pt-32 pb-16 md:pb-36 px-4">
        <div className="scale-125 md:scale-[2] mb-4 md:mb-0">
          <Badge className="bg-orange-600 shadow-md transition-all duration-300 hover:-translate-y-2">
            Want to cook?
          </Badge>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 animate-pulse-slow text-center">
          LetsCook
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-center px-4">
          Join the community, join the vision; Learn to cook, learn with precision; Become a chef, become a magician ✨
        </p>
        <div className="scale-110 md:scale-[1.5] mt-8 md:mt-12">
          <Button
            onClick={() => router.push("/login")}
            className="font-bold bg-orange-600 shadow-md transition-all duration-300 hover:-translate-y-2"
          >
            Start Cooking ➝
          </Button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100">
        <div className="pt-12 md:pt-20 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-800">How It Works</h2>
          <p className="text-base md:text-lg mt-4 text-gray-600">
            Three simple ways to engage with our cooking community...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-[90%] md:w-[75%] mx-auto pt-8 md:pt-10 pb-12 md:pb-20">
          <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <Link href="/authenticated/challenges" className="flex flex-col items-center">
              <div className="flex justify-center mb-4 text-orange-500 text-4xl md:text-5xl animate-bounce-slow animation-delay-250">
                🍳
              </div>
              <h3 className="text-orange-800 text-xl md:text-2xl font-semibold mb-2 text-center">Cook</h3>
              <p className="text-gray-700 text-center text-sm md:text-base">
                Find a posted recipe on the taskboard and cook it up! Submit pictures of your masterpiece to earn
                points.
              </p>
            </Link>
          </div>
          <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <Link href="/authenticated/createpost" className="flex flex-col items-center">
              <div className="flex justify-center mb-4 text-orange-500 text-4xl md:text-5xl animate-bounce-slow animation-delay-500">
                ⚔️
              </div>
              <h3 className="text-orange-800 text-xl md:text-2xl font-semibold mb-2 text-center">Challenge</h3>
              <p className="text-gray-700 text-center text-sm md:text-base">
                Challenge the community with your own recipe! Post the steps on the taskboard and earn points for
                completed submissions.
              </p>
            </Link>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 md:justify-self-center bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <Link href="/authenticated/leaderboard" className="flex flex-col items-center">
              <div className="flex justify-center mb-4 text-orange-500 text-4xl md:text-5xl animate-bounce-slow animation-delay-750">
                👑
              </div>
              <h3 className="text-orange-800 text-xl md:text-2xl font-semibold mb-2 text-center">Compete</h3>
              <p className="text-gray-700 text-center text-sm md:text-base">
                Compete against the world to gather the most amount of points, and become a{" "}
                <span className="block md:inline">
                  <span className="font-bold underline text-orange-600">Master Chef!</span>
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Why LetsCook Section */}
      <div id="stats" className="pt-12 md:pt-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-800">Why LetsCook?</h2>
            <p className="mt-4 text-base md:text-lg text-gray-700">The perfect platform for cooking enthusiasts</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 w-full pt-8 md:pt-10 pb-12 md:pb-20">
            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-4xl md:text-5xl animate-bounce-slow">
                  🏆
                </div>
                <h3 className="text-orange-800 text-xl md:text-2xl font-semibold mb-2 text-center">Compete</h3>
                <p className="text-gray-700 text-center text-sm md:text-base">Challenge others and earn recognition</p>
              </div>
            </div>
            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-4xl md:text-5xl animate-bounce-slow animation-delay-250">
                  🧑‍🍳
                </div>
                <h3 className="text-orange-800 text-xl md:text-2xl font-semibold mb-2 text-center">Learn</h3>
                <p className="text-gray-700 text-center text-sm md:text-base">
                  Improve your cooking skills with each recipe
                </p>
              </div>
            </div>
            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-4xl md:text-5xl animate-bounce-slow animation-delay-500">
                  🔎
                </div>
                <h3 className="text-orange-800 text-xl md:text-2xl font-semibold mb-2 text-center">Discover</h3>
                <p className="text-gray-700 text-center text-sm md:text-base">
                  Discover new cultures and delicate dishes
                </p>
              </div>
            </div>
            <div className="col-span-1 bg-white text-black rounded-xl shadow-md p-6 border border-orange-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4 text-orange-500 text-4xl md:text-5xl animate-bounce-slow animation-delay-750">
                  👥
                </div>
                <h3 className="text-orange-800 text-xl md:text-2xl font-semibold mb-2 text-center">Connect</h3>
                <p className="text-gray-700 text-center text-sm md:text-base">
                  Join a community of passionate food lovers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="flex flex-col items-center justify-center pt-12 md:pt-16 pb-12 md:pb-16 px-6 md:px-10 bg-gray-100">
        <svg
          className="w-10 h-10 md:w-12 md:h-12 text-orange-300 mx-auto mb-6 animate-pulse-slow"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <h1 className="text-lg sm:text-xl md:text-2xl max-w-[30em] text-center leading-relaxed">
          "You can't cook if you don't like people."
          <br />
          <span className="text-sm md:text-base text-gray-700">— Joël Robuchon</span>
        </h1>
        <div className="scale-110 md:scale-[1.5] mt-8 md:mt-12">
          <Button
            onClick={() => router.push("/login")}
            className="font-bold bg-orange-600 shadow-md transition-all duration-300 hover:-translate-y-2"
          >
            Count me in! 🤝
          </Button>
        </div>
      </div>
    </div>
  )
}
