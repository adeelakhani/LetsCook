"use client"
import Link from 'next/link'
import Image from "next/image"

const links = [
  {name : "Create", href : "/authenticated/create"},
  {name : "Find Challenge", href : "/authenticated/find-challenge"},
  {name : "Challenge Requests", href : "/authenticated/challenge-requests"},
  {name : "Leaderboard", href : "/authenticated/leaderboard"},
  {name : "Profile", href : "/authenticated/profile"}
]

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <html>
      <body>
        {/* Top Horizontal Row */}
        <div className="flex pl-3 pt-2 pb-2">
          <Image
            src="/LetsCook.png"
            width={50}
            height={50}
            alt="LetsCook"
          />
          <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>

          {links.map( (link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
            >
              <p>{link.name}</p>

            </Link>
          )
        })}
        </div>
        <hr/>


        {children}
      </body>
    </html>
  )
}