import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/signin', // Custom sign-in page
    },
  }
)

export const config = {
  matcher: [
    '/',
    '/leads/:path*',
    '/outreach/:path*',
    '/templates/:path*',
    '/research/:path*',
    '/settings/:path*',
  ],
}
