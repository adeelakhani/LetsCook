import Link from 'next/link'

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