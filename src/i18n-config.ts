import { defaultLocale } from '../navigation';

export async function getMessages() {
  const messages = await import(`@/i18n/${defaultLocale}.json`);
  return {
    messages: messages.default,
    locale: defaultLocale
  };
}

export function getLocale() {
  return defaultLocale;
}