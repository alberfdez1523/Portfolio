/* ================================================================
   Página principal — Composición de todas las secciones
   ================================================================
   Importa y ordena todos los componentes del portfolio.
   Estructura: Hero → Marquee → About → Skills → Experience → 
   Education → Projects → Contact → Footer
   ================================================================ */

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import GameSection from '@/components/GameSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Navegación fija — se superpone sobre todo el contenido */}
      <Navbar />

      <main role="main">
        {/* Hero: sección principal con nombre gigante y parallax */}
        <Hero />

        {/* Separador visual entre hero y marquee */}
        <div className="h-16 md:h-24" aria-hidden="true" />

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
