// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { verifyToken } from '@/app/lib/jwt';

// const protectedRoutes = ['@/app/dashboard'];

// export function middleware(req: NextRequest) {
//     const { pathname } = req.nextUrl;

//     if (protectedRoutes.some(route => pathname.startsWith(route))) {
//     const token = req.cookies.get('token')?.value;
//     const decoded = token ? verifyToken(token) : null;

//     if (!decoded) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
//     }

//     return NextResponse.next();
// }

// // Apply middleware only to these routes
// export const config = {
//   matcher: ['@/app/dashboard'],
// };

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/app/lib/jwt';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // If accessing a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // If no token and not on a public path, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Token is valid, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

