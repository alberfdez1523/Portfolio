/* ================================================================
   Marquee — Ticker horizontal infinito seamless
   ================================================================ */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';

function MarqueeTrack({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 whitespace-nowrap">
      {items.map((item) => (
        <span key={item} className="flex items-center mx-6 md:mx-10">
          <span className="font-serif text-lg md:text-xl italic text-cream-dim tracking-wide">
            {item}
          </span>
          <span className="ml-6 md:ml-10 text-accent text-xs" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const { t } = useLanguage();
  const items = t.marquee;

  return (
    <div
      className="relative overflow-hidden border-y border-noir-border py-4 md:py-5 bg-noir-light"
      aria-hidden="true"
    >
      <div className="animate-marquee flex">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
      </div>
    </div>
  );
}
