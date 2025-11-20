import React, { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const experiences = [
  {
    title: 'Investigador',
    company: 'SPILab by Quercus',
    period: 'Febrero 2025 - Mayo 2025',
    description: 'Desarrollo de trabajo comparativo entre Quantum Machine Learning y Classical Machine Learning. Implementación de algoritmos de Quantum Machine Learning en Qiskit y Pennylane y comparación con algoritmos clásicos.',
  },
  {
    title: 'Operador de Base de Datos',
    company: 'Alfotrailer, S.L.',
    period: 'Mayo 2024 - Julio 2024',
    description: 'Asistencia en la resolución de problemas relacionados con bases de datos e implementación de soluciones. Actualización y modificación de registros en la base de datos.',
  },
];

export default function Experience() {
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
    <section id="experience" ref={containerRef} className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experiencia Laboral</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative border-l border-gray-700 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              ref={addToItemsRef}
              className="mb-10 ml-6 md:ml-10 relative"
            >
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-[2.2rem] md:-left-[3.2rem] ring-4 ring-gray-800">
                <Briefcase size={16} className="text-white" />
              </span>
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500/30 transition-colors hover:transform hover:-translate-y-1 duration-300">
                <h3 className="flex items-center mb-1 text-xl font-semibold text-white">
                  {exp.title}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center mb-4 text-gray-400 text-sm">
                  <span className="font-medium text-blue-400">{exp.company}</span>
                  <span className="hidden md:inline mx-2">•</span>
                  <span>{exp.period}</span>
                </div>
                <p className="mb-4 text-base font-normal text-gray-300">
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
