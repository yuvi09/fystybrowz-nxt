import { Prata } from 'next/font/google';

const prata = Prata({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'FYSTYBROWZ - Permanent Makeup & Cosmetic Tattoo Artist',
  description: 'Premier destination for all permanent makeup needs in Walpole, Massachusetts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={prata.className}>
      <head>
        <link rel="stylesheet" href="/styles.css" />
        <script src="/script.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
