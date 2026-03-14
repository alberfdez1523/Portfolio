/* ================================================================
   AnimatedText — Componente de reveal de texto al entrar en viewport
   ================================================================
   Usa Framer Motion para animar texto línea a línea o palabra a palabra
   cuando entra en el viewport. Ideal para headings y párrafos.
   
   Decisión: Framer Motion por su integración nativa con React y
   porque para animaciones de entrada viewport es más declarativo que GSAP.
   ================================================================ */

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MOTION_TAGS = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
};

interface AnimatedTextProps {
  children: React.ReactNode;
  /** Clase CSS adicional */
  className?: string;
  /** Retraso antes de iniciar (en segundos) */
  delay?: number;
  /** Tipo de animación: fade-up (por defecto) o clip (reveal con clip-path) */
  variant?: 'fade-up' | 'clip';
  /** Etiqueta HTML a renderizar */
  as?: React.ElementType;
  /** Id opcional para enlazar con aria-labelledby */
  id?: string;
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  as: Tag = 'div',
  ...rest
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Se activa cuando el 20% del elemento es visible
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  const prefersReduced = useReducedMotion();

  // Si el usuario prefiere reducir movimiento, mostrar estático
  if (prefersReduced) {
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  /* Variantes de animación:
     - fade-up: opacidad 0→1 + translateY 40→0
     - clip: clip-path de inset(100% 0 0 0) a inset(0) */
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
      },
    },
    clip: {
      hidden: { clipPath: 'inset(100% 0 0 0)' },
      visible: {
        clipPath: 'inset(0% 0 0 0)',
        transition: {
          duration: 1,
          delay,
          ease: [0.77, 0, 0.175, 1] as [number, number, number, number],
        },
      },
    },
  };

  const MotionTag = typeof Tag === 'string'
    ? (MOTION_TAGS[Tag as keyof typeof MOTION_TAGS] ?? motion.div)
    : motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
