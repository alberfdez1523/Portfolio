/* ================================================================
   LanguageContext — Contexto de idioma ES / EN
   ================================================================ */

'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Lang, type Translations } from '@/lib/i18n';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  toggleLang: () => {},
  t: translations.es,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');

  /* Leer preferencia guardada + sincronizar atributo lang del html */
  useEffect(() => {
    const stored = localStorage.getItem('portfolio-lang') as Lang | null;
    if (stored === 'es' || stored === 'en') {
      setLang(stored);
      document.documentElement.setAttribute('lang', stored);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('portfolio-lang', next);
      document.documentElement.setAttribute('lang', next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
