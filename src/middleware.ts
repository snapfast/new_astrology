import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const isDev = process.env.NODE_ENV === 'development'

  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "https://www.googletagmanager.com",
    isDev ? "'unsafe-eval'" : ""
  ].filter(Boolean).join(" ")

  const cspHeader = `
    default-src 'self';
    script-src ${scriptSrc} https://www.instagram.com https://www.threads.net https://connect.facebook.net https://*.facebook.net https://*.facebook.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com https://cdnjs.cloudflare.com https://www.instagram.com https://*.facebook.com;
    img-src 'self' data: https://images.unsplash.com https://lh3.googleusercontent.com https://www.googletagmanager.com https://www.instagram.com https://*.fbcdn.net https://*.cdninstagram.com https://*.facebook.com;
    font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
    connect-src 'self' https://nominatim.openstreetmap.org https://www.google-analytics.com https://stats.g.doubleclick.net https://www.google.com https://www.googletagmanager.com https://www.threads.net https://*.facebook.com;
    frame-src 'self' https://www.instagram.com https://www.threads.net https://www.facebook.com https://*.facebook.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
  // Replace newline characters with spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
