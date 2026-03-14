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
      className="py-20 md:py-32 lg:py-40 bg-noir-light"
      aria-labelledby="education-heading"
    >
      <div className="container-editorial">
        <SectionHeading id="education-heading" label={t.education.label} title={t.education.title} />

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div
            className="absolute top-0 bottom-0 hidden w-px bg-noir-border md:block md:left-50 lg:left-60"
            aria-hidden="true"
          />

          <div className="space-y-10 sm:space-y-14 md:space-y-20">
            {t.education.items.map((edu, index) => (
              <AnimatedText key={edu.institution} delay={index * 0.15}>
                <article className="relative grid grid-cols-1 gap-5 border-l border-noir-border pl-5 sm:pl-6 md:grid-cols-[200px_1fr] md:gap-12 md:border-l-0 md:pl-0 lg:grid-cols-[240px_1fr]">
                  {/* Izquierda: periodo + institución */}
                  <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 md:block md:text-right md:pr-12">
                    <div
                      className="hidden md:block absolute right-0 top-2 w-2 h-2 bg-accent translate-x-[4.5px]"
                      aria-hidden="true"
                    />
                    <div className="mb-1 flex flex-wrap items-center gap-2 md:justify-end">
                      <p className="font-mono text-sm tracking-[0.12em] text-accent">
                        {edu.period}
                      </p>
                      {/* Badge "En curso" para estudios actuales */}
                      {edu.current && (
                        <span className="inline-flex items-center gap-1 border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-xs tracking-[0.12em] text-accent uppercase">
                          {t.education.currentBadge}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-sm text-cream-muted">
                      {edu.institution}
                    </p>
                  </div>

                  {/* Derecha: contenido */}
                  <div className="md:pl-12">
                    <h3 className="font-display text-2xl md:text-3xl text-cream mb-4 leading-[0.96]">
                      {edu.title}
                    </h3>
                    <p className="mb-6 max-w-2xl text-lg leading-relaxed text-cream-dim">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-noir-border bg-noir-surface px-3 py-1 font-mono text-xs tracking-[0.12em] text-cream-muted uppercase"
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
            <div className="mt-14 flex items-center gap-4 border-l border-noir-border pl-5 sm:pl-6 md:mt-20 md:ml-50 md:border-l-0 md:pl-12 lg:ml-60">
              <span className="text-2xl" aria-hidden="true">🎓</span>
              <div>
                <p className="font-display text-lg text-cream">
                  {t.education.alwaysLearning}
                </p>
                <p className="mt-1 font-mono text-sm text-cream-muted">
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
