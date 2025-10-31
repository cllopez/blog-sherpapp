import { locales, defaultLocale } from '../../navigation';
import { loadMessages, buildTranslator, type Language } from './translations';

export default async function getMessages({ locale }: { locale: string }) {
  // Use default locale if the requested one is not valid
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;

  try {
    // Load messages for the requested locale
    const messages = await loadMessages(validLocale as Language);
    
    // Create translator function
    const t = buildTranslator(messages);

    // Return the configuration object
    return {
      messages,
      // Add the translator function to the request context
      getTranslations: () => ({
        t: (key: string, vars?: Record<string, string | number>) => t(key, vars)
      }),
      timeZone: 'Europe/Madrid'
    };
  } catch (error) {
    console.error(`Error loading translations for locale: ${validLocale}`, error);
    
    // En caso de error, intentar cargar el locale por defecto
    const defaultMessages = await loadMessages(defaultLocale as Language);
    const defaultT = buildTranslator(defaultMessages);
    
    return {
      messages: defaultMessages,
      getTranslations: () => ({
        t: (key: string, vars?: Record<string, string | number>) => defaultT(key, vars)
      }),
      timeZone: 'Europe/Madrid'
    };
  }
}