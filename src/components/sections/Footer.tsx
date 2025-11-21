import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { translations } from '../../i18n/translations';

interface FooterProps {
  lang?: 'es' | 'en';
}

export default function Footer({ lang = 'es' }: FooterProps) {
  const t = translations[lang].footer;
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-transparent border-t border-secondary/10 dark:border-light/10 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-2xl font-bold text-primary">Alberto Fernández</span>
        </div>
        <div className="text-secondary/60 dark:text-light/60 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Alberto Fernández.</p>
          <p className="mt-1">{t.madeWith} <span className="text-red-500">❤</span> {t.and} ☕ {t.using} </p>
          <p className="mt-1">React y TailwindCSS</p>
          <a href="https://www.onlinewebfonts.com">Web Fonts</a>
        </div>
      </div>
    </footer>
  );
}
