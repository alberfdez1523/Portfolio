import React, { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { translations } from '../../i18n/translations';

interface EducationProps {
  lang?: 'es' | 'en';
}

export default function Education({ lang = 'es' }: EducationProps) {
  const t = translations[lang].education;
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

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
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    tl.fromTo(itemsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power3.out" },
      "-=0.4"
    );

  }, { scope: containerRef });

  const addToItemsRef = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section id="education" ref={containerRef} className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-light mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {t.items.map((edu, index) => (
            <div 
              key={index}
              ref={addToItemsRef}
              className="bg-white/50 dark:bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-secondary/10 dark:border-light/10 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 flex gap-4 group"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-light mb-1">{edu.degree}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-secondary/60 dark:text-light/60 text-sm mb-3">
                  <span className="font-medium text-primary">{edu.school}</span>
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>{edu.period}</span>
                </div>
                <p className="text-secondary/80 dark:text-light/80">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
