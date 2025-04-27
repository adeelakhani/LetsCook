"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function AuthNav({ highlight }: { highlight: string }) {

    return (
        <div className="flex pl-3 pt-2 pb-2 bg-white shadow-sm !important">
        <Link href="/authenticated/explore">
          <div className="flex items-center">
            <Image src="/LetsCook.png" width={50} height={50} alt="LetsCook" />
            <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>
          </div>
        </Link>

        <div className="flex ml-auto">
            <Link href="/authenticated/explore">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
            highlight === "Explore" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                Explore
                </Button>
            </Link>

            <Link href="/authenticated/createpost">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
            highlight === "Create" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                Create
                </Button>
            </Link>

            <Link href="/authenticated/challenges">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
            highlight === "Challenges" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                Challenges
                </Button>
            </Link>

            <Link href="/authenticated/submissions">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
            highlight === "Submissions" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                Submissions
                </Button>
            </Link>

            <Link href="/authenticated/leaderboard">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
            highlight === "Leaderboard" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                Leaderboard
                </Button>
            </Link>

            <Link href="/authenticated/profile">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-5 ${
            highlight === "Profile" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                Profile
                </Button>
            </Link>
        </div>
      </div>

    )
}