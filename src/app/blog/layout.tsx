import { Suspense } from 'react';
import BlogNavbar from '../../components/BlogNavbar';
import { getTranslations } from 'next-intl/server';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('navigation');
  const categories = await getTranslations('navigation.categories.items');

  return (
    <div>
      <BlogNavbar translations={{ 
        blog: t('blog'),
        productivity: categories('productivity'),
        study: categories('study'),
        wellness: categories('wellness'),
        technology: categories('technology')
      }} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="py-12 text-center">{t('loading')}</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}