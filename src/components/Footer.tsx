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
      className="border-t border-noir-border py-10 md:py-16"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <a href="#home" className="font-display text-xl text-cream hover:text-accent transition-colors duration-300">
              {t.footer.brand}
            </a>
            <p className="mt-3 font-mono text-sm text-cream-muted">{t.footer.copyright}</p>
          </div>
          <div className="md:col-span-4">
            <h3 className="mb-4 font-mono text-xs tracking-[0.16em] uppercase text-cream-muted">{t.footer.navigation}</h3>
            <ul className="space-y-2" role="list">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-mono text-sm text-cream-dim transition-colors duration-300 hover:text-cream">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:text-right">
            <h3 className="mb-4 font-mono text-xs tracking-[0.16em] uppercase text-cream-muted">{t.footer.social}</h3>
            <div className="mb-6 flex flex-wrap gap-4 md:justify-end md:mb-8">
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cream-dim transition-colors duration-300 hover:text-accent">LinkedIn</a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cream-dim transition-colors duration-300 hover:text-accent">GitHub</a>
            </div>
            <p className="font-mono text-xs text-cream-muted">{t.footer.madeWith}</p>
            <p className="mt-1 font-mono text-xs text-cream-muted">{t.footer.builtWith}</p>
            <a href="#home" className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-cream-dim transition-colors duration-300 hover:text-cream" aria-label="Volver arriba">
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
