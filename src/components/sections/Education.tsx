import React, { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const education = [
  {
    degree: 'Máster en Inteligencia Artificial',
    school: 'Universidad Alfonso X el Sabio (UAX)',
    period: '2023 - Presente',
    description: 'Master oficial basado en la especialización en técnicas avanzadas de IA, Machine Learning y Deep Learning.',
  },
  {
    degree: 'Grado en Ingeniería Informática en Ingeniería de Software',
    school: 'Universidad de Extremadura',
    period: '2018 - 2023',
    description: 'Formación integral en desarrollo de software, ingeniería de sistemas y gestión de proyectos tecnológicos.',
  },
];

export default function Education() {
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
    <section id="education" ref={containerRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Educación</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div 
              key={index}
              ref={addToItemsRef}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 flex gap-4 group"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="bg-blue-900/30 p-3 rounded-lg text-blue-500 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-400 text-sm mb-3">
                  <span className="font-medium text-blue-400">{edu.school}</span>
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>{edu.period}</span>
                </div>
                <p className="text-gray-300">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
