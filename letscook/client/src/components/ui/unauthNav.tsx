"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function UnauthNav({ highlight }: { highlight: string }) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="bg-white shadow-sm">
      {/* Desktop Navigation */}
      <div className="hidden md:flex pl-3 pt-2 pb-2">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/LetsCook.png" width={50} height={50} alt="LetsCook" />
            <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>
          </div>
        </Link>
        <div className="flex ml-auto">
          <Link href="/">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "Home" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button
              className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "About" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
              }`}
            >
              About
            </Button>
          </Link>
          <Button
            onClick={() => router.push("/login")}
            className="flex-right ml-auto mt-1 mr-5 font-bold bg-orange-600 hover:bg-orange-700 shadow-md text-white"
          >
            Sign in
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between pl-3 pr-3 pt-2 pb-2">
          <Link href="/">
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
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "Home" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  Home
                </Button>
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full justify-start font-bold bg-white text-black hover:text-orange-600 hover:bg-white ${
                    highlight === "About" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                  }`}
                >
                  About
                </Button>
              </Link>
              <Button
                onClick={() => {
                  router.push("/login")
                  setIsMenuOpen(false)
                }}
                className="w-full justify-start font-bold bg-orange-600 hover:bg-orange-700 shadow-md text-white mt-2"
              >
                Sign in
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
