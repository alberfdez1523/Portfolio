/* ================================================================
   Footer — Pie de página
   ================================================================ */

'use client';

import { SOCIAL_LINKS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      role="contentinfo"
      className="border-t border-noir-border py-12 md:py-16"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <a href="#home" className="font-serif text-xl italic text-cream hover:text-accent transition-colors duration-300">
              {t.footer.brand}
            </a>
            <p className="font-mono text-xs text-cream-muted mt-3">{t.footer.copyright}</p>
          </div>
          <div className="md:col-span-4">
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-muted mb-4">{t.footer.navigation}</h3>
            <ul className="space-y-2" role="list">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-mono text-xs text-cream-dim hover:text-cream transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:text-right">
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-muted mb-4">{t.footer.social}</h3>
            <div className="flex md:justify-end gap-4 mb-8">
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-cream-dim hover:text-accent transition-colors duration-300">LinkedIn</a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-cream-dim hover:text-accent transition-colors duration-300">GitHub</a>
            </div>
            <p className="font-mono text-[10px] text-cream-muted">{t.footer.madeWith}</p>
            <p className="font-mono text-[10px] text-cream-muted mt-1">{t.footer.builtWith}</p>
            <a href="#home" className="inline-flex items-center gap-2 font-mono text-xs text-cream-dim hover:text-cream mt-6 transition-colors duration-300" aria-label="Volver arriba">
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
