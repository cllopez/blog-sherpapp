import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'

export const metadata: Metadata = {
  metadataBase: new URL('https://sherpapp.es'),
  title: {
    template: '%s | SherpApp',
    default: 'SherpApp - Consejos y experiencias para estudiantes'
  },
  description: 'Consejos, experiencias reales y buenas prácticas para organizarte mejor y rendir al máximo.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'SherpApp'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
