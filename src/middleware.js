// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Example: Redirect unauthenticated users from a protected route
  const { pathname } = request.nextUrl
  const isAuthenticated = checkAuthStatus(request) // Your authentication logic

  // Skip middleware for public routes to avoid unnecessary processing
  const publicRoutes = [
    '/login',
  ]

  const protectedPages = [
    '/dashboard',
    '/positions-management'
  ]

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route) || pathname === '/'
  )

  // Check if page is protected and user has no token
  const isProtectedPage = protectedPages.some(page =>
    pathname === page || pathname.startsWith(`${page}/`)
  )

  if (!isAuthenticated && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}

function checkAuthStatus(request) {
  const cookies = request.cookies.get('token_account_tandeem') || null
  // Implement your authentication check (e.g., check cookies, tokens)
  return cookies ? true : false // Placeholder
}