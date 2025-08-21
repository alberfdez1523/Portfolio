// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Simple navigation without conflicts
function initSimpleNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-section a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate the exact position respecting navbar height
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - navbarHeight - 10;
                
                // Custom smooth scroll using requestAnimationFrame (no conflicts with ScrollTrigger)
                let start = window.pageYOffset;
                let distance = targetPosition - start;
                let duration = Math.abs(distance) > 1000 ? 1000 : 600; // Shorter duration for better performance
                let startTime = null;
                
                function smoothScrollStep(currentTime) {
                    if (!startTime) startTime = currentTime;
                    
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Smooth easing function
                    const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, start + distance * easeInOutCubic);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(smoothScrollStep);
                    } else {
                        // Ensure exact final position
                        window.scrollTo(0, targetPosition);
                        
                        // Update active nav link after scroll completes
                        if (link.classList.contains('nav-link')) {
                            setTimeout(() => {
                                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                                link.classList.add('active');
                            }, 50);
                        }
                    }
                }
                
                requestAnimationFrame(smoothScrollStep);
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Initialize as soon as DOM is loaded (before GSAP)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimpleNavigation);
} else {
    initSimpleNavigation();
}

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Create animated background first
    createAnimatedBackground();
    
    // Only initialize navigation and form, animations will be triggered after loader
    initializeNavigation();
    initializeForm();
    
    // Initialize story animations
    initializeStoryAnimations();
    
    // Ensure story visibility as fallback
    setTimeout(() => {
        ensureStoryVisibility();
    }, 1000);
    
    // Initialize navbar effects only (no conflicting scroll)
    initializeNavbarEffects();
    
    // Initialize cursor effect on desktop
    if (window.innerWidth > 768) {
        initializeCursor();
    }
    
    // Add scroll to top button
    addScrollToTop();
    
    // Add modern page effects
    addModernPageEffects();
});

// Create animated background
function createAnimatedBackground() {
    // Check if background already exists
    if (document.querySelector('.animated-background')) {
        initializeBackgroundAnimations();
        return;
    }
    
    const bgContainer = document.createElement('div');
    bgContainer.className = 'animated-background';
    bgContainer.innerHTML = `
        <div class="bg-layer bg-gradient-1"></div>
        <div class="bg-layer bg-gradient-2"></div>
        <div class="bg-layer bg-gradient-3"></div>
        <div class="bg-grid"></div>
        <div class="bg-particles"></div>
    `;
    
    document.body.insertBefore(bgContainer, document.body.firstChild);
    
    // Create floating particles
    createBackgroundParticles();
    
    // Initialize background animations
    initializeBackgroundAnimations();
}

// Create background particles
function createBackgroundParticles() {
    const particlesContainer = document.querySelector('.bg-particles');
    if (!particlesContainer) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random delay for animation
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Additional GSAP animations for more dynamic movement
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            duration: Math.random() * 15 + 10,
            repeat: -1,
            yoyo: true,
            ease: 'none'
        });
        
        gsap.to(particle, {
            opacity: Math.random() * 0.8 + 0.2,
            duration: Math.random() * 4 + 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: Math.random() * 3
        });
    }
}

