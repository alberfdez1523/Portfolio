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

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es';

  const stored = localStorage.getItem('portfolio-lang') as Lang | null;
  return stored === 'es' || stored === 'en' ? stored : 'es';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  /* Sincronizar atributo lang del html + persistencia */
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
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
