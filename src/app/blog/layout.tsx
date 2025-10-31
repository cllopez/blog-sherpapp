import { Suspense } from 'react';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Suspense fallback={<div className="py-12 text-center">Cargando...</div>}>
        {children}
      </Suspense>
    </div>
  );
}