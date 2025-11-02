import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';
 
// Get the public routes that should be served without redirects
const publicPages = ['/logo.png', '/site.webmanifest'];
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['es'],
  // Used when no locale matches
  defaultLocale: 'es',
  // Always redirect to default locale
  localePrefix: 'always'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next|.*\\.[^/]*|logo.png|site.webmanifest).*)']
};

