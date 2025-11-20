import React, { useRef } from 'react';
import { Home, User, Code, Briefcase, GraduationCap, FolderGit2, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const navItems = [
  { name: 'Inicio', href: '#home', icon: Home },
  { name: 'Acerca de', href: '#about', icon: User },
  { name: 'Habilidades', href: '#skills', icon: Code },
  { name: 'Experiencia', href: '#experience', icon: Briefcase },
  { name: 'Educación', href: '#education', icon: GraduationCap },
  { name: 'Proyectos', href: '#projects', icon: FolderGit2 },
  { name: 'Contacto', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    const items = itemsRef.current;
    const dock = dockRef.current;

    if (!dock) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      
      items.forEach((item) => {
        if (!item) return;
        
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - itemCenterX);
        
        // Calculate scale based on distance (closer = larger)
        // Max scale 1.5, min scale 1
        // Effect range: 150px
        let scale = 1;
        if (distance < 150) {
          const strength = 1 - distance / 150;
          scale = 1 + strength * 0.5; // 1.5 max scale
        }

        gsap.to(item, {
          scale: scale,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    };

    const handleMouseLeave = () => {
      items.forEach((item) => {
        if (!item) return;
        gsap.to(item, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto"
        });
      });
    };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    // Initial animation
    gsap.fromTo(dock, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: dockRef });

  const addToItemsRef = (el: HTMLAnchorElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav 
        ref={dockRef}
        className="flex items-end gap-3 sm:gap-6 px-3 py-3 bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl pointer-events-auto max-w-full overflow-x-auto sm:overflow-visible no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            ref={addToItemsRef}
            className="relative group p-2 sm:p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/80 border border-white/5 transition-colors flex items-center justify-center flex-shrink-0"
            aria-label={item.name}
          >
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
            
            {/* Tooltip */}
            <span className="hidden sm:block absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-md text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
              {item.name}
              {/* Arrow */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 border-r border-b border-white/10 transform rotate-45"></span>
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
