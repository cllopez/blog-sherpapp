'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/60 backdrop-blur-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
            SherpApp
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className={`text-sm transition-colors ${
              isActive('/blog')
                ? 'text-emerald-600 dark:text-emerald-500'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50'
            }`}
            aria-current={isActive('/blog') ? 'page' : undefined}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`text-sm transition-colors ${
              isActive('/about')
                ? 'text-emerald-600 dark:text-emerald-500'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50'
            }`}
            aria-current={isActive('/about') ? 'page' : undefined}
          >
            Sobre nosotros
          </Link>
          <Link
            href="/admin"
            className={`text-sm transition-colors ${
              isActive('/admin')
                ? 'text-emerald-600 dark:text-emerald-500'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50'
            }`}
            aria-current={isActive('/admin') ? 'page' : undefined}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
