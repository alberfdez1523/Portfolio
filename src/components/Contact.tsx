/* ================================================================
   Contact — Sección de contacto / CTA final
   ================================================================
   Diseño tipo "call to action" editorial: tipografía grande con
   invitación a contactar + links directos a redes sociales.
   
   Sin formulario de contacto — enlaza directamente a LinkedIn y
   GitHub como en el portfolio original. Más directo, menos fricción.
   ================================================================ */

'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    if (prefersReduced || !lineRef.current) return;

    /* Línea decorativa que se expande horizontalmente al entrar en viewport.
       Usa GSAP porque la animación de width escalonada se controla mejor. */
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="contact"
      className="py-20 md:py-32 lg:py-40 bg-noir"
      aria-labelledby="contact-heading"
    >
      <div className="container-editorial">
        {/* Línea decorativa animada */}
        <div
          ref={lineRef}
          className="w-full h-px bg-noir-border mb-16 md:mb-20 origin-left"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          {/* Columna izquierda: gran CTA editorial */}
          <div className="md:col-span-8">
            <AnimatedText>
              <span className="mb-6 block font-mono text-sm tracking-[0.24em] uppercase text-accent">
                {t.contact.label}
              </span>
            </AnimatedText>

            <AnimatedText id="contact-heading" delay={0.1} variant="clip" as="h2">
              <span className="font-display block text-[2.5rem] leading-[0.94] tracking-[-0.04em] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
                {t.contact.heading}
              </span>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <p className="mt-6 mb-10 max-w-xl text-lg leading-relaxed text-cream-dim md:text-xl">
                {t.contact.description}
              </p>
            </AnimatedText>

            {/* Botones de contacto */}
            <AnimatedText delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-2 font-mono text-sm tracking-wider uppercase bg-cream text-noir px-6 py-3 hover:bg-accent hover:text-cream transition-colors duration-300 sm:w-auto"
                >
                  LinkedIn
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center font-mono text-sm tracking-wider uppercase text-cream-dim hover:text-cream border-b border-cream-muted hover:border-cream pb-0.5 transition-colors duration-300 sm:w-auto"
                >
                  GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center font-mono text-sm tracking-wider uppercase text-cream-dim hover:text-cream border-b border-cream-muted hover:border-cream pb-0.5 transition-colors duration-300 sm:w-auto"
                >
                  {t.contact.downloadCV}
                </a>
              </div>
            </AnimatedText>
          </div>

          {/* Columna derecha: info contextual */}
          <div className="md:col-span-4 flex flex-col justify-end">
            <AnimatedText delay={0.5}>
              <div className="relative border border-noir-border bg-noir-light/70 px-6 py-7 md:px-8 md:py-9">
                <div className="absolute left-0 top-0 h-px w-24 bg-accent" aria-hidden="true" />
                <div className="space-y-8">
                {/* Status */}
                  <div>
                    <h3 className="mb-2 font-mono text-xs tracking-[0.16em] uppercase text-cream-muted">
                      {t.contact.statusLabel}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                      </span>
                      <span className="font-mono text-sm text-cream">
                        {t.hero.status}
                      </span>
                    </div>
                  </div>

                  {/* Ubicación / estudio actual */}
                  <div>
                    <h3 className="mb-2 font-mono text-xs tracking-[0.16em] uppercase text-cream-muted">
                      {t.contact.currentlyLabel}
                    </h3>
                    <p className="font-mono text-sm text-cream">
                      {t.hero.statusDetail}
                    </p>
                  </div>

                  {/* Roles */}
                  <div>
                    <h3 className="mb-2 font-mono text-xs tracking-[0.16em] uppercase text-cream-muted">
                      {t.contact.rolesLabel}
                    </h3>
                    <div className="space-y-1">
                      {t.hero.roles.map((role) => (
                        <p key={role} className="font-mono text-sm text-cream">
                          {role}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}
