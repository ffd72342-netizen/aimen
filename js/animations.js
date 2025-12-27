// Animation and interaction functionality

document.addEventListener('DOMContentLoaded', function() {
    // Animated counters
    const counters = document.querySelectorAll('.stat-number');

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .team-member, .value-item, .portfolio-item, .pricing-card, .office-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    // Hover animations for interactive elements
    const interactiveElements = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card, .team-member');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Button hover animations
    const buttons = document.querySelectorAll('.btn, .filter-btn, .tab-btn, .suggestion-btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Typing animation for chat
    function addTypingAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }

            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #4A90E2;
                animation: typing 1.4s infinite ease-in-out;
            }

            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

            @keyframes typing {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addTypingAnimation();

    // Smooth scroll animations
    function smoothScroll(target, duration = 800) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Parallax effect for hero sections (subtle)
    const heroSections = document.querySelectorAll('.hero');

    function parallaxHero() {
        heroSections.forEach(hero => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const video = hero.querySelector('.hero-video');
            if (video) {
                video.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    window.addEventListener('scroll', parallaxHero);

    // Loading animation for page transitions
    function addLoadingAnimation() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading...</p>
            </div>
        `;

        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            #page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }

            [data-theme="dark"] #page-loader {
                background: #1A1A1A;
            }

            .loader-content {
                text-align: center;
            }

            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #4A90E2;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            #page-loader.fade-out {
                opacity: 0;
                visibility: hidden;
            }
        `;

        document.head.appendChild(loaderStyle);
        document.body.appendChild(loader);

        // Fade out loader after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 300);
            }, 500);
        });
    }

    addLoadingAnimation();

    // Micro-interactions for form elements
    const formInputs = document.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Pulse animation for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');

    function addPulseAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0);
                }
            }

            .btn-primary {
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Add pulse animation after a delay
    setTimeout(addPulseAnimation, 3000);

    // Image lazy loading with fade-in effect
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                // Simulate loading
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);

                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Dynamic background gradient animation
    function addGradientAnimation() {
        const gradients = document.querySelectorAll('.hero, .pricing-hero, .services-hero, .contact-hero, .about-hero, .portfolio-hero, .chat-hero');

        gradients.forEach(gradient => {
            gradient.style.backgroundSize = '400% 400%';
            gradient.style.animation = 'gradientShift 15s ease infinite';
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addGradientAnimation();
});