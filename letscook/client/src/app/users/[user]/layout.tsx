"use client"
import Image from "next/image"
import "@fontsource/inter"; // Defaults to 400 (Regular)
import "../../../styles/globals.css"
import { Button } from "@/components/ui/button"
import {redirect} from "next/navigation"

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <div>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </div>
      <div>
        <div className="flex pl-3 pt-2 pb-2">
              <Image
                  src="/LetsCook.png"
                  width={50}
                  height={50}
                  alt="LetsCook"
              />
              <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>
              <Button onClick={
                  () => {
                  redirect("/authenticated/explore");
                  }
              } className="flex-right ml-auto mt-1 mr-5 font-bold bg-orange-700">Explore</Button>
        </div>
        <hr/>
        <main>{children}</main>
      </div>
    </div>
  )
}