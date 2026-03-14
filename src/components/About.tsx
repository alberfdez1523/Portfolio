/* ================================================================
   About — Sección "Sobre mí"
   ================================================================
   Layout editorial asimétrico: imagen a la izquierda con parallax,
   texto a la derecha con highlights e intereses.
   
   Decisión de layout: grid 12 columnas con la imagen occupando 5
   y el texto 7, creando una composición que respira (whitespace).
   ================================================================ */

'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ABOUT_IMAGE } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import SectionHeading from './SectionHeading';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    if (prefersReduced || !imageRef.current) return;

    /* Parallax sutil en la imagen: al scrollear, la imagen se desplaza
       menos rápido que el texto, creando profundidad */
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="about"
      className="py-20 md:py-32 lg:py-40"
      aria-labelledby="about-heading"
    >
      <div className="container-editorial">
        <SectionHeading id="about-heading" label={t.about.label} title={t.about.heading} />

        {/* Grid editorial: imagen + texto */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-16">
          {/* === Columna izquierda: imagen === */}
          <div className="order-2 md:order-1 md:col-span-5">
            <div ref={imageRef} className="relative">
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={ABOUT_IMAGE}
                  alt={t.about.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  loading="lazy"
                />
                {/* Overlay de integración */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-noir/30 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Quote flotante en la esquina — toque editorial */}
              <AnimatedText delay={0.4} className="mt-5 md:mt-8">
                <blockquote className="border-l-2 border-accent pl-4">
                  <p className="font-serif text-base italic leading-relaxed text-cream-dim">
                    &ldquo;{t.about.quote}&rdquo;
                  </p>
                </blockquote>
              </AnimatedText>
            </div>
          </div>

          {/* === Columna derecha: texto y datos === */}
          <div className="order-1 md:order-2 md:col-span-7">
            {/* Párrafos bio */}
            {t.about.paragraphs.map((paragraph, index) => (
              <AnimatedText
                key={index}
                delay={index * 0.15}
                className="mb-6"
              >
                <p className="text-cream-dim text-base md:text-lg leading-relaxed">
                  {paragraph}
                </p>
              </AnimatedText>
            ))}

            {/* Highlights — métricas/roles clave en fila */}
            <AnimatedText delay={0.3}>
              <div className="mt-10 mb-10 grid grid-cols-1 gap-4 border-y border-noir-border py-8 sm:grid-cols-3">
                {t.about.highlights.map((item) => (
                  <div key={item.label} className="text-left sm:text-center">
                    <span className="text-2xl mb-2 block" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="font-mono text-sm tracking-[0.12em] uppercase text-cream">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedText>

            {/* Intereses personales */}
            <AnimatedText delay={0.4}>
              <div>
                <h3 className="mb-4 font-mono text-sm tracking-[0.16em] uppercase text-cream-muted">
                  {t.about.interestsLabel}
                </h3>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {t.about.interests.map((interest) => (
                    <span
                      key={interest.label}
                      className="inline-flex items-center gap-2 border border-noir-border bg-noir-surface px-4 py-2 font-mono text-sm text-cream-dim transition-colors duration-300 hover:border-accent hover:text-cream"
                    >
                      <span aria-hidden="true">{interest.icon}</span>
                      {interest.label}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}
