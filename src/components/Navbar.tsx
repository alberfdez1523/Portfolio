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
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  /* Cerrar menú con Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const openMenu = useCallback(() => {
    if (!tlRef.current) return;
    tlRef.current.timeScale(1).play(0);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!tlRef.current) return;
    tlRef.current.timeScale(1.4).reverse();
    const dur = (tlRef.current.duration() / 1.4) * 1000;
    setTimeout(() => {
      if (overlayRef.current) overlayRef.current.style.display = 'none';
    }, dur);
    setIsOpen(false);
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
          className="container-editorial flex items-center justify-between h-16 md:h-20"
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
            {/* Toggle idioma */}
            <button
              onClick={toggleLang}
              className="group flex items-center justify-center w-9 h-9 border border-noir-border hover:border-cream-muted rounded-full transition-all duration-300"
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <span className="font-mono text-[10px] tracking-wider uppercase text-cream-dim group-hover:text-cream transition-colors duration-300">
                {lang === 'es' ? 'EN' : 'ES'}
              </span>
            </button>

            {/* Toggle tema */}
            <button
              onClick={toggleTheme}
              className="group flex items-center justify-center w-9 h-9 border border-noir-border hover:border-cream-muted rounded-full transition-all duration-300"
              aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              <span className="text-sm text-cream-dim group-hover:text-cream transition-colors duration-300">
                {theme === 'dark' ? '☀' : '☾'}
              </span>
            </button>

            {/* Botón menú hamburguesa (solo abre) */}
            <button
              onClick={openMenu}
              className="relative group flex items-center gap-3"
              aria-label={t.nav.menu}
              aria-expanded={isOpen}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-dim group-hover:text-cream transition-colors duration-300 hidden sm:inline">
                {t.nav.menu}
              </span>
              <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
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
        className="fixed inset-0 z-55 bg-noir/98 backdrop-blur-lg flex-col items-center justify-center hidden"
        style={{ opacity: 0 }}
        role="dialog"
        aria-label="Menú de navegación"
      >
        {/* === BOTÓN CERRAR (✕) — esquina superior derecha === */}
        <button
          ref={closeBtnRef}
          onClick={closeMenu}
          className="absolute top-5 right-5 md:top-7 md:right-10 z-10 group flex items-center gap-3"
          aria-label={t.nav.close}
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-dim group-hover:text-cream transition-colors duration-300 hidden sm:inline">
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
          <ul className="flex flex-col items-center gap-5 md:gap-7" role="list">
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
                        ? 'font-mono text-sm tracking-[0.3em] uppercase text-accent hover:text-cream mt-4'
                        : 'font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-cream hover:text-accent'
                      }
                    `}
                  >
                    {isCV ? (
                      link.label
                    ) : (
                      <>
                        <span className="font-mono text-xs text-cream-muted mr-3 not-italic tracking-wider align-top">
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

        <div ref={socialsRef} className="absolute bottom-8 left-0 right-0 flex justify-center gap-8" style={{ opacity: 0 }}>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-cream-muted hover:text-accent transition-colors duration-300">LinkedIn</a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-cream-muted hover:text-accent transition-colors duration-300">GitHub</a>
        </div>
      </div>
    </>
  );
}
