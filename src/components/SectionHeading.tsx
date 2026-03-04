/* ================================================================
   SectionHeading — Encabezado reutilizable para cada sección
   ================================================================
   Estilo editorial: etiqueta de categoría arriba (mono, pequeña),
   título grande en serif debajo, con línea decorativa.
   ================================================================ */

'use client';

import AnimatedText from './AnimatedText';

interface SectionHeadingProps {
  /** Etiqueta superior (ej: "SOBRE MÍ", "HABILIDADES") */
  label: string;
  /** Título principal de la sección */
  title: string;
  /** Alineación: left (por defecto) o center */
  align?: 'left' | 'center';
}

export default function SectionHeading({ label, title, align = 'left' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-16 md:mb-20 ${alignClass}`}>
      {/* Etiqueta de categoría — monospace, tracking amplio, acento */}
      <AnimatedText delay={0} variant="fade-up">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
          {label}
        </span>
      </AnimatedText>

      {/* Línea decorativa */}
      <AnimatedText delay={0.1} variant="fade-up">
        <div
          className={`mt-4 mb-6 h-px bg-noir-border ${
            align === 'center' ? 'mx-auto w-16' : 'w-12'
          }`}
          aria-hidden="true"
        />
      </AnimatedText>

      {/* Título principal — serif grande para impacto editorial */}
      <AnimatedText delay={0.2} variant="clip" as="h2">
        <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-cream leading-tight">
          {title}
        </span>
      </AnimatedText>
    </div>
  );
}
