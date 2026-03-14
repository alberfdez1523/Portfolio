'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const GameSection = dynamic(() => import('./GameSection'), {
  ssr: false,
});

export default function LazyGameSection() {
  const markerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || !markerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        rootMargin: '320px 0px',
      }
    );

    observer.observe(markerRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  if (shouldLoad) {
    return <GameSection />;
  }

  return (
    <section
      id="game"
      aria-hidden="true"
      className="bg-noir-light py-[4.5rem] md:py-28 lg:py-40"
    >
      <div ref={markerRef} className="container-editorial">
        <div className="mb-12 md:mb-14">
          <div className="h-4 w-28 bg-accent/30" aria-hidden="true" />
          <div className="mt-4 mb-6 h-px w-12 bg-noir-border" aria-hidden="true" />
          <div className="h-12 max-w-xl bg-noir-border/70 sm:h-14 md:h-16" aria-hidden="true" />
        </div>

        <div
          className="h-[32rem] border border-noir-border bg-noir-surface/40"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
