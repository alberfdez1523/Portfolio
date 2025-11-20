import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function About() {
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
    <section id="about" ref={containerRef} className="py-20 bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sobre Mí</h2>
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

          <div ref={textRef} className="md:w-1/2 text-gray-300 space-y-6">
            <p className="text-lg">
              Siempre me ha atraído la informática, pero no fue hasta que profundicé más en la programación que me di cuenta de que este era realmente mi lugar. Las primeras etapas de la universidad no fueron fáciles, pero aprendí a pensar como un ingeniero.
            </p>
            <p className="text-lg">
              Soy apasionado por aprender nuevos lenguajes de programación y enfrentar desafíos. Tengo la capacidad de adaptarme rápidamente y absorber conocimiento como una esponja. En mi tiempo libre, disfruto de los videojuegos, el baloncesto y el cine.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
              "El éxito no es la ausencia de fracaso, sino la respuesta a él."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
