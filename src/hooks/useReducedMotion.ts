/* ================================================================
   useReducedMotion — Hook para detectar prefers-reduced-motion
   ================================================================
   Devuelve true si el usuario tiene activado "reducir movimiento"
   en las preferencias del sistema operativo.
   Se usa para desactivar animaciones pesadas y respetar accesibilidad.
   ================================================================ */

'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Consulta la media query del navegador
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(query.matches);

    // Escucha cambios en tiempo real (ej: usuario cambia la config)
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
