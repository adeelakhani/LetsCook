import Link from 'next/link'
import Image from "next/image"
import "@fontsource/inter"; // Defaults to 400 (Regular)
import "../styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}

        {/* Footer */}
        <div className="bg-orange-700 text-center flex-col pt-8 pb-6">
          <span className="flex justify-center">
            <Image
              src="/LetsCook.png"
              width={50}
              height={50}
              alt="LetsCook"
            />
            <h1 className="font-bold text-[2em] text-white ml-3">LetsCook</h1>
          </span>
          <p className="mt-5 text-white">© {(new Date).getFullYear()} LetsCook Inc. All rights reserved.</p>
          <p className="mt-5 text-white">Made by Adeel Akhani & Haris Khawja</p>
          <p className="mt-5 text-white">Made with Next.js</p>
        </div>
      </body>
    </html>
  )
}