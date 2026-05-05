import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/chiron-tracker')) {
    const authCookie = request.cookies.get('chiron_auth');
    const isAuthenticated = authCookie?.value === 'CHIRON_UNLOCKED';

    // Always allow the request through — auth is handled at the page level.
    // Middleware just stamps a header so the Server Component knows the cookie state
    // without needing to re-parse, keeping logic co-located and SSR-safe.
    const response = NextResponse.next();
    response.headers.set('x-chiron-auth', isAuthenticated ? '1' : '0');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chiron-tracker/:path*'],
};
