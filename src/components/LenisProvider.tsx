/* ================================================================
   LenisProvider — Proveedor de scroll suave global
   ================================================================
   Integra Lenis con GSAP ScrollTrigger para que:
   1. El scroll sea suave en toda la página (Lenis)
   2. Las animaciones basadas en scroll funcionen correctamente (GSAP)
   
   Se monta una sola vez en el layout raíz.
   ================================================================ */

'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger en GSAP (solo se hace una vez)
gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respetar prefers-reduced-motion: no activar scroll suave
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      // Duración del ease del scroll (1.2s es fluido sin ser lento)
      duration: 1.2,
      // Curva de easing personalizada: desaceleración exponencial suave
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      // Desactivar smooth scroll si el usuario lo pide
      smoothWheel: !prefersReduced,
    });

    lenisRef.current = lenis;
    const onScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    /* Sincronizar Lenis con GSAP ScrollTrigger:
       - Cada frame de Lenis actualiza la posición de ScrollTrigger
       - GSAP ticker llama a lenis.raf() para mantenerlo en sync */
    lenis.on('scroll', onScroll);

    gsap.ticker.add(onTick);

    // Desactivar lag smoothing para evitar saltos visibles
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
