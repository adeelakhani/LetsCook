import Link from 'next/link'
import "@fontsource/inter"; // Defaults to 400 (Regular)

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}