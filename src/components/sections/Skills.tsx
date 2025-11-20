import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const skills = [
  { name: 'Python', level: 90, category: 'Programming' },
  { name: 'R', level: 80, category: 'Programming' },
  { name: 'Java', level: 50, category: 'Programming' },
  { name: 'C++', level: 50, category: 'Programming' },
  { name: 'React', level: 75, category: 'Frontend' },
  { name: 'HTML/CSS', level: 90, category: 'Frontend' },
  { name: 'SQL', level: 90, category: 'Database' },
  { name: 'PennyLane', level: 75, category: 'Quantum' },
  { name: 'Qiskit', level: 65, category: 'Quantum' },
];

export default function Skills() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

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

    tl.fromTo(skillsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Animate progress bars
    skillsRef.current.forEach((el, index) => {
        const progressBar = el.querySelector('.progress-bar');
        gsap.fromTo(progressBar, 
            { width: 0 },
            { 
                width: `${skills[index].level}%`, 
                duration: 1.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                }
            }
        );
    });

  }, { scope: containerRef });

  const addToSkillsRef = (el: HTMLDivElement | null) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  return (
    <section id="skills" ref={containerRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Habilidades Técnicas</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={addToSkillsRef}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-colors border border-gray-700 hover:border-blue-500/50 group"
            >
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{skill.name}</h3>
                <span className="text-sm text-gray-400">{skill.category}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div className="progress-bar bg-blue-600 h-2.5 rounded-full w-0"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
