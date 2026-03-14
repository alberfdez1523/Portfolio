/* ================================================================
   Experience — Sección de experiencia laboral
   ================================================================
   Layout tipo timeline editorial: fecha a la izquierda, contenido
   a la derecha, con línea vertical conectora.
   
   Decisión: timeline vertical con asimetría (fecha/contenido) en
   lugar de cards centradas — más editorial y legible.
   ================================================================ */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from './SectionHeading';
import AnimatedText from './AnimatedText';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      className="py-20 md:py-32 lg:py-40"
      aria-labelledby="experience-heading"
    >
      <div className="container-editorial">
        <SectionHeading id="experience-heading" label={t.experience.label} title={t.experience.title} />

        {/* Timeline container */}
        <div className="relative">
          {/* Línea vertical del timeline — decorativa */}
          <div
            className="absolute top-0 bottom-0 hidden w-px bg-noir-border md:block md:left-50 lg:left-60"
            aria-hidden="true"
          />

          {/* Items del timeline */}
          <div className="space-y-10 sm:space-y-14 md:space-y-20">
            {t.experience.items.map((exp, index) => (
              <AnimatedText key={exp.company} delay={index * 0.15}>
                <article className="relative grid grid-cols-1 gap-5 border-l border-noir-border pl-5 sm:pl-6 md:grid-cols-[200px_1fr] md:gap-12 md:border-l-0 md:pl-0 lg:grid-cols-[240px_1fr]">
                  {/* Columna izquierda: fecha + empresa */}
                  <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 md:block md:text-right md:pr-12">
                    {/* Punto en la línea del timeline */}
                    <div
                      className="hidden md:block absolute right-0 top-2 w-2 h-2 bg-accent translate-x-[4.5px]"
                      aria-hidden="true"
                    />
                    <p className="mb-1 font-mono text-sm tracking-[0.12em] text-accent">
                      {exp.period}
                    </p>
                    <p className="font-mono text-sm text-cream-muted">
                      {exp.company}
                    </p>
                  </div>

                  {/* Columna derecha: título + descripción + tags */}
                  <div className="md:pl-12 md:border-l md:border-transparent">
                    <h3 className="font-display text-2xl md:text-3xl text-cream mb-4 leading-[0.96]">
                      {exp.title}
                    </h3>
                    <p className="mb-6 max-w-2xl text-lg leading-relaxed text-cream-dim">
                      {exp.description}
                    </p>
                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
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
        </div>
      </div>
    </section>
  );
}
