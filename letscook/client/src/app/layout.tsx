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
      </body>
    </html>
  )
}