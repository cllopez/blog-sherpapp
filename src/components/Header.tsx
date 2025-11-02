'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const localeHref = `/${locale}${href}`;
  const isActive = pathname === localeHref;

  return (
    <Link
      href={localeHref}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? 'text-primary-700 font-semibold'
          : 'text-primary-500 hover:text-primary-700'
      }`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();

  return (
    <header className="sticky top-6 z-50 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 rounded-2xl border border-neutral-100 bg-white/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] px-8">
          
          {/* LOGO */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src="/logo-sherpapp.svg"
              alt="SherpApp Logo"
              width={36}
              height={36}
            />
            <span className="font-bold text-xl text-primary-700">
              SherpApp
            </span>
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/caracteristicas">{t('features')}</NavLink>
            <NavLink href="/beneficios">{t('benefits')}</NavLink>
            <NavLink href="/planes">{t('plans')}</NavLink>
            <NavLink href="/faq">{t('faq')}</NavLink>
            <NavLink href="/contacto">{t('contact')}</NavLink>
          </nav>

          {/* BOTÓN */}
          <Link
            href={`/${locale}/registro`}
            className="rounded-lg bg-primary-700 text-white px-5 py-2.5 font-semibold text-sm hover:bg-primary-800 transition-all"
          >
            {t('start')}
          </Link>
        </div>
      </div>
    </header>
  );
}
