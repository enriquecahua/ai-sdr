
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI SDR - Sales Development Representative Tool',
  description: 'Comprehensive lead qualification and outreach management platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          {session ? (
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                  {children}
                </div>
              </main>
            </div>
          ) : (
            <>{children}</>
          )}
        </Providers>
      </body>
    </html>
  )
}
