/* ================================================================
   Página principal — Composición de todas las secciones
   ================================================================
   Importa y ordena todos los componentes del portfolio.
   Estructura: Hero → Marquee → About → Skills → Experience → 
   Education → Projects → Contact → Footer
   ================================================================ */

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

const Marquee = dynamic(() => import('@/components/Marquee'));
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const Experience = dynamic(() => import('@/components/Experience'));
const Education = dynamic(() => import('@/components/Education'));
const Projects = dynamic(() => import('@/components/Projects'));
const GameSection = dynamic(() => import('@/components/LazyGameSection'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <>
      {/* Navegación fija — se superpone sobre todo el contenido */}
      <Navbar />

      <main id="main-content" role="main" tabIndex={-1}>
        {/* Hero: sección principal con nombre gigante y parallax */}
        <Hero />

        {/* Separador visual entre hero y marquee */}
        <div className="h-10 sm:h-12 md:h-24" aria-hidden="true" />

        {/* Marquee: ticker horizontal infinito de roles */}
        <Marquee />

        {/* Sobre mí: bio + imagen + highlights + intereses */}
        <About />

        {/* Skills: grid filtrable de tecnologías */}
        <Skills />

        {/* Experiencia laboral: timeline editorial */}
        <Experience />

        {/* Formación académica: timeline con badge "en curso" */}
        <Education />

        {/* Proyectos destacados: cards full-width tipo case study */}
        <Projects />

        {/* Juego Wordle: 15 niveles sobre palabras clave del portfolio */}
        <GameSection />

        {/* Contacto: CTA grande + links sociales */}
        <Contact />
      </main>

      {/* Footer: marca + navegación + créditos */}
      <Footer />
    </>
  );
}
