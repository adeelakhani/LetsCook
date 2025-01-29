import Link from 'next/link'

const links = [
  {name : "Login", href : "/login"}
]

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <html>
      <body>
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
        {children}
      </body>
    </html>
  )
}