"use client"
import Image from "next/image"
import "@fontsource/inter"; // Defaults to 400 (Regular)
import "../../../styles/globals.css"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {redirect} from "next/navigation"
import UnauthNav from "@/components/ui/unauthNav";

const links = [
  { name: "Explore", href: "/authenticated/explore" },
  { name: "Create", href: "/authenticated/createpost" },
  { name: "Challenges", href: "/authenticated/challenges" },
  { name: "Submissions", href: "/authenticated/submissions" },
  { name: "Leaderboard", href: "/authenticated/leaderboard" },
  { name: "Profile", href: "/authenticated/profile" },
];

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <div>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </div>
      <UnauthNav highlight="na"/>
      <main>{children}</main>
      </div>
  )
}