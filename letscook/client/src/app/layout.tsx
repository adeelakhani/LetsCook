import Link from 'next/link'
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
        <div className="bg-orange-700 text-center flex-col pt-5 pb-5">
          <p className="mt-5 text-white">© {(new Date).getFullYear()} LetsCook Inc. All rights reserved.</p>
          <p className="mt-5 text-white">Made by Adeel Akhani & Haris Khawja</p>
          <p className="mt-5 text-white">Made with Next.js</p>
        </div>
      </body>
    </html>
  )
}