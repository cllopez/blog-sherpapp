import createMiddleware from 'next-intl/middleware';
import {defaultLocale, locales} from './navigation';

// Configuración específica para next-intl middleware
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never'
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /images (static images)
     * - /favicon.ico (favicon file)
     */
    '/((?!api|_next|images|favicon.ico).*)',
  ]
};

