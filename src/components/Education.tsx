/* ================================================================
   Education — Sección de formación académica
   ================================================================
   Mismo patrón timeline que Experience, pero con badges de "En curso"
   y un call-out final sobre aprendizaje continuo.
   ================================================================ */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from './SectionHeading';
import AnimatedText from './AnimatedText';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section
      id="education"
      className="py-24 md:py-32 lg:py-40 bg-noir-light"
      aria-labelledby="education-heading"
    >
      <div className="container-editorial">
        <SectionHeading label={t.education.label} title={t.education.title} />

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div
            className="absolute left-0 md:left-50 lg:left-60 top-0 bottom-0 w-px bg-noir-border"
            aria-hidden="true"
          />

          <div className="space-y-16 md:space-y-20">
            {t.education.items.map((edu, index) => (
              <AnimatedText key={edu.institution} delay={index * 0.15}>
                <article className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 md:gap-12">
                  {/* Izquierda: periodo + institución */}
                  <div className="md:text-right md:pr-12 relative">
                    <div
                      className="hidden md:block absolute right-0 top-2 w-2 h-2 bg-accent translate-x-[4.5px]"
                      aria-hidden="true"
                    />
                    <div className="flex md:justify-end items-center gap-2 mb-1">
                      <p className="font-mono text-xs tracking-wider text-accent">
                        {edu.period}
                      </p>
                      {/* Badge "En curso" para estudios actuales */}
                      {edu.current && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 border border-accent/30 font-mono text-[10px] tracking-wider text-accent uppercase">
                          {t.education.currentBadge}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-cream-muted">
                      {edu.institution}
                    </p>
                  </div>

                  {/* Derecha: contenido */}
                  <div className="md:pl-12">
                    <h3 className="font-serif text-2xl md:text-3xl italic text-cream mb-4">
                      {edu.title}
                    </h3>
                    <p className="text-cream-dim text-base leading-relaxed mb-6 max-w-2xl">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 bg-noir-surface border border-noir-border text-cream-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </AnimatedText>
            ))}
          </div>

          {/* Call-out de aprendizaje continuo */}
          <AnimatedText delay={0.3}>
            <div className="mt-16 md:mt-20 md:ml-50 lg:ml-60 md:pl-12 flex items-center gap-4">
              <span className="text-2xl" aria-hidden="true">🎓</span>
              <div>
                <p className="font-serif text-lg italic text-cream">
                  {t.education.alwaysLearning}
                </p>
                <p className="font-mono text-xs text-cream-muted mt-1">
                  {t.education.currentlySpecializing}
                </p>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
