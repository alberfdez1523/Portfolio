import React, { useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const blobRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (textRef.current) {
        tl.fromTo(textRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
        )
    }
    
    // Modern Reveal Animation: Clip Path + Scale
    tl.fromTo(imageWrapperRef.current,
      { clipPath: "inset(0 100% 0 0)", scale: 1.1, filter: "grayscale(100%)" },
      { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "grayscale(0%)", duration: 1.5, ease: "expo.out" },
      "-=0.5"
    )
    .fromTo(blobRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=1"
    );

  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !imageWrapperRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = imageWrapperRef.current.getBoundingClientRect();
    
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;

    gsap.to(imageRef.current, {
      rotationY: x,
      rotationX: -y,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <section id="home" ref={containerRef} className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div ref={textRef} className="md:w-1/2 text-center md:text-left z-10">
          <h2 className="text-blue-500 font-bold text-xl md:text-2xl mb-4 tracking-wide">Hola, soy</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Alberto <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Fernández</span>
          </h1>
          <h3 className="text-2xl md:text-4xl text-gray-300 mb-8 font-light">
            Ingeniero de Software & Investigador IA
          </h3>
          <p className="text-gray-400 text-xl mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Soy un apasionado de la informática, me defino como una persona con ganas de aprender y abierta a conocer más gente del sector con la que poder colaborar.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              Ver Proyectos <ArrowRight size={24} />
            </a>
            <a 
              href="/assets/cv.pdf" 
              target="_blank"
              className="px-8 py-4 border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 hover:bg-gray-800"
            >
              Descargar CV <Download size={24} />
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center relative">
            {/* Decorative background blob */}
            <div ref={blobRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            
          <div 
            ref={imageWrapperRef}
            className="relative w-72 h-120 md:w-[450px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <img 
              ref={imageRef}
              src="/assets/profile-photo.jpg" 
              alt="Alberto Fernández" 
              className="w-full h-full object-cover object-center"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
