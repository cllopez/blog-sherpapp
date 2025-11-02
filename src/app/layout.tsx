import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://sherpapp.es'),
  title: {
    template: '%s | SherpApp',
    default: 'SherpApp - Consejos y experiencias para estudiantes'
  },
  description: 'Consejos, experiencias reales y buenas prácticas para organizarte mejor y rendir al máximo.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'SherpApp'
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport = {
  themeColor: '#7c3aed'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
