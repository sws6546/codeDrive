import './globals.css'
import type { Metadata } from 'next'
import Background from '@/components/Background'

export const metadata: Metadata = {
  title: 'e_dysk',
  description: 'e_dysk made with Next.js :D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className='font-mono'>
        <Background />
        {children}
      </body>
    </html>
  )
}
