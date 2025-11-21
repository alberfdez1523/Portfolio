import React, { useRef } from 'react';
import { Home, User, Code, Briefcase, GraduationCap, FolderGit2, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { translations } from '../../i18n/translations';

interface NavbarProps {
  lang?: 'es' | 'en';
}

export default function Navbar({ lang = 'es' }: NavbarProps) {
  const t = translations[lang].nav;
  
  const navItems = [
    { name: t.home, href: '#home', icon: Home },
    { name: t.about, href: '#about', icon: User },
    { name: t.skills, href: '#skills', icon: Code },
    { name: t.experience, href: '#experience', icon: Briefcase },
    { name: t.education, href: '#education', icon: GraduationCap },
    { name: t.projects, href: '#projects', icon: FolderGit2 },
    { name: t.contact, href: '#contact', icon: Mail },
  ];

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
        className="flex items-end gap-3 sm:gap-6 px-3 py-3 bg-light/40 dark:bg-dark/40 backdrop-blur-xl border border-secondary/10 dark:border-light/10 rounded-2xl shadow-2xl pointer-events-auto max-w-full overflow-x-auto sm:overflow-visible no-scrollbar transition-colors duration-300"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            ref={addToItemsRef}
            className="relative group p-2 sm:p-3 rounded-xl bg-white/50 dark:bg-secondary/50 hover:bg-white/80 dark:hover:bg-secondary/80 border border-secondary/10 dark:border-light/5 transition-colors flex items-center justify-center flex-shrink-0"
            aria-label={item.name}
          >
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary dark:text-light group-hover:text-primary dark:group-hover:text-primary transition-colors" />
            
            {/* Tooltip */}
            <span className="hidden sm:block absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-light/90 dark:bg-dark/90 backdrop-blur-md text-secondary dark:text-light text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-secondary/10 dark:border-light/10 shadow-xl">
              {item.name}
              {/* Arrow */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-light/90 dark:bg-dark/90 border-r border-b border-secondary/10 dark:border-light/10 transform rotate-45"></span>
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