// Initialize background animations
function initializeBackgroundAnimations() {
    // Mouse parallax effect (only on desktop)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            gsap.to('.bg-gradient-1', {
                x: mouseX * 20,
                y: mouseY * 20,
                duration: 2,
                ease: 'power2.out'
            });
            
            gsap.to('.bg-gradient-2', {
                x: mouseX * -15,
                y: mouseY * -15,
                duration: 2.5,
                ease: 'power2.out'
            });
            
            gsap.to('.bg-gradient-3', {
                x: mouseX * 10,
                y: mouseY * 10,
                duration: 3,
                ease: 'power2.out'
            });
            
            gsap.to('.bg-particles', {
                x: mouseX * 8,
                y: mouseY * 8,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    }
    
    // Scroll parallax effect
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.bg-layer').forEach((layer, index) => {
            gsap.to(layer, {
                yPercent: -20 - (index * 5),
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
        
        // Grid parallax
        gsap.to('.bg-grid', {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }
}

// Modern page effects
function addModernPageEffects() {
    // Smooth scroll reveal for elements
    gsap.registerPlugin(ScrollTrigger);
    
    // Add mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        gsap.to('.hero-bg-animation', {
            x: mouseX * 20,
            y: mouseY * 20,
            duration: 1,
            ease: 'power2.out'
        });
        
        // Parallax for geometric shapes (if they exist)
        gsap.utils.toArray('.shape').forEach((shape, index) => {
            gsap.to(shape, {
                x: mouseX * (10 + index * 5),
                y: mouseY * (10 + index * 5),
                duration: 1 + index * 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Enhanced scroll-triggered animations - Unified for all skill cards
    ScrollTrigger.batch('.skill-card', {
        onEnter: (elements) => {
            gsap.fromTo(elements, {
                opacity: 0,
                y: 60,
                scale: 0.9,
                rotationY: 0
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });
    
    // Text reveal on scroll
    gsap.utils.toArray('p, h3, h4, h5, h6').forEach(text => {
        if (!text.closest('.modern-loader')) {
            gsap.fromTo(text, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    });
}

// Initialize all animations
function initializeAnimations() {
    // Hero section animations
    animateHeroSection();
    
    // Section animations
    animateSections();
    
    // Skills animations
    animateSkills();
    
    // Projects animations
    animateProjects();
    
    // Timeline animations
    animateTimeline();
    
    // Re-initialize navbar effects after animations (no scroll conflicts)
    initializeNavbarEffects();
    
    // Contact animations
    animateContact();
}

// Hero section animations (modern style)
function animateHeroSection() {
    const tl = gsap.timeline();
    
    // Set initial states for modern entrance
    gsap.set('.hero-image', { opacity: 0, scale: 0.8, y: 30 });
    gsap.set('.hero-greeting', { opacity: 0, y: 30 });
    gsap.set('.title-line', { opacity: 0, y: 50, clipPath: 'inset(0 100% 0 0)' });
    gsap.set('.hero-role', { opacity: 0, y: 30, scale: 0.9 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 30 });
    gsap.set('.cv-link', { opacity: 0, y: 30, scale: 0.9 });
    gsap.set('.scroll-indicator', { opacity: 0, y: 30 });
    
    // Modern entrance sequence
    tl.to('.hero-image', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    })
    
    // Greeting with smooth fade
    .to('.hero-greeting', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.8')
    
    // Title with clip-path reveal effect
    .to('.title-line', {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.5')
    
    // Role badge
    .to('.hero-role', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    
    // Subtitle
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    
    // CV Link with bounce effect
    .to('.cv-link', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.2')
    
    // Scroll indicator
    .to('.scroll-indicator', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.2');
    
    // Parallax effect for hero background
    gsap.to('.hero-bg-animation', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Subtle floating animation for profile photo
    gsap.to('.profile-photo', {
        y: -10,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
    
    // Subtle glow effect
    gsap.to('.profile-photo', {
        boxShadow: '0 0 40px rgba(100, 255, 218, 0.4)',
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
}

// Section animations (enhanced with modern effects)
function animateSections() {
    // Modern section titles with clip-path reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)'
        }, {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animate section subtitles with slide effect
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.fromTo(subtitle, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // About section with modern entrance
    gsap.fromTo('.about-intro', {
        opacity: 0,
        y: 50,
        scale: 0.95
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-intro',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Services with modern stagger
    gsap.utils.toArray('.service').forEach((service, index) => {
        gsap.fromTo(service, {
            opacity: 0,
            y: 40,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: service,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Add parallax effect to sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.to(section, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

// Skills animations (unified style for all cards)
function animateSkills() {
    // Unified hover animations for all skill cards
    gsap.utils.toArray('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Unified expertise cards animation
    gsap.utils.toArray('.expertise-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 40,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Projects animations (enhanced)
function animateProjects() {
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 80,
            scale: 0.9,
            rotationX: 10
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Enhanced project card interactions
    gsap.utils.toArray('.project-card').forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                y: -5,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Timeline animations
function animateTimeline() {
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const isOdd = index % 2 === 1;
        
        gsap.fromTo(item, {
            opacity: 0,
            x: isOdd ? 100 : -100
        }, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animate timeline line
    gsap.fromTo('.timeline::before', {
        scaleY: 0
    }, {
        scaleY: 1,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Contact animations
function animateContact() {
    gsap.fromTo('.contact-form-container', {
        opacity: 0,
        x: -50
    }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.fromTo('.contact-info', {
        opacity: 0,
        x: 50
    }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.utils.toArray('.form-group').forEach((group, index) => {
        gsap.fromTo(group, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: group,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
    
    // Navbar background on scroll
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: '.navbar'
        }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    ScrollTrigger.batch(sections, {
        onEnter: (elements) => {
            const id = elements[0].getAttribute('id');
            updateActiveNavLink(id);
        },
        onEnterBack: (elements) => {
            const id = elements[0].getAttribute('id');
            updateActiveNavLink(id);
        }
    });
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

// Form functionality
function initializeForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: '#ffffff',
        backgroundColor: type === 'success' ? '#044348' : '#B35C37',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cursor effect (optional enhancement)
function initializeCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        backgroundColor: '#044348',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease'
    });
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });
}

// Scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    
    Object.assign(scrollBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        backgroundColor: '#044348',
        color: '#F3EFE3',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.2rem',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(100px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    ScrollTrigger.create({
        start: 'top -200',
        end: 99999,
        onUpdate: (self) => {
            if (self.direction === -1) {
                gsap.to(scrollBtn, { opacity: 1, y: 0, duration: 0.3 });
            } else {
                gsap.to(scrollBtn, { opacity: 0, y: 100, duration: 0.3 });
            }
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: 'power3.inOut'
        });
    });
}

// Modern Loading Animation inspired by vwlab.io
window.addEventListener('load', () => {
    createModernLoader();
});

function createModernLoader() {
    // Add loading class to body to hide content
    document.body.classList.add('loading');
    
    const loader = document.createElement('div');
    loader.className = 'modern-loader';
    loader.innerHTML = `
        <div class="loader-overlay"></div>
        <div class="loader-content">
            <div class="logo-container">
                <div class="logo-letters">
                    <span class="logo-letter" data-letter="A">A</span>
                    <span class="logo-letter" data-letter="L">L</span>
                    <span class="logo-letter" data-letter="B">B</span>
                    <span class="logo-letter" data-letter="E">E</span>
                    <span class="logo-letter" data-letter="R">R</span>
                    <span class="logo-letter" data-letter="T">T</span>
                    <span class="logo-letter" data-letter="O">O</span>
                </div>
                <div class="logo-surname">
                    <span class="logo-letter" data-letter="F">F</span>
                    <span class="logo-letter" data-letter="E">E</span>
                    <span class="logo-letter" data-letter="R">R</span>
                    <span class="logo-letter" data-letter="N">N</span>
                    <span class="logo-letter" data-letter="Á">Á</span>
                    <span class="logo-letter" data-letter="N">N</span>
                    <span class="logo-letter" data-letter="D">D</span>
                    <span class="logo-letter" data-letter="E">E</span>
                    <span class="logo-letter" data-letter="Z">Z</span>
                </div>
            </div>
            
            <div class="loading-animation">
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div class="loading-text">Loading Experience</div>
            </div>
            
            <div class="progress-container">
                <div class="progress-line">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-percent">0%</div>
            </div>
            
            <div class="geometric-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
            </div>
            
            <div class="grid-pattern"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    addModernLoaderStyles();
    animateModernLoader(loader);
}

function addModernLoaderStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
        /* Hide page content during loading */
        body.loading > *:not(.modern-loader) {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .modern-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #F3EFE3;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            overflow: hidden;
        }
        
        .loader-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 50%, rgba(4, 67, 72, 0.1) 0%, transparent 70%);
        }
        
        .loader-content {
            position: relative;
            text-align: center;
            z-index: 2;
        }
        
        .logo-container {
            margin-bottom: 4rem;
        }
        
        .logo-letters, .logo-surname {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .logo-letter {
            font-family: 'Inter', sans-serif;
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 700;
            color: #1C1C1C;
            position: relative;
            opacity: 0;
            transform: translateY(100px) scale(0.5);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .logo-letter::before {
            content: attr(data-letter);
            position: absolute;
            top: 0;
            left: 0;
            color: #044348;
            clip-path: inset(0 0 100% 0);
            transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .logo-letter.animate::before {
            clip-path: inset(0 0 0% 0);
        }
        
        .loading-animation {
            margin-bottom: 3rem;
            opacity: 0;
        }
        
        .loading-dots {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .dot {
            width: 8px;
            height: 8px;
            background: #044348;
            border-radius: 50%;
            opacity: 0.3;
            animation: dotPulse 1.5s ease-in-out infinite;
        }
        
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        .dot:nth-child(4) { animation-delay: 0.6s; }
        
        @keyframes dotPulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        .loading-text {
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            color: #7A7A7A;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .progress-container {
            width: 300px;
            margin: 0 auto 3rem;
            opacity: 0;
        }
        
        .progress-line {
            width: 100%;
            height: 2px;
            background: rgba(122, 122, 122, 0.2);
            border-radius: 1px;
            overflow: hidden;
            margin-bottom: 1rem;
        }
        
        .progress-fill {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #044348, #C9A227);
            transition: width 0.3s ease;
            position: relative;
        }
        
        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(4, 67, 72, 0.3));
            animation: shimmer 1s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-20px); }
            100% { transform: translateX(20px); }
        }
        
        .progress-percent {
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            color: #044348;
            font-weight: 600;
        }
        
        .geometric-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0;
        }
        
        .shape {
            position: absolute;
            border: 1px solid rgba(4, 67, 72, 0.2);
        }
        
        .shape-1 {
            width: 100px;
            height: 100px;
            top: 20%;
            left: 10%;
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        
        .shape-2 {
            width: 80px;
            height: 80px;
            top: 60%;
            right: 15%;
            transform: rotate(45deg);
            animation: float 8s ease-in-out infinite reverse;
        }
        
        .shape-3 {
            width: 60px;
            height: 60px;
            bottom: 20%;
            left: 20%;
            border-radius: 50%;
            animation: float 7s ease-in-out infinite;
        }
        
        .shape-4 {
            width: 120px;
            height: 120px;
            top: 30%;
            right: 20%;
            transform: rotate(45deg);
            animation: float 9s ease-in-out infinite reverse;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .grid-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(4, 67, 72, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(4, 67, 72, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0;
        }
        
        @media (max-width: 768px) {
            .logo-letter {
                font-size: clamp(2rem, 8vw, 3rem);
            }
            
            .progress-container {
                width: 250px;
            }
            
            .shape {
                display: none;
            }
        }
    `;
    document.head.appendChild(styles);
}

function animateModernLoader(loader) {
    const tl = gsap.timeline();
    
    // Fase 1: Grid pattern aparece
    tl.to('.grid-pattern', {
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    })
    
    // Fase 2: Formas geométricas aparecen
    .to('.geometric-shapes', {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    
    // Fase 3: Letras del logo aparecen con efecto de corte
    .to('.logo-letter', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
            each: 0.05,
            from: "start"
        },
        ease: 'power3.out',
        onComplete: function() {
            // Activar efecto de corte de color
            gsap.utils.toArray('.logo-letter').forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('animate');
                }, index * 50);
            });
        }
    }, '-=0.3')
    
    // Fase 4: Animación de carga aparece
    .to('.loading-animation', {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.2')
    
    // Fase 5: Barra de progreso aparece
    .to('.progress-container', {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.2')
    
    // Fase 6: Progreso animado
    .to('.progress-fill', {
        width: '100%',
        duration: 3,
        ease: 'power2.inOut',
        onUpdate: function() {
            const progress = Math.round(this.progress() * 100);
            const percentElement = document.querySelector('.progress-percent');
            if (percentElement) {
                percentElement.textContent = progress + '%';
            }
        }
    })
    
    // Fase 7: Salida épica
    .to('.logo-letter', {
        y: -50,
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.in'
    }, '+=0.5')
    
    .to(['.loading-animation', '.progress-container'], {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
    }, '-=0.4')
    
    .to('.geometric-shapes', {
        scale: 1.2,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in'
    }, '-=0.3')
    
    .to('.grid-pattern', {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
    }, '-=0.2')
    
    // Salida final del loader
    .to(loader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
            document.body.removeChild(loader);
            // Iniciar animaciones del hero después del loader
            setTimeout(() => {
                initializeAnimations();
                // Reveal page with elegant transition
                revealPageContent();
            }, 100);
        }
    });
}

function revealPageContent() {
    // Remove loading class to reveal content
    document.body.classList.remove('loading');
    
    // Reveal content with smooth stagger
    gsap.to('body > *:not(.modern-loader)', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: 'power3.out'
    });
    
    // Ensure story paragraphs are visible after page reveal
    setTimeout(() => {
        ensureStoryVisibility();
    }, 500);
}

// Ensure story paragraph visibility (fallback function)
function ensureStoryVisibility() {
    const storyParagraphs = document.querySelectorAll('.story-paragraph');
    storyParagraphs.forEach(paragraph => {
        // Force visibility if opacity is 0
        const computedStyle = window.getComputedStyle(paragraph);
        if (parseFloat(computedStyle.opacity) === 0) {
            gsap.set(paragraph, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0
            });
            paragraph.classList.add('animate');
        }
    });
}

// Initialize story animations
function initializeStoryAnimations() {
    const storyParagraphs = document.querySelectorAll('.story-paragraph');
    
    if (storyParagraphs.length === 0) return;
    
    // Enhanced story paragraph animations with modern effects
    storyParagraphs.forEach((paragraph, index) => {
        // Check if paragraph is already visible (fallback for immediate visibility)
        const isInViewport = paragraph.getBoundingClientRect().top < window.innerHeight;
        
        // Only animate if not immediately visible, otherwise keep visible
        if (!isInViewport) {
            // Set initial state only for elements not in viewport
            gsap.set(paragraph, {
                opacity: 0,
                y: 60,
                scale: 0.95,
                rotationX: 10
            });
        } else {
            // Ensure immediately visible elements are properly set
            gsap.set(paragraph, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0
            });
            // Add animate class immediately for visible elements
            paragraph.classList.add('animate');
        }
        
        // Create scroll-triggered animation
        ScrollTrigger.create({
            trigger: paragraph,
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: () => {
                gsap.to(paragraph, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 1.2,
                    delay: index * 0.15,
                    ease: 'power3.out'
                });
                
                // Add typing effect to the text
                const textElement = paragraph.querySelector('p');
                if (textElement) {
                    // Add animate class for CSS effects
                    paragraph.classList.add('animate');
                    
                    // Add subtle parallax effect
                    gsap.to(textElement, {
                        yPercent: -5,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: paragraph,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1
                        }
                    });
                    
                    // Add glow effect on enter
                    gsap.to(textElement, {
                        boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                }
            },
            onLeave: () => {
                const textElement = paragraph.querySelector('p');
                if (textElement) {
                    gsap.to(textElement, {
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            },
            toggleActions: 'play none none reverse'
        });
        
        // Add hover interactions
        paragraph.addEventListener('mouseenter', () => {
            gsap.to(paragraph, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const textElement = paragraph.querySelector('p');
            if (textElement) {
                gsap.to(textElement, {
                    boxShadow: '0 12px 40px rgba(100, 255, 218, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        paragraph.addEventListener('mouseleave', () => {
            gsap.to(paragraph, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const textElement = paragraph.querySelector('p');
            if (textElement) {
                gsap.to(textElement, {
                    boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Initialize navbar effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class after 50px
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
        
        lastScrollY = currentScrollY;
    });
    
    // Initial check
    updateActiveNavOnScroll();
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            updateActiveNavLink(`#${id}`);
        }
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

