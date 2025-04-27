"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function UnauthNav({ highlight }: { highlight: string }) {

    return (
        <div className="flex pl-3 pt-2 pb-2 bg-white shadow-sm">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/LetsCook.png" width={50} height={50} alt="LetsCook" />
            <h1 className="text-[2em] ml-3 font-bold">LetsCook</h1>
          </div>
        </Link>

        <div className="flex ml-auto">
            <Link href="/">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
            highlight === "Home" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                Home
                </Button>
            </Link>


            <Link href="/about">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
            highlight === "About" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
            }`}>
                About
                </Button>
            </Link>
            
            <Link href="/contact">
                <Button className={`flex-right mt-1 ml-auto font-bold bg-white text-black hover:text-orange-600 hover:bg-white mr-3 ${
                highlight === "Contact" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : ""
                }`}>
                Contact
                </Button>
            </Link>

            <Button onClick={
                () => {
                redirect("/login");
                }
            } className="flex-right ml-auto mt-1 mr-5 font-bold bg-orange-600 shadow-md">Sign in</Button>

        </div>
      </div>

    )
}