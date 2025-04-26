"use client"
import Image from "next/image"
import "@fontsource/inter"; // Defaults to 400 (Regular)
import "../../../styles/globals.css"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {redirect} from "next/navigation"

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
      <div className="flex pl-3 pt-2 pb-2">
        <Image src="/LetsCook.png" width={50} height={50} alt="LetsCook" />
        <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>

        <div className="ml-auto mt-1">
          {links.map((link) => {
            return (
              <Link key={link.name} href={link.href}>
                <Button
                  variant="ghost"
                  className="mr-5 text-[1em] hover:bg-orange-500 hover:text-white"
                >
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
      <hr />
      <main>{children}</main>    </div>
  )
}