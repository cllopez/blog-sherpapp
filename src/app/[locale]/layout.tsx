import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'site' });
  return {
    title: t('title'),
    description: t('description')
  };
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../i18n/es.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return {};
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="bg-gray-50 text-gray-900">
        <Header />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}