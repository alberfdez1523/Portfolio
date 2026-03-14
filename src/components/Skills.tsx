/* ================================================================
   Skills — Sección de habilidades / Tech Stack
   ================================================================
   Grid de tarjetas minimalistas agrupadas por categoría.
   Cada card tiene icono, nombre, categoría y descripción on hover.
   
   Decisión: grid fijo en lugar de carrusel horizontal para mejor
   accesibilidad y compatibilidad con screen readers.
   ================================================================ */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES, type SkillCategory } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import SectionHeading from './SectionHeading';
import AnimatedText from './AnimatedText';

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory | null>(null);
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  const filteredSkills = activeFilter
    ? t.skills.items.filter((s) => s.category === activeFilter)
    : t.skills.items;

  return (
    <section
      id="skills"
      className="py-20 md:py-32 lg:py-40 bg-noir-light"
      aria-labelledby="skills-heading"
    >
      <div className="container-editorial">
        <SectionHeading
          id="skills-heading"
          label={t.skills.label}
          title={t.skills.title}
        />

        {/* Subtítulo descriptivo */}
        <AnimatedText delay={0.1} className="mb-12">
          <p className="max-w-2xl text-lg text-cream-dim md:text-xl">
            {t.skills.subtitle}
          </p>
        </AnimatedText>

        {/* === Filtros por categoría === */}
        <AnimatedText delay={0.2} className="mb-10 md:mb-12">
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filtrar por categoría">
            {/* Botón "Todas" */}
            <button
              onClick={() => setActiveFilter(null)}
              className={`shrink-0 border px-4 py-2 font-mono text-sm tracking-[0.12em] uppercase transition-colors duration-300 ${
                activeFilter === null
                  ? 'bg-cream text-noir border-cream'
                  : 'bg-transparent text-cream-dim border-noir-border hover:border-cream-muted'
              }`}
              aria-pressed={activeFilter === null}
            >
              {t.skills.allFilter}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 border px-4 py-2 font-mono text-sm tracking-[0.12em] uppercase transition-colors duration-300 ${
                  activeFilter === cat
                    ? 'bg-cream text-noir border-cream'
                    : 'bg-transparent text-cream-dim border-noir-border hover:border-cream-muted'
                }`}
                aria-pressed={activeFilter === cat}
              >
                {t.skills.categories[cat] || cat}
              </button>
            ))}
          </div>
        </AnimatedText>

        {/* === Grid de skills === */}
        <motion.div
          layout={!prefersReduced}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.article
                key={skill.name}
                layout={!prefersReduced}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                /* Tarjeta: fondo surface + borde sutil, hover reveal descripción */
                className="group relative p-6 bg-noir-surface border border-noir-border hover:border-cream-muted/30 transition-colors duration-500"
              >
                {/* Header de la card */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {/* Categoría — etiqueta mono pequeña */}
                    <span className="font-mono text-xs tracking-[0.16em] uppercase text-accent">
                      {skill.category}
                    </span>
                    {/* Nombre de la tecnología — enlace a página oficial */}
                    <h3 className="font-display text-xl text-cream mt-1">
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors duration-300 underline decoration-noir-border hover:decoration-accent underline-offset-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {skill.name}
                      </a>
                    </h3>
                  </div>
                  {/* Icono decorativo */}
                  <span className="text-2xl" aria-hidden="true">
                    {skill.icon}
                  </span>
                </div>

                {/* Descripción — visible siempre, opacity baja hasta hover */}
                <p className="font-mono text-sm leading-relaxed text-cream-muted transition-colors duration-500 group-hover:text-cream-dim">
                  {skill.description}
                </p>

                {/* Línea de acento inferior que se revela al hover */}
                <div
                  className="absolute bottom-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out"
                  aria-hidden="true"
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
