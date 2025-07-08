"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function AuthNav({ highlight }: { highlight: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="bg-white shadow-sm">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex pl-3 pt-2 pb-2">
        <Link href="/authenticated/explore">
          <div className="flex items-center">
            <Image src="/LetsCook.png" width={50} height={50} alt="LetsCook" />
            <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>
          </div>
        </Link>
        <div className="flex ml-auto">
          <Link href="/authenticated/explore">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "Explore" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              Explore
            </Button>
          </Link>
          <Link href="/authenticated/createpost">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "Create" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              Create
            </Button>
          </Link>
          <Link href="/authenticated/challenges">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "Challenges" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              Challenges
            </Button>
          </Link>
          <Link href="/authenticated/submissions">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "Submissions" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              Submissions
            </Button>
          </Link>
          <Link href="/authenticated/leaderboard">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "Leaderboard" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              Leaderboard
            </Button>
          </Link>
          <Link href="/authenticated/profile">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-5 ${
                highlight === "Profile" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between pl-3 pr-3 pt-2 pb-2">
          <Link href="/authenticated/explore">
            <div className="flex items-center">
              <Image src="/LetsCook.png" width={40} height={40} alt="LetsCook" />
              <h1 className="text-[1.5em] ml-2 font-bold">LetsCook</h1>
            </div>
          </Link>
          <Button onClick={toggleMenu} variant="ghost" size="sm" className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-1 p-3">
              <Link href="/authenticated/explore" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "Explore" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  Explore
                </Button>
              </Link>
              <Link href="/authenticated/createpost" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "Create" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  Create
                </Button>
              </Link>
              <Link href="/authenticated/challenges" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "Challenges" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  Challenges
                </Button>
              </Link>
              <Link href="/authenticated/submissions" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "Submissions" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  Submissions
                </Button>
              </Link>
              <Link href="/authenticated/leaderboard" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "Leaderboard" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  Leaderboard
                </Button>
              </Link>
              <Link href="/authenticated/profile" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "Profile" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
