document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Project filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real portfolio, you'd handle the form submission with a backend
            // This is a placeholder that shows an alert
            alert('Thank you for reaching me out! Your message has been sent to the owner.');
            contactForm.reset();
        });
    }

    // Typing effect for hero section
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const texts = [
            typingElement.getAttribute('data-text-1'),
            typingElement.getAttribute('data-text-2'),
            typingElement.getAttribute('data-text-3')
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                // Deleting text
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 100; // Faster when deleting
            } else {
                // Typing text
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200; // Normal speed when typing
            }

            // Check if word is complete
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of word
                typingDelay = 2000; // Wait before deleting
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word when completely deleted
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500; // Pause before typing next word
            }

            setTimeout(type, typingDelay);
        }

        // Start the typing effect
        if (texts[0]) {
            setTimeout(type, 1000);
        }
    }

    // Activate AOS (if you want to add animations)
    // If you want to use AOS library for scroll animations,
    // uncomment this and add AOS library to your HTML
    // AOS.init({
    //     duration: 1000,
    //     once: true
    // });

    // Optional: Add active class to navbar links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
        
