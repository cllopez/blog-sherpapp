import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales} from '../../../navigation';

export default async function i18n({locale}: {locale: string}) {
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  const messages = await import(`../../../src/i18n/${locale}.json`)
    .then(module => module.default)
    .catch(() => ({}));

  return {
    locale,
    messages,
    timeZone: 'Europe/Madrid',
    now: new Date(),
    defaultLocale,
    locales
  };
}