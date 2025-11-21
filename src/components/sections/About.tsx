import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { translations } from '../../i18n/translations';

interface AboutProps {
  lang?: 'es' | 'en';
}

export default function About({ lang = 'es' }: AboutProps) {
  const t = translations[lang].about;
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(textRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-20 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={imageRef} className="md:w-1/2">
            <img 
              src="/assets/Imagen-TFG.jpg" 
              alt="Coding workspace" 
              className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div ref={textRef} className="md:w-1/2 text-gray-600 dark:text-gray-300 space-y-6">
            <p className="text-lg">
              {t.p1}
            </p>
            <p className="text-lg">
              {t.p2}
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-500 dark:text-gray-400 my-4">
              {t.quote}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
