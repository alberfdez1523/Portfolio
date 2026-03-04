/* Envuelve la app con los contextos de idioma y tema */

'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
