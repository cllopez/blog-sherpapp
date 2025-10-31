import { getRequestConfig } from 'next-intl/server';

export const locales = ['es'] as const;
export const defaultLocale = 'es' as const;
export type SupportedLocale = typeof locales[number];

export const languages = {
  es: 'Español',
} as const;

export function getLocaleFromPathname(pathname: string): string | undefined {
  const segments = pathname.split('/');
  const localeInPath = segments[1];
  return locales.includes(localeInPath as any) ? localeInPath : undefined;
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const localeInPath = segments[1];
  
  if (locales.includes(localeInPath as any)) {
    segments.splice(1, 1);
    return segments.join('/') || '/';
  }
  
  return pathname;
}

export default async function getI18nConfig({ locale }: { locale: string | undefined }) {
  // Validate that the incoming locale is supported
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  try {
    // Load messages for the requested locale
    const messages = (await import(`./es.json`)).default;

    return getRequestConfig({
      locale,
      messages,
      defaultTranslationValues: {
        year: new Date().getFullYear()
      }
    });
  } catch (error) {
    console.error('Error loading messages:', error);
    
    // Fallback to default locale
    const defaultMessages = (await import(`./es.json`)).default;
    return getRequestConfig({
      locale: defaultLocale,
      messages: defaultMessages,
      defaultTranslationValues: {
        year: new Date().getFullYear()
      }
    });
  }
}