'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={
        isActive 
          ? "text-sm font-medium text-foreground font-semibold"
          : "text-sm font-medium text-foreground/60 hover:text-primary"
      }
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const t = useTranslations();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🧭</span>
          <span className="font-bold text-xl">{t('site.title')}</span>
        </Link>
        <nav className="flex items-center space-x-8">
          <NavLink href="/blog">{t('navigation.blog')}</NavLink>
          <NavLink href="/about">{t('navigation.about')}</NavLink>
          <NavLink href="/admin">{t('navigation.admin')}</NavLink>
        </nav>
      </div>
    </header>
  );
}