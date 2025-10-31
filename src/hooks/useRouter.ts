'use client';

import { useRouter as useNextRouter, usePathname } from 'next/navigation';

export function useRouter() {
  const router = useNextRouter();
  const pathname = usePathname();

  return {
    push: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    back: () => router.back(),
    refresh: () => router.refresh(),
    pathname
  };
}