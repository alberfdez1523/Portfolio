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
      className="py-24 md:py-32 lg:py-40 bg-noir"
      aria-labelledby="contact-heading"
    >
      <div className="container-editorial">
        {/* Línea decorativa animada */}
        <div
          ref={lineRef}
          className="w-full h-px bg-noir-border mb-16 md:mb-20 origin-left"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Columna izquierda: gran CTA editorial */}
          <div className="md:col-span-8">
            <AnimatedText>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent block mb-6">
                {t.contact.label}
              </span>
            </AnimatedText>

            <AnimatedText delay={0.1} variant="clip" as="h2">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-cream leading-tight block">
                {t.contact.heading}
              </span>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <p className="text-cream-dim text-base md:text-lg leading-relaxed max-w-xl mt-6 mb-10">
                {t.hero.bio}
              </p>
            </AnimatedText>

            {/* Botones de contacto */}
            <AnimatedText delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-sm tracking-wider uppercase bg-cream text-noir px-6 py-3 hover:bg-accent hover:text-cream transition-colors duration-300"
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
                  className="font-mono text-sm tracking-wider uppercase text-cream-dim hover:text-cream border-b border-cream-muted hover:border-cream pb-0.5 transition-colors duration-300"
                >
                  GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm tracking-wider uppercase text-cream-dim hover:text-cream border-b border-cream-muted hover:border-cream pb-0.5 transition-colors duration-300"
                >
                  Descargar CV
                </a>
              </div>
            </AnimatedText>
          </div>

          {/* Columna derecha: info contextual */}
          <div className="md:col-span-4 flex flex-col justify-end">
            <AnimatedText delay={0.5}>
              <div className="space-y-8">
                {/* Status */}
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-muted mb-2">
                    {t.contact.statusLabel}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <span className="font-mono text-xs text-cream">
                      {t.hero.status}
                    </span>
                  </div>
                </div>

                {/* Ubicación / estudio actual */}
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-muted mb-2">
                    {t.contact.currentlyLabel}
                  </h3>
                  <p className="font-mono text-xs text-cream">
                    {t.hero.statusDetail}
                  </p>
                </div>

                {/* Roles */}
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-muted mb-2">
                    {t.contact.rolesLabel}
                  </h3>
                  <div className="space-y-1">
                    {t.hero.roles.map((role) => (
                      <p key={role} className="font-mono text-xs text-cream">
                        {role}
                      </p>
                    ))}
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
