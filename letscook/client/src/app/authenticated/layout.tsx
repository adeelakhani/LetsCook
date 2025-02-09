"use client"
import Link from 'next/link'
import Image from "next/image"
import { Button } from "@/components/ui/button"

const links = [
  {name : "Cook", href : "/authenticated/cook"},
  {name : "Challenge", href : "/authenticated/challenge"},
  {name : "Submissions", href : "/authenticated/submissions"},
  {name : "Leaderboard", href : "/authenticated/leaderboard"},
  {name : "Profile", href : "/authenticated/profile"}
]

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
      <div>
        {/* Top Horizontal Row */}
        <div className="flex pl-3 pt-2 pb-2">
          <Image
            src="/LetsCook.png"
            width={50}
            height={50}
            alt="LetsCook"
          />
          <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>

          <div className="ml-auto mt-1">
            {links.map( (link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                >
                  <Button variant="ghost" className="mr-5 text-[1em] hover:bg-orange-500 hover:text-white">{link.name}</Button>

                </Link>
              )
            })}
          </div>
        </div>
        <hr/>
        <main>{children}</main>
      </div>
  )
}