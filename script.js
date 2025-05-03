/* ======== DOM Elements ======== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

/* ======== Toggle Mobile Menu ======== */
const toggleMenu = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Optional: prevent background scrolling
};

menuIcon.addEventListener('click', toggleMenu);

/* ======== Smooth Scrolling for Anchor Links ======== */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close mobile menu when a link is clicked
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        
        // Smooth scroll to target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

/* ======== Active Section Detection ======== */
const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sec => {
        const offset = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPosition >= offset && scrollPosition < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
            
            // Optional: Update URL hash without jumping
            if (history.pushState) {
                history.pushState(null, null, `#${id}`);
            }
        }
    });
    
    // Sticky Header
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Throttle scroll events for better performance
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(updateActiveSection, 50);
}, { passive: true });

/* ======== Scroll Reveal Animations ======== */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        reset: false, // Changed to false to prevent re-animations
        distance: '50px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        mobile: false // Disable on mobile for better performance
    });

    sr.reveal('.home-content, .heading', { 
        origin: 'top',
        interval: 100
    });
    sr.reveal('.home-img, .education-row, .services-container, .portfolio-container, .contact form', { 
        origin: 'bottom',
        interval: 100
    });
    sr.reveal('.home-content h1, .about-img, .portfolio-box, .skills-column:first-child', { 
        origin: 'left',
        interval: 100
    });
    sr.reveal('.home-content p, .about-content, .skills-column:last-child', { 
        origin: 'right',
        interval: 100
    });
}

/* ======== Typed.js Animation ======== */
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['Full Stack Developer', 'MERN Stack Developer', 'Web Developer', 'Frontend Developer', 'Backend Developer', ],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });
}

/* ======== Initialize on Load ======== */
document.addEventListener('DOMContentLoaded', () => {
    updateActiveSection(); // Set initial active section
    
    // Add animation class to body to prevent FOUC
    document.body.classList.add('js-loaded');
    
    // Optional: Preload critical elements
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});