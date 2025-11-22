import React, { useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { translations } from '../../i18n/translations';

interface ProjectsProps {
  lang?: 'es' | 'en';
}

export default function Projects({ lang = 'es' }: ProjectsProps) {
  const t = translations[lang].projects;
  
  const projects = [
    {
      title: t.items[0].title,
      description: t.items[0].description,
      tags: ['Python', 'Qiskit', 'Pennylane', 'Machine Learning'],
      image: '/assets/tfg.png',
      github: 'https://github.com/alberfdez1523/QMLvsML',
    },
    {
      title: t.items[1].title,
      description: t.items[1].description,
      tags: ['Astro', 'TailwindCSS', 'React', 'TypeScript'],
      image: '/assets/Portfolio.png',
      github: 'https://github.com/alberfdez1523/Portfolio',
    },
  ];

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
    <section id="projects" ref={containerRef} className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-light mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToProjectsRef}
              className="bg-white/50 dark:bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-secondary/10 dark:border-light/10 group w-full max-w-md flex flex-col"
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
                    className="p-2 bg-light dark:bg-dark rounded-full text-secondary dark:text-light hover:text-primary dark:hover:text-primary transition-colors hover:scale-110 transform duration-200"
                  >
                    <Github size={24} />
                  </a>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-secondary dark:text-light mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-secondary/80 dark:text-light/80 mb-4 line-clamp-3 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-secondary/10 dark:bg-light/10 text-primary rounded-full">
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
