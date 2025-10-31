import { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Blog | SherpApp',
  description: 'Recursos, guías y consejos para optimizar tu estudio y alcanzar tus metas académicas.',
};

import BlogNavbar from '@/components/BlogNavbar';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.variable} font-sans`}>
      <BlogNavbar />
      <main className="min-h-screen bg-gray-50 pt-16">
        {children}
      </main>
    </div>
  );
}