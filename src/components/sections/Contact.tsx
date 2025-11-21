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
    <section id="contact" ref={containerRef} className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center">
          <div 
            ref={cardRef}
            className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl max-w-2xl w-full hover:shadow-blue-500/10 transition-shadow duration-500"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.subtitle}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">Email</h4>
                    <a href="mailto:alberfdez2000@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      alberfdez2000@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">{t.location}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{t.locationValue}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">{t.phone}</h4>
                    <p className="text-gray-600 dark:text-gray-400">+34 673648243</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center md:items-start space-y-4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-6 md:pt-0 md:pl-8">
                <h4 className="text-gray-900 dark:text-white font-medium mb-2">{t.social}</h4>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/alberto-fern%C3%A1ndez-palomo-38a583267/" target="_blank" className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 hover:rotate-6">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://github.com/alberfdez1523" target="_blank" className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-all transform hover:scale-110 hover:-rotate-6">
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
