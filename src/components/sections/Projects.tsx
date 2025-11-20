import React, { useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const projects = [
  {
    title: 'Machine Learning Cuántico vs Clásico',
    description: 'Investigación sobre Machine Learning Cuántico y análisis comparativo posterior con Machine Learning Clásico. Un estudio integral que implementa algoritmos QML en Qiskit y Pennylane.',
    tags: ['Python', 'Qiskit', 'Pennylane', 'Machine Learning'],
    image: '/assets/codigo.png',
    github: 'https://github.com/alberfdez1523/QMLvsML',
  },
  {
    title: 'Portafolio de Desarrollo Web',
    description: 'Un sitio web de portafolio moderno y responsivo que muestra mis habilidades y proyectos, construido con HTML, CSS, JavaScript y animaciones GSAP.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    image: '/assets/codigo.png',
    github: 'https://github.com/alberfdez1523/Portfolio',
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

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

    tl.fromTo(projectsRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

  }, { scope: containerRef });

  const addToProjectsRef = (el: HTMLDivElement | null) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  return (
    <section id="projects" ref={containerRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Proyectos Destacados</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToProjectsRef}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700 group w-full max-w-md flex flex-col"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-900 rounded-full text-white hover:text-blue-400 transition-colors hover:scale-110 transform duration-200"
                  >
                    <Github size={24} />
                  </a>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-gray-700 text-blue-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
