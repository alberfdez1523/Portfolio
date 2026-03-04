/* ================================================================
   Projects — Sección de proyectos destacados
   ================================================================
   Tarjetas full-width tipo "case study" con número editorial,
   título grande, descripción, tags y link a GitHub.
   
   Decisión: cards full-width en lugar de grid pequeño — con un solo
   proyecto real, una card grande tiene más impacto que una cuadrícula
   medio vacía. Escalable: al añadir proyectos, se apila naturalmente.
   ================================================================ */

'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="py-24 md:py-32 lg:py-40"
      aria-labelledby="projects-heading"
    >
      <div className="container-editorial">
        <SectionHeading label={t.projects.label} title={t.projects.title} />

        {/* Link a ver todos los proyectos en GitHub */}
        <div className="flex justify-end mb-12">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-cream-dim hover:text-accent transition-colors duration-300"
          >
            {t.projects.viewAll}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-8">
          {t.projects.items.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              prefersReduced={prefersReduced}
              viewOnGithub={t.projects.viewOnGithub}
              projectPrefix={t.projects.projectPrefix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ProjectCard — Tarjeta individual de proyecto
   ================================================================ */

interface ProjectCardProps {
  project: { title: string; description: string; tags: string[]; github: string; number: string };
  prefersReduced: boolean;
  viewOnGithub: string;
  projectPrefix: string;
}

function ProjectCard({ project, prefersReduced, viewOnGithub, projectPrefix }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced || !cardRef.current) return;

    /* Animación sutil: la card se eleva ligeramente al entrar en viewport
       usando GSAP para mayor control */
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <article
      ref={cardRef}
      className="group relative border border-noir-border hover:border-cream-muted/30 transition-colors duration-700 overflow-hidden"
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-8 md:p-12 lg:p-16"
        aria-label={`Ver proyecto: ${project.title} en GitHub`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Número editorial grande — decorativo */}
          <div className="md:col-span-2">
            <span className="font-serif text-6xl md:text-8xl italic text-noir-border group-hover:text-accent/20 transition-colors duration-700">
              {project.number}
            </span>
          </div>

          {/* Contenido principal */}
          <div className="md:col-span-7">
            {/* Etiqueta */}
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3 block">
              {projectPrefix} {project.number}
            </span>

            {/* Título del proyecto */}
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-cream mb-4 leading-tight group-hover:text-accent transition-colors duration-500">
              {project.title}
            </h3>

            {/* Descripción */}
            <p className="text-cream-dim text-base leading-relaxed mb-6 max-w-2xl">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 bg-noir-surface border border-noir-border text-cream-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA — flecha que se anima al hover */}
          <div className="md:col-span-3 flex md:justify-end md:items-start">
            <span className="font-mono text-xs tracking-wider uppercase text-cream-dim group-hover:text-accent flex items-center gap-2 transition-colors duration-300">
              {viewOnGithub}
              <motion.span
                className="inline-block text-lg"
                animate={!prefersReduced ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
          </div>
        </div>

        {/* Línea de acento inferior — se expande al hover */}
        <div
          className="absolute bottom-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-1000 ease-out"
          aria-hidden="true"
        />
      </a>
    </article>
  );
}
