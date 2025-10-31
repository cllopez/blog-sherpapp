'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="text-center py-4 border-t border-gray-200 text-sm opacity-60">
      {t('site.footer.copyright', { year: new Date().getFullYear() })}
    </footer>
  );
}