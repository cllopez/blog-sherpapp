import { createTranslator } from 'next-intl';

export const locales = ['es'] as const;
export const defaultLocale = 'es' as const;

export type SupportedLocale = typeof locales[number];