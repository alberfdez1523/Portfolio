import React, { useRef } from 'react';
import { Mail, MapPin, Phone, Linkedin, Github } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { translations } from '../../i18n/translations';

interface ContactProps {
  lang?: 'es' | 'en';
}

export default function Contact({ lang = 'es' }: ContactProps) {
  const t = translations[lang].contact;
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

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
    .fromTo(cardRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );

  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-light mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center">
          <div 
            ref={cardRef}
            className="space-y-8 bg-white/50 dark:bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-secondary/10 dark:border-light/10 shadow-xl max-w-2xl w-full hover:shadow-primary/10 transition-shadow duration-500"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-secondary dark:text-light mb-4">{t.subtitle}</h3>
              <p className="text-secondary/80 dark:text-light/80 text-lg">
                {t.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-secondary dark:text-light font-medium">Email</h4>
                    <a href="mailto:alberfdez2000@gmail.com" className="text-secondary/80 dark:text-light/80 hover:text-primary dark:hover:text-primary transition-colors">
                      alberfdez2000@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-secondary dark:text-light font-medium">{t.location}</h4>
                    <p className="text-secondary/80 dark:text-light/80">{t.locationValue}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-secondary dark:text-light font-medium">{t.phone}</h4>
                    <p className="text-secondary/80 dark:text-light/80">+34 673648243</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center md:items-start space-y-4 border-t md:border-t-0 md:border-l border-secondary/10 dark:border-light/10 pt-6 md:pt-0 md:pl-8">
                <h4 className="text-secondary dark:text-light font-medium mb-2">{t.social}</h4>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/alberto-fern%C3%A1ndez-palomo-38a583267/" target="_blank" className="bg-secondary/10 dark:bg-light/10 p-4 rounded-full text-secondary/80 dark:text-light/80 hover:bg-primary hover:text-white transition-all transform hover:scale-110 hover:rotate-6">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://github.com/alberfdez1523" target="_blank" className="bg-secondary/10 dark:bg-light/10 p-4 rounded-full text-secondary/80 dark:text-light/80 hover:bg-secondary/20 dark:hover:bg-light/20 hover:text-secondary dark:hover:text-light transition-all transform hover:scale-110 hover:-rotate-6">
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
