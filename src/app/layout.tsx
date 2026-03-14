/* ================================================================
   Layout raíz — Configuración global del portfolio
   ================================================================
   Define las fuentes locales del portfolio,
   metadata SEO, y envuelve la app con el LenisProvider para
   scroll suave global.
   ================================================================ */

import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import LenisProvider from '@/components/LenisProvider';
import Providers from '@/components/Providers';
import SkipLink from '@/components/SkipLink';
import './globals.css';

/* === FUENTES ===
   Instrument Serif: display/headings editorial
   Inter: body/UI
   Geist Mono: labels y microcopy */
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap', // Evita FOIT (Flash of Invisible Text)
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

/* === METADATA SEO ===
   Título, descripción y Open Graph para compartir en redes */
export const metadata: Metadata = {
  title: 'Alberto Fernández — Ingeniero de Software & IA',
  description:
    'Portfolio de Alberto Fernández. Ingeniero de Software, Investigador en IA y Quantum Machine Learning. Máster en Inteligencia Artificial @ UAX.',
  icons: {
    icon: '/icon.png',
  },
  keywords: [
    'Alberto Fernández',
    'Ingeniero Software',
    'IA',
    'Machine Learning',
    'Quantum Computing',
    'Portfolio',
  ],
  authors: [{ name: 'Alberto Fernández' }],
  openGraph: {
    title: 'Alberto Fernández — Ingeniero de Software & IA',
    description:
      'Portfolio de Alberto Fernández. Ingeniero de Software, Investigador en IA y Quantum Machine Learning.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        {/* Providers: contextos de idioma + tema */}
        <Providers>
          <SkipLink />
          {/* LenisProvider activa el scroll suave + sync con GSAP ScrollTrigger */}
          <LenisProvider>
            {children}
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
