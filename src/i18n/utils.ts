import { createTranslator } from 'next-intl';
import type { Messages } from './translations';

// Los tipos de idiomas soportados
export type Language = 'es' | 'en';

// Tipo para las props de idioma
export interface LanguageProps {
  currentLang: Language;
}

// Tipo para las variables de traducción
export type TranslationVars = Record<string, string | number | Date>;

// Cache para los traductores síncronos
const translatorCache = new Map<Language, (key: string, vars?: TranslationVars) => string>();

/**
 * Crea un traductor síncrono para un idioma específico
 * @param lang - El idioma para el cual crear el traductor
 */
export function createTranslatorSync(lang: Language) {
  if (translatorCache.has(lang)) {
    return translatorCache.get(lang)!;
  }

  // Cargar los mensajes de forma síncrona
  let messages: Messages;
  try {
    messages = require(`./${lang}.json`);
  } catch (error) {
    console.error(`No se pudieron cargar las traducciones para ${lang}`, error);
    messages = {};
  }

  // Crear el traductor con el tipo correcto
  const translate = createTranslator<Messages>({ locale: lang, messages });
  
  // Crear una función wrapper que maneja los errores
  const safeTranslate = (key: string, vars?: TranslationVars) => {
    try {
      return translate(key as keyof Messages, vars);
    } catch (error) {
      console.error(`Error al traducir la clave "${key}"`, error);
      return key; // Fallback al key original
    }
  };

  // Guardar en cache
  translatorCache.set(lang, safeTranslate);
  
  return safeTranslate;
}

/**
 * Hook personalizado para obtener un traductor
 * @param namespace - Namespace opcional para las traducciones
 */
export function useTranslator(namespace?: string) {
  const messages = require('./es.json') as Messages;
  const t = createTranslator<Messages>({ locale: 'es', messages });
  
  return namespace 
    ? (key: string, vars?: TranslationVars) => t((namespace + '.' + key) as keyof Messages, vars)
    : (key: string, vars?: TranslationVars) => t(key as keyof Messages, vars);
}