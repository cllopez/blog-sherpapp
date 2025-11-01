export const languageList = {
  es: 'Español',
  en: 'English'
} as const;

export type Messages = {
  site: {
    title: string;
    description: string;
    footer: {
      copyright: string;
    };
  };
  navigation: {
    home: string;
    blog: string;
    categories: {
      label: string;
      items: Record<string, string>;
    };
    admin: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
    };
    blog: {
      latestTitle: string;
      viewAll: string;
      readMore: string;
    };
  };
  blog: {
    meta: {
      title: string;
      description: string;
    };
    post: {
      publishedOn: string;
      by: string;
      defaultAuthor: string;
      backToBlog: string;
      categories: string;
      relatedPosts: string;
    };
  };
  admin: {
    meta: {
      title: string;
      description: string;
    };
    actions: {
      new: string;
      edit: string;
      delete: string;
      save: string;
      cancel: string;
    };
    form: {
      title: string;
      slug: string;
      date: string;
      author: string;
      excerpt: string;
      content: string;
      tags: string;
      placeholders: Record<string, string>;
    };
    messages: {
      saved: string;
      deleted: string;
      error: string;
      confirmDelete: string;
    };
  };
  categories: Record<string, {
    title: string;
    description: string;
    difficulty?: string;
    features?: string[];
  }>;
  common: {
    loading: string;
    error: string;
    success: string;
    required: string;
    optional: string;
  };
    natvar: {
    loading: string;
    error: string;
    success: string;
    required: string;
    optional: string;
  };
};

export type TranslationKey = keyof Messages | string;

export const defaultLocale: Language = 'es';

export const locales: Language[] = ['es', 'en'];
export type Language = 'es' | 'en';

export function buildTranslator(messages: Messages) {
  return function translate(
    key: string,
    vars?: Record<string, string | number>
  ): string {
    // Split the key by dots to access nested properties
    const parts = key.split('.');
    let value: any = messages;

    // Navigate through nested objects
    for (const part of parts) {
      if (value == null || typeof value !== 'object') {
        return `Missing translation: ${key}`;
      }
      value = value[part];
    }

    if (typeof value !== 'string') {
      return `Invalid translation type for: ${key}`;
    }

    // Replace variables if they exist
    if (vars) {
      return value.replace(/\{(\w+)\}/g, (_: string, p1: string) =>
        String(vars[p1] ?? `{${p1}}`)
      );
    }

    return value;
  };
}



export async function loadMessages(lang: Language): Promise<Messages> {
  try {
    const messages = (await import(`./${lang}.json`)).default;
    return messages as Messages;
  } catch (error) {
    console.error(`Failed to load messages for language: ${lang}`, error);
    return createEmptyMessages();
  }
}

function createEmptyMessages(): Messages | PromiseLike<Messages> {
    throw new Error("Function not implemented.");
}
