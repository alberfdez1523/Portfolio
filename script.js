let currentLanguage = 'en';

function changeLanguage() {
    if (currentLanguage === 'en') {
        console.log('Cambiando idioma:', currentLanguage);
        document.getElementById('greeting').innerHTML = 'Hola <span class="animate-wave">👋</span>, soy';
        document.getElementById('profession').textContent = 'INGENIERO DE SOFTWARE';
        document.getElementById('scroll').innerHTML = 'Desplázate <span>&#x2193;</span>';
        document.getElementById('about-title').textContent = 'SOBRE MÍ';
        document.getElementById('about-text').textContent = 'Apasionado por la informática, me defino como una persona con ganas de aprender y abierta a conocer a más personas del sector con las que pueda colaborar.';
        document.getElementById('know-more').textContent = 'Saber Más';
        document.getElementById('language-button').textContent = 'ENG';
        document.getElementById('experience-title').textContent = 'EXPERIENCIA';
        document.getElementById('nav-about').textContent = '<sobre mí/>';
        document.getElementById('nav-experience').textContent = '<experiencia/>';
        document.getElementById('nav-projects').textContent = '<proyectos/>';
        document.getElementById('nav-intro').textContent = '<inicio/>';
        document.getElementById('link_experience').textContent = 'Ver más experiencia';
        document.getElementById('link_education').textContent = 'Ver mi educación';
        document.getElementById('job1_title').textContent = 'Operador de Bases de Datos';
        document.getElementById('job1_period').textContent = 'Mayo 2024 - Julio 2024';
        document.getElementById('job1_description').textContent = 'Alfotrailer, S.L. / Asistencia en la resolución de problemas relacionados con las bases de datos e implementación de soluciones. Actualización y modificación de los registros en la base de datos.';
        document.getElementById('job2_title').textContent = 'Investigador';
        document.getElementById('job2_period').textContent = 'Febrero 2025 - Mayo 2025';
        document.getElementById('job2_description').textContent = 'SPILab by Quercus / Desarrollo de trabajo comparativo entre Machine Learning Cuántico y Machine Learning Clásico. Implementación de algoritmos de Machine Learning Cuántico en Qiskit y Pennylane y comparación con algoritmos clásicos.';
        document.getElementById('link_cv').textContent = 'Ver Currículum Vitae';
        document.getElementById('project-title').textContent = 'PROYECTOS';
        document.getElementById('project1_title').textContent = 'Machine Learning Cuántico vs Machine Learning Clásico. Un análisis comparativo.';
        document.getElementById('project1_description').textContent = 'Investigacion sobre Quantum Machine Learning y realizacion de posterior analasis comparativo con Machine Learning Clasico.';
        document.getElementById('link_project1').textContent = 'Ver repositorio';
        document.getElementById('about-paragraph-1').textContent = 'Desde siempre me he sentido atraído por la informática, pero no fue hasta que empecé a profundizar en la programación que descubrí que este era realmente mi lugar, el espacio donde quiero seguir creciendo y aprendiendo.';
        document.getElementById('about-paragraph-2').textContent = 'Las primeras etapas en la universidad no fueron fáciles para mí. Al principio, no sabía muy bien cómo abordar los estudios de Ingeniería del Software ni cómo encajar en este mundo tan amplio y complejo. Sin embargo, con el tiempo, llegó un momento clave en el que mi perspectiva cambió: aprendí a pensar como un ingeniero, centrándome en la resolución de problemas y en la estructura del pensamiento más que en las habilidades mismas de programación. Este enfoque es algo que considero una de mis mayores fortalezas.';
        document.getElementById('about-paragraph-3').textContent = 'Me apasiona aprender nuevos lenguajes de programación y enfrentarme a retos. Aunque no domine un lenguaje en particular al principio, tengo la capacidad de adaptarme rápidamente y absorber conocimientos como una esponja. Esta misma adaptabilidad me permite integrarme con facilidad tanto en equipos como en entornos prácticos.';
        document.getElementById('about-paragraph-4').textContent = 'En mi tiempo libre, disfruto de mis tres grandes aficiones: los videojuegos, el baloncesto y el cine. Estas pasiones no solo me inspiran, sino que también me ayudan a desconectar y mantener el equilibrio en mi día a día. Estoy convencido de que siempre hay algo nuevo que aprender y aportar, y me entusiasma enfrentar cualquier reto que me ayude a seguir creciendo como profesional y como persona.';
        document.getElementById('title_about').textContent = 'SOBRE MÍ';
        currentLanguage = 'es';
    } else {
        console.log('Cambiando idioma:', currentLanguage);
        document.getElementById('greeting').innerHTML = 'Hi <span class="animate-wave">👋</span>, I\'m';
        document.getElementById('profession').textContent = 'SOFTWARE ENGINEER';
        document.getElementById('scroll').innerHTML = 'Scroll <span>&#x2193;</span>';
        document.getElementById('about-title').textContent = 'ABOUT ME';
        document.getElementById('about-text').textContent = 'Passionate about computer science, I define myself as a person eager to learn and open to meeting more people in the field with whom I can collaborate.';
        document.getElementById('know-more').textContent = 'Know More';
        document.getElementById('language-button').textContent = 'ESP';
        document.getElementById('experience-title').textContent = 'EXPERIENCE';
        document.getElementById('nav-about').textContent = '<about/>';
        document.getElementById('nav-experience').textContent = '<experience/>';
        document.getElementById('nav-intro').textContent = '<intro/>';
        document.getElementById('nav-projects').textContent = '<projects/>';
        document.getElementById('link_experience').textContent = 'View more experience';
        document.getElementById('link_education').textContent = 'View my education';
        document.getElementById('job1_title').textContent = 'Database Operator';
        document.getElementById('job1_period').textContent = 'May 2024 - July 2024';
        document.getElementById('job1_description').textContent = 'Alfotrailer, S.L. / Assistance in solving problems related to databases and implementing solutions. Updating and modifying records in the database.';
        document.getElementById('job2_title').textContent = 'Researcher';
        document.getElementById('job2_period').textContent = 'February 2025 - May 2025';
        document.getElementById('job2_description').textContent = 'SPILab by Quercus / Development of comparative work between Quantum Machine Learning and Classical Machine Learning. Implementation of Quantum Machine Learning algorithms in Qiskit and Pennylane and comparison with classical algorithms.';
        document.getElementById('link_cv').textContent = 'View Curriculum Vitae';
        document.getElementById('project-title').textContent = 'PROJECTS';
        document.getElementById('project1_title').textContent = 'Quantum Machine Learning vs Classical Machine Learning. A comparative analysis.';
        document.getElementById('project1_description').textContent = 'Research on Quantum Machine Learning and subsequent comparative analysis with Classical Machine Learning.';
        document.getElementById('link_project1').textContent = 'View repository';
        document.getElementById('about-paragraph-1').textContent = 'I have always been drawn to computer science, but it wasn\'t until I delved deeper into programming that I realized this was truly my place—the field where I want to keep growing and learning.';
        document.getElementById('about-paragraph-2').textContent = 'The early stages of university were not easy for me. At first, I wasn’t quite sure how to approach Software Engineering studies or how to find my footing in such a broad and complex field. However, over time, there was a pivotal moment when my perspective shifted: I learned to think like an engineer, focusing on problem-solving and structured thinking rather than just programming skills. This mindset is something I consider one of my greatest strengths.';
        document.getElementById('about-paragraph-3').textContent = 'I am passionate about learning new programming languages and tackling challenges. Even if I don’t initially master a particular language, I have the ability to adapt quickly and absorb knowledge like a sponge. This adaptability also enables me to integrate seamlessly into both teams and practical environments.';
        document.getElementById('about-paragraph-4').textContent = 'In my free time, I enjoy my three main hobbies: video games, basketball, and cinema. These passions not only inspire me but also help me disconnect and maintain balance in my daily life. I firmly believe there is always something new to learn and contribute, and I’m excited to face any challenge that helps me continue growing both as a professional and as a person.';
        document.getElementById('title_about').textContent = 'ABOUT ME';
        currentLanguage = 'en';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
