document.addEventListener('DOMContentLoaded', () => {
    
    // Set dynamic year in footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if(mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('open')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close mobile nav on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            });
        });
    }

    // Scroll Fade-in Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Portfolio Tag Filtering (Visual only for now since it's hardcoded masonry)
    const tags = document.querySelectorAll('.portfolio-tags .tag');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            // Full filtering logic would hide/show masonry items here
            // But for aesthetic demonstration, we just toggle the active class
        });
    });

    // ==============================
    // Language Toggle — ES / EN
    // ==============================
    const TRANSLATIONS = {
      en: {
        'nav-home': 'Home', 'nav-artists': 'Artists', 'nav-about': 'About', 'nav-contact': 'Contact',
        'nav-cta': 'Book a Consultation', 'nav-cta-portfolio': 'Book via WhatsApp',
        'footer-rights': 'All rights reserved.',
        'hero-subtitle': 'Custom tattoos and professional piercing in Málaga',
        'portfolio-section-title': 'Our Work', 'portfolio-section-sub': 'A glimpse of what we do best.',
        'btn-view-portfolio': 'View Full Portfolio', 'btn-consultation': 'Book a Consultation',
        'btn-session': 'Book your session', 'btn-book-whatsapp': 'Book via WhatsApp',
        'services-title': 'Our Services', 'service-custom': 'Custom Tattoos',
        'service-custom-desc': 'Designed exclusively for you.',
        'service-coverup-desc': 'Transforming old tattoos perfectly.',
        'service-piercing': 'Body Piercing', 'service-piercing-desc': 'Professional, sterile piercing.',
        'reviews-title': 'Client Testimonials',
        'review-1-text': '"Excellent quality and truly unique designs. They understood perfectly what I was trying to express. Highly recommended!"',
        'review-2-text': '"The professionalism of the team is totally astonishing. Made a cover-up that looks seamless and beautiful. Thanks!"',
        'portfolio-filter-all': 'All',
        'about-title': 'The Art of Ink',
        'about-text': 'We deliver uncompromising custom tattoos in a premium, ultra-hygienic studio in Málaga. No generic flash, just pure artistry grounded in years of professional experience.',
        'artists-title': 'Our Artists', 'artists-subtitle': 'Masters of their craft.',
        'contact-booking-title': 'Book Your Session',
        'contact-booking-sub': 'Booking with us is straightforward. Just follow the steps below.',
        'contact-step1-title': 'Contact via WhatsApp', 'contact-step1-desc': 'Reach out to us directly.',
        'contact-step2-title': 'Send Ideas & Ref', 'contact-step2-desc': 'Share your design concepts.',
        'contact-step3-title': 'Get Quote & Date', 'contact-step3-desc': "We'll set everything up for you.",
        'contact-find-title': 'Find Us', 'contact-find-sub': 'Located in the heart of Málaga.',
        'contact-address-label': 'Address', 'contact-contact-label': 'Contact',
        'contact-hours-label': 'Opening Hours',
        'contact-mon-fri': 'Mon-Fri', 'contact-saturday': 'Saturday',
        'contact-sunday': 'Sunday', 'contact-closed': 'Closed',
      },
      es: {
        'nav-home': 'Inicio', 'nav-artists': 'Artistas', 'nav-about': 'Nosotros', 'nav-contact': 'Contacto',
        'nav-cta': 'Reservar Cita', 'nav-cta-portfolio': 'Reservar por WhatsApp',
        'footer-rights': 'Todos los derechos reservados.',
        'hero-subtitle': 'Tatuajes a medida y piercing profesional en Málaga',
        'portfolio-section-title': 'Nuestro Trabajo', 'portfolio-section-sub': 'Un vistazo a lo que mejor hacemos.',
        'btn-view-portfolio': 'Ver Portfolio Completo', 'btn-consultation': 'Reservar Cita',
        'btn-session': 'Reservar sesión', 'btn-book-whatsapp': 'Reservar por WhatsApp',
        'services-title': 'Nuestros Servicios', 'service-custom': 'Tatuajes a Medida',
        'service-custom-desc': 'Diseñados exclusivamente para vos.',
        'service-coverup-desc': 'Transformamos tatuajes viejos a la perfección.',
        'service-piercing': 'Piercing Corporal', 'service-piercing-desc': 'Piercing profesional y estéril.',
        'reviews-title': 'Opiniones de Clientes',
        'review-1-text': '"Calidad excelente y diseños realmente únicos. Entendieron perfectamente lo que quería expresar. ¡Totalmente recomendado!"',
        'review-2-text': '"El profesionalismo del equipo es increíble. Hicieron un cover-up que quedó perfecto y hermoso. ¡Gracias!"',
        'portfolio-filter-all': 'Todos',
        'about-title': 'El Arte del Tatuaje',
        'about-text': 'Hacemos tatuajes a medida sin concesiones en un estudio premium e higiénico en Málaga. Sin diseños genéricos, solo arte puro respaldado por años de experiencia profesional.',
        'artists-title': 'Nuestros Artistas', 'artists-subtitle': 'Maestros de su arte.',
        'contact-booking-title': 'Reservá tu Sesión',
        'contact-booking-sub': 'Reservar con nosotros es muy fácil. Seguí los pasos.',
        'contact-step1-title': 'Contactanos por WhatsApp', 'contact-step1-desc': 'Escribinos directamente.',
        'contact-step2-title': 'Compartí tus Ideas', 'contact-step2-desc': 'Compartí tu diseño o referencias.',
        'contact-step3-title': 'Cotización y Fecha', 'contact-step3-desc': 'Coordinamos todo con vos.',
        'contact-find-title': 'Dónde Estamos', 'contact-find-sub': 'En el centro de Málaga.',
        'contact-address-label': 'Dirección', 'contact-contact-label': 'Contacto',
        'contact-hours-label': 'Horario',
        'contact-mon-fri': 'Lun-Vie', 'contact-saturday': 'Sábado',
        'contact-sunday': 'Domingo', 'contact-closed': 'Cerrado',
      }
    };

    function applyLang(lang) {
        const t = TRANSLATIONS[lang];
        if (!t) return;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key] !== undefined) el.textContent = t[key];
        });
        document.documentElement.lang = lang;
        document.querySelectorAll('.lang-toggle').forEach(btn => {
            btn.textContent = lang === 'en' ? 'ES' : 'EN';
            btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
        });
        localStorage.setItem('inksession-lang', lang);
    }

    // Init on load
    const _savedLang = localStorage.getItem('inksession-lang') || 'en';
    applyLang(_savedLang);

    // Toggle click
    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const cur = localStorage.getItem('inksession-lang') || 'en';
            applyLang(cur === 'en' ? 'es' : 'en');
        });
    });

});
