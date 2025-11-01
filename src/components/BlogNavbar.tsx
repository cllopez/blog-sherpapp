'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type BlogNavbarProps = {
  translations: {
    blog: string;
    productivity: string;
    study: string;
    wellness: string;
    technology: string;
  };
};

export default function BlogNavbar({ translations }: BlogNavbarProps) {
  const pathname = usePathname();
  
  const routes = [
    { path: '/blog', label: translations.blog },
    { path: '/blog/category/productivity', label: translations.productivity },
    { path: '/blog/category/study', label: translations.study },
    { path: '/blog/category/wellness', label: translations.wellness },
    { path: '/blog/category/technology', label: translations.technology }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex gap-6 md:gap-10">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.path
                  ? "text-foreground font-semibold"
                  : "text-foreground/60"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}