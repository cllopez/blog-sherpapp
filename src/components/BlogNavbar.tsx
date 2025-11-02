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
    <nav className="sticky top-16 z-30 w-full border-b border-gray-200 bg-white/95 shadow-sm">
      <div className="container mx-auto flex h-12 items-center px-4">
        <div className="flex gap-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`relative text-sm font-medium transition-all duration-200 ${
                pathname === route.path
                  ? "text-purple-600 before:absolute before:-bottom-[17px] before:left-0 before:h-[2px] before:w-full before:bg-purple-600 before:transition-all"
                  : "text-gray-600 hover:text-gray-900 hover:text-purple-600"
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