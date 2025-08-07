// Mobile menu toggle
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
const body = document.body;

function toggleMobileMenu() {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (mobileMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function closeMobileMenu() {
    burgerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
}

burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMobileMenu();
});

// Keyboard accessibility for mobile menu
burgerMenu.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
    }
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking the overlay
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Testimonials slider
let currentSlide = 0;
let currentBgSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.nav-dot');
const bgSlides = document.querySelectorAll('.testimonials-bg-slide');
const totalSlides = testimonials.length;
const totalBgSlides = bgSlides.length;

function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active', 'prev');
        if (i === index) {
            testimonial.classList.add('active');
        } else if (i < index) {
            testimonial.classList.add('prev');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index);
    });
}

function showBackgroundSlide(index) {
    bgSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function nextBackgroundSlide() {
    currentBgSlide = (currentBgSlide + 1) % totalBgSlides;
    showBackgroundSlide(currentBgSlide);
}

// Auto-advance testimonials every 5 seconds
setInterval(nextSlide, 5000);

// Auto-advance background slides every 3 seconds (different timing for visual interest)
setInterval(nextBackgroundSlide, 3000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Form submission with enhanced analytics
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending Your Quote Request...';
    submitButton.disabled = true;
    
    // Submit form data to Formspree
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            // Success message
            alert('Thank you for your custom PC quote request! We\'ll get back to you within 24 hours with a detailed proposal.');
            form.reset();
        } else {
            // Error message
            alert('Sorry, there was an error sending your quote request. Please try calling us directly or send an email to info@kestechsystems.ca');
        }
    })
    .catch(error => {
        // Network error
        alert('Sorry, there was an error sending your message. Please try again or contact us directly at info@kestechsystems.ca');
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.querySelectorAll('.service-card, .about-text, .contact-info').forEach(el => {
    observer.observe(el);
});

// Add navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Add screen reader only styles
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);