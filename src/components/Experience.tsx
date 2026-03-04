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
      className="py-24 md:py-32 lg:py-40"
      aria-labelledby="experience-heading"
    >
      <div className="container-editorial">
        <SectionHeading label={t.experience.label} title={t.experience.title} />

        {/* Timeline container */}
        <div className="relative">
          {/* Línea vertical del timeline — decorativa */}
          <div
            className="absolute left-0 md:left-50 lg:left-60 top-0 bottom-0 w-px bg-noir-border"
            aria-hidden="true"
          />

          {/* Items del timeline */}
          <div className="space-y-16 md:space-y-20">
            {t.experience.items.map((exp, index) => (
              <AnimatedText key={exp.company} delay={index * 0.15}>
                <article className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 md:gap-12">
                  {/* Columna izquierda: fecha + empresa */}
                  <div className="md:text-right md:pr-12 relative">
                    {/* Punto en la línea del timeline */}
                    <div
                      className="hidden md:block absolute right-0 top-2 w-2 h-2 bg-accent translate-x-[4.5px]"
                      aria-hidden="true"
                    />
                    <p className="font-mono text-xs tracking-wider text-accent mb-1">
                      {exp.period}
                    </p>
                    <p className="font-mono text-xs text-cream-muted">
                      {exp.company}
                    </p>
                  </div>

                  {/* Columna derecha: título + descripción + tags */}
                  <div className="md:pl-12 md:border-l md:border-transparent">
                    <h3 className="font-serif text-2xl md:text-3xl italic text-cream mb-4">
                      {exp.title}
                    </h3>
                    <p className="text-cream-dim text-base leading-relaxed mb-6 max-w-2xl">
                      {exp.description}
                    </p>
                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
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
        </div>
      </div>
    </section>
  );
}
