/* ================================================================
   Navbar — Navegación desplegable con animación suave
   ================================================================
   Header fijo con logo + botones de idioma/tema + menú hamburguesa.
   Panel fullscreen con transiciones suaves (opacity + translateY)
   y botón de cierre explícito (✕) dentro del overlay.
   ================================================================ */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  /* Refs para la animación GSAP */
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLLIElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const scrollStateRef = useRef(false);

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrolled = () => {
      frameId = null;
      const nextScrolled = window.scrollY > 100;
      if (scrollStateRef.current === nextScrolled) return;

      scrollStateRef.current = nextScrolled;
      setScrolled(nextScrolled);
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  /* Construir la timeline GSAP una sola vez — animación suave con opacity + transform */
  useEffect(() => {
    if (!overlayRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl
      /* Mostrar el overlay */
      .set(overlayRef.current, { display: 'flex' })

      /* Fase 1: Fondo fade in */
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      )

      /* Fase 2: Línea decorativa */
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.15'
      )

      /* Fase 3: Links aparecen suavemente desde abajo */
      .fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.05,
        },
        '-=0.3'
      )

      /* Fase 4: Botón cerrar + socials aparecen */
      .fromTo(
        closeBtnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
        '-=0.2'
      )
      .fromTo(
        socialsRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      );

    tlRef.current = tl;
    return () => { tl.kill(); };
  }, []);

  const openMenu = useCallback(() => {
    if (!tlRef.current) return;
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    tlRef.current.timeScale(1).play(0);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!tlRef.current) return;
    tlRef.current.timeScale(1.4).reverse();
    const dur = (tlRef.current.duration() / 1.4) * 1000;
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      if (overlayRef.current) overlayRef.current.style.display = 'none';
      menuButtonRef.current?.focus();
      closeTimeoutRef.current = null;
    }, dur);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeMenu, isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const setLinkRef = useCallback((el: HTMLLIElement | null, i: number) => {
    if (el) linksRef.current[i] = el;
  }, []);

  const allItems = [...t.nav.links, { label: t.nav.downloadCV, href: SOCIAL_LINKS.cv }];

  return (
    <>
      {/* === BARRA SUPERIOR FIJA === */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-noir/90 backdrop-blur-md border-b border-noir-border'
            : 'bg-transparent'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Navegación principal"
          className="container-editorial flex items-center justify-between h-14 sm:h-16 md:h-20"
        >
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-2xl italic text-cream hover:text-accent transition-colors duration-300 z-60"
            aria-label="Ir al inicio"
          >
            A.
          </a>

          {/* Botones: idioma + tema + menú */}
          <div className="flex items-center gap-2 sm:gap-3 z-60">
            <a
              href={SOCIAL_LINKS.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 border border-accent/35 px-4 py-2 font-mono text-xs tracking-[0.18em] text-accent uppercase transition-colors duration-300 hover:bg-accent hover:text-cream"
            >
              {t.nav.downloadCV}
            </a>

            {/* Toggle idioma */}
            <button
              onClick={toggleLang}
              className="group flex items-center justify-center w-11 h-11 border border-noir-border hover:border-cream-muted rounded-full transition-all duration-300"
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <span className="font-mono text-xs tracking-[0.12em] uppercase text-cream-dim transition-colors duration-300 group-hover:text-cream">
                {lang === 'es' ? 'EN' : 'ES'}
              </span>
            </button>

            {/* Toggle tema */}
            <button
              onClick={toggleTheme}
              className="group flex items-center justify-center w-11 h-11 border border-noir-border hover:border-cream-muted rounded-full transition-all duration-300"
              aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              <span className="text-sm text-cream-dim group-hover:text-cream transition-colors duration-300">
                {theme === 'dark' ? '☀' : '☾'}
              </span>
            </button>

            {/* Botón menú hamburguesa (solo abre) */}
            <button
              ref={menuButtonRef}
              onClick={openMenu}
              className="relative group flex min-h-11 items-center gap-2 sm:gap-3"
              aria-label={t.nav.menu}
              aria-expanded={isOpen}
              aria-controls="site-menu"
            >
              <span className="hidden font-mono text-xs tracking-[0.16em] uppercase text-cream-dim transition-colors duration-300 group-hover:text-cream sm:inline">
                {t.nav.menu}
              </span>
              <div className="flex h-10 w-10 flex-col items-center justify-center gap-1.5">
                <span className="block w-6 h-[1.5px] bg-cream transition-all duration-300" />
                <span className="block w-6 h-[1.5px] bg-cream transition-all duration-300" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* === PANEL FULLSCREEN DEL MENÚ === */}
      <div
        ref={overlayRef}
        id="site-menu"
        className="fixed inset-0 z-55 bg-noir/98 backdrop-blur-lg flex-col items-center justify-center hidden"
        style={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        {/* === BOTÓN CERRAR (✕) — esquina superior derecha === */}
        <button
          ref={closeBtnRef}
          onClick={closeMenu}
          className="absolute top-4 right-4 md:top-7 md:right-10 z-10 group flex items-center gap-3"
          aria-label={t.nav.close}
          style={{ opacity: 0 }}
        >
          <span className="hidden font-mono text-xs tracking-[0.16em] uppercase text-cream-dim transition-colors duration-300 group-hover:text-cream sm:inline">
            {t.nav.close}
          </span>
          <div className="w-10 h-10 flex items-center justify-center border border-noir-border group-hover:border-cream-muted rounded-full transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-cream-dim group-hover:text-cream transition-colors duration-300">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        <div
          ref={lineRef}
          className="absolute top-1/2 left-[10%] right-[10%] h-px bg-noir-border origin-center"
          aria-hidden="true"
          style={{ transform: 'scaleX(0)' }}
        />

        <nav className="relative z-10">
          <ul className="flex flex-col items-center gap-4 sm:gap-5 md:gap-7" role="list">
            {allItems.map((link, index) => {
              const isCV = link.href === SOCIAL_LINKS.cv;
              return (
                <li
                  key={link.href}
                  ref={(el) => setLinkRef(el, index)}
                  style={{ opacity: 0 }}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    {...(isCV ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`
                      block text-center transition-colors duration-300
                      ${isCV
                        ? 'mt-4 font-mono text-base tracking-[0.24em] uppercase text-accent hover:text-cream'
                        : 'font-serif text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl italic text-cream hover:text-accent'
                      }
                    `}
                  >
                    {isCV ? (
                      link.label
                    ) : (
                      <>
                        <span className="mr-3 align-top font-mono text-sm tracking-[0.12em] text-cream-muted not-italic">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {link.label}
                      </>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div ref={socialsRef} className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 sm:gap-8" style={{ opacity: 0 }}>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cream-muted transition-colors duration-300 hover:text-accent">LinkedIn</a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-cream-muted transition-colors duration-300 hover:text-accent">GitHub</a>
        </div>
      </div>
    </>
  );
}
