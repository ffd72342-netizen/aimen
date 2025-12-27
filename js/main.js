// Main JavaScript functionality

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeToggleIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon(newTheme);
    });

    function updateThemeToggleIcon(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
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

    // Sticky header functionality
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section, main > section');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `${window.location.pathname}#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call once on load

    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formSuccess = document.getElementById('form-success');
        const submitBtn = document.getElementById('submit-btn');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous errors
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Validate required fields
            if (!name) {
                showError('name', 'Name is required');
                isValid = false;
            }

            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            if (!service) {
                showError('service', 'Please select a service');
                isValid = false;
            }

            if (!message) {
                showError('message', 'Message is required');
                isValid = false;
            }

            if (phone && !isValidPhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';

                    // Reset form
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }, 2000);
            }
        });
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        const priceAmounts = document.querySelectorAll('.price-amount');

        billingToggle.addEventListener('change', function() {
            priceAmounts.forEach(amount => {
                const monthlyPrice = amount.getAttribute('data-monthly');
                const yearlyPrice = amount.getAttribute('data-yearly');

                if (this.checked) {
                    // Yearly pricing
                    amount.textContent = `$${yearlyPrice}`;
                } else {
                    // Monthly pricing
                    amount.textContent = `$${monthlyPrice}`;
                }
            });
        });
    }

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';

            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });

            // Open clicked answer if it was closed
            if (!isOpen) {
                answer.style.display = 'block';
            }
        });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Services tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Modal functionality for portfolio
    const viewButtons = document.querySelectorAll('.view-project-btn');
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    if (modal) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                showProjectModal(projectId);
            });
        });

        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function showProjectModal(projectId) {
        const projectData = {
            1: {
                title: 'E-Commerce Platform',
                description: 'A comprehensive online shopping platform with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
                duration: '4 months',
                team: '5 developers',
                results: '300% increase in conversion rate, 50k+ active users'
            },
            2: {
                title: 'Fitness Tracking App',
                description: 'Cross-platform mobile application for fitness enthusiasts with workout tracking, nutrition logging, and social features.',
                technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit'],
                duration: '3 months',
                team: '4 developers',
                results: '4.8 star rating, 100k+ downloads'
            },
            3: {
                title: 'AI Customer Support',
                description: 'Intelligent chatbot system that handles customer inquiries, provides instant responses, and escalates complex issues to human agents.',
                technologies: ['Python', 'TensorFlow', 'Dialogflow', 'Node.js'],
                duration: '5 months',
                team: '6 developers',
                results: '70% reduction in response time, 95% customer satisfaction'
            },
            4: {
                title: 'Corporate Website Redesign',
                description: 'Complete overhaul of a Fortune 500 company website with modern design, improved UX, and enhanced performance.',
                technologies: ['Vue.js', 'Nuxt.js', 'SCSS', 'AWS'],
                duration: '2 months',
                team: '3 developers',
                results: '150% increase in engagement, 40% faster load times'
            },
            5: {
                title: 'Cloud Infrastructure Migration',
                description: 'Seamless migration of legacy systems to cloud infrastructure with zero downtime and improved scalability.',
                technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
                duration: '6 months',
                team: '8 developers',
                results: '99.9% uptime, 60% cost reduction'
            },
            6: {
                title: 'Food Delivery App',
                description: 'Real-time food delivery platform connecting restaurants with customers, featuring live tracking and payment integration.',
                technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe'],
                duration: '4 months',
                team: '5 developers',
                results: '50k+ orders processed, 4.7 star rating'
            }
        };

        const project = projectData[projectId];
        if (project) {
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <div>
                        <h3>Technologies Used</h3>
                        <ul>
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h3>Project Details</h3>
                        <p><strong>Duration:</strong> ${project.duration}</p>
                        <p><strong>Team Size:</strong> ${project.team}</p>
                        <p><strong>Results:</strong> ${project.results}</p>
                    </div>
                </div>
            `;
            modal.style.display = 'block';
        }
    }

    // Newsletter subscription forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();

            if (email && isValidEmail(email)) {
                // Simulate subscription
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';

                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed!';
                    this.reset();

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 2000);
                }, 1500);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
});