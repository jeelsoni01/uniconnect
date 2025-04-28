import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If the request is for an uploaded file
  if (request.nextUrl.pathname.startsWith('/uploads/')) {
    // Create a new response
    const response = NextResponse.next()
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/uploads/:path*',
} 