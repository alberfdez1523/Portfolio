/* ================================================================
   Hero — Sección principal del portfolio
   ================================================================
   INTRO:
   1. El nombre aparece letra por letra (typewriter)
   2. Se desvanece revelando la página detrás

   LAYOUT: Texto a la izquierda + imagen a la derecha al mismo nivel.
   ================================================================ */

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { SOCIAL_LINKS, PROFILE_IMAGE } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pageContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [animationDone, setAnimationDone] = useState(false);
  const introDone = prefersReduced || animationDone;
  const { t } = useLanguage();

  /* Nombre completo para la animación letra por letra */
  const fullName = `${t.hero.firstName} ${t.hero.lastName}`;

  /* === ANIMACIÓN INTRO: TYPEWRITER ===
     Cada letra aparece una por una → pausa → fade-out del overlay → página visible */
  useEffect(() => {
    if (!sectionRef.current || !introRef.current) return;

    if (prefersReduced) {
      gsap.set(introRef.current, { autoAlpha: 0 });
      gsap.set(pageContentRef.current, { autoAlpha: 1 });
      return;
    }

    document.body.style.overflow = 'hidden';

    const validLetters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationDone(true);
        document.body.style.overflow = '';
        ScrollTrigger.refresh();
      },
    });

    tl
      /* Estado inicial: letras invisibles, página oculta */
      .set(validLetters, { opacity: 0 })
      .set(pageContentRef.current, { autoAlpha: 0 })

      /* Fase 1: Cada letra aparece secuencialmente */
      .to(validLetters, {
        opacity: 1,
        duration: 0.04,
        stagger: 0.06,
        ease: 'none',
      })

      /* Pausa para que se lea el nombre completo */
      .to({}, { duration: 0.7 })

      /* Fase 2: El overlay se desvanece, revelando la página */
      .to(introRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      .to(pageContentRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')

      /* Fase 3: Limpiar overlay */
      .set(introRef.current, { display: 'none' });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [prefersReduced, fullName]);

  /* === PARALLAX AL SCROLL === */
  useEffect(() => {
    if (prefersReduced || !introDone || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, introDone]);

  /* Variantes Framer Motion para contenido post-intro */
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <>
      {/* ================================================================
         OVERLAY DE INTRO — Typewriter letra por letra
         ================================================================ */}
      <div
        ref={introRef}
        className="fixed inset-0 z-100 flex items-center justify-center bg-noir pointer-events-none"
        aria-hidden="true"
      >
        <h1 className="font-serif text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none tracking-tight text-cream italic select-none">
          {fullName.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el; }}
              className="inline-block opacity-0"
              style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      {/* ================================================================
         CONTENIDO REAL DEL HERO
         ================================================================ */}
      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-8"
        aria-label="Sección principal"
      >
        <div ref={pageContentRef} className="container-editorial relative z-10 w-full" style={{ visibility: 'hidden' }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={introDone ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            {/* === COLUMNA IZQUIERDA: nombre + bio + CTAs === */}
            <div className="md:col-span-7 lg:col-span-6">
              <motion.p variants={fadeUp} className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-cream-muted mb-4">
                {t.hero.greeting}
              </motion.p>

              <motion.div variants={fadeUp} className="mb-6">
                <div>
                  <h1 className="font-serif text-[10vw] sm:text-[9vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.9] tracking-tight text-cream italic">
                    {t.hero.firstName}
                  </h1>
                </div>
                <div className="ml-[1vw]">
                  <h1 className="font-serif text-[10vw] sm:text-[9vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.9] tracking-tight text-cream italic">
                    {t.hero.lastName}
                  </h1>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="w-16 h-px bg-accent mb-5" aria-hidden="true" />

              {/* Roles + badge disponible */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                {t.hero.roles.map((role, i) => (
                  <span key={role} className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-cream-dim">
                    {role}{i < t.hero.roles.length - 1 && <span className="ml-2 sm:ml-3 text-noir-border">|</span>}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase text-accent">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  {t.hero.status}
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-cream-dim text-base md:text-lg leading-relaxed max-w-lg mb-7">
                {t.hero.bio}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a href="#projects" className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase bg-cream text-noir px-5 sm:px-6 py-3 hover:bg-accent hover:text-cream transition-colors duration-300">
                  {t.hero.viewProjects}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
                <a href="#contact" className="font-mono text-xs sm:text-sm tracking-wider uppercase text-cream-dim hover:text-cream border-b border-cream-muted hover:border-cream pb-0.5 transition-colors duration-300">{t.hero.contact}</a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-6 mt-7">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-muted">{t.hero.social}</span>
                <div className="h-px w-8 bg-noir-border" aria-hidden="true" />
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-cream-dim hover:text-accent transition-colors duration-300" aria-label="LinkedIn">LinkedIn</a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-cream-dim hover:text-accent transition-colors duration-300" aria-label="GitHub">GitHub</a>
              </motion.div>
            </div>

            {/* === COLUMNA DERECHA: imagen de perfil === */}
            <motion.div ref={imageRef} variants={fadeUp} className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <div className="relative aspect-3/4 overflow-hidden" style={{ clipPath: 'polygon(8% 0%, 100% 0%, 100% 92%, 0% 100%)' }}>
                  <Image src={PROFILE_IMAGE} alt="Alberto Fernández" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-linear-to-t from-noir/40 to-transparent" aria-hidden="true" />
                </div>
                <div className="absolute bottom-4 left-4 md:-left-4">
                  <div className="bg-noir-surface/90 backdrop-blur-sm border border-noir-border px-4 py-2">
                    <span className="font-mono text-[10px] tracking-wider text-cream-muted">{'// status'}</span>
                    <p className="font-mono text-xs text-cream mt-0.5">{t.hero.statusDetail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream-muted">{t.hero.scroll}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="w-px h-8 bg-cream-muted" />
          </div>
        </motion.div>
      </section>
    </>
  );
}
