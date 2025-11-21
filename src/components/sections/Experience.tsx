import React, { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { translations } from '../../i18n/translations';

interface ExperienceProps {
  lang?: 'es' | 'en';
}

export default function Experience({ lang = 'es' }: ExperienceProps) {
  const t = translations[lang].experience;
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
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    itemsRef.current.forEach((el, index) => {
        gsap.fromTo(el,
            { x: -50, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

  }, { scope: containerRef });

  const addToItemsRef = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section id="experience" ref={containerRef} className="py-20 bg-white/30 dark:bg-secondary/30 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-light mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="relative border-l border-secondary/10 dark:border-light/10 ml-3 md:ml-6 space-y-12">
          {t.items.map((exp, index) => (
            <div 
              key={index}
              ref={addToItemsRef}
              className="mb-10 ml-6 md:ml-10 relative"
            >
              <span className="absolute flex items-center justify-center w-8 h-8 bg-primary rounded-full -left-[2.2rem] md:-left-[3.2rem] ring-4 ring-light dark:ring-secondary">
                <Briefcase size={16} className="text-light" />
              </span>
              <div className="bg-white/50 dark:bg-secondary/50 p-6 rounded-lg shadow-lg border border-secondary/10 dark:border-light/10 hover:border-primary/30 transition-colors hover:transform hover:-translate-y-1 duration-300">
                <h3 className="flex items-center mb-1 text-xl font-semibold text-secondary dark:text-light">
                  {exp.title}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center mb-4 text-secondary/60 dark:text-light/60 text-sm">
                  <span className="font-medium text-primary">{exp.company}</span>
                  <span className="hidden md:inline mx-2">•</span>
                  <span>{exp.period}</span>
                </div>
                <p className="mb-4 text-base font-normal text-secondary/80 dark:text-light/80">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
