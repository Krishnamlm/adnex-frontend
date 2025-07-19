// frontend/js/main.js

// --- Your existing JavaScript code for various functionalities ---

// Header Scroll
// ... (Your header scroll code) ...

// Owl Carousel
$(document).ready(function() {
    $(".client-slider-section").owlCarousel({
        items: 4, loop: true, nav: false, autoplay: true, autoplayTimeout: 2000,
        autoplayHoverPause: true, responsiveClass: true,
        responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 6 } }
    });
});

// Magnific Popup
$(document).ready(function() {
    $('.user-upload-img').magnificPopup({
        delegate: 'a', type: 'image', gallery: { enabled: true }
    });
});

// Counter Animation
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.number');
    const speed = 200; // The lower the number, the faster the count

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = +counter.innerText.replace(/,/g, ''); // Remove commas for calculation

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment).toLocaleString();
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    const options = {
        root: null, rootMargin: '0px', threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionCounters = entry.target.querySelectorAll('.number');
                sectionCounters.forEach(counter => { animateCounter(counter); });
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const factsSection = document.querySelector('.facts-figures-section');
    if (factsSection) {
        observer.observe(factsSection);
    } else {
        counters.forEach(counter => { animateCounter(counter); });
    }
});

/* selected services */
document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    const selectedServicesInput = document.getElementById('selectedServices');
    let selectedServices = new Set();

    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.dataset.service;
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedServices.delete(service);
            } else {
                this.classList.add('selected');
                selectedServices.add(service);
            }
            selectedServicesInput.value = Array.from(selectedServices).join(', ');
            console.log("Selected Services:", selectedServicesInput.value);
        });
    });
});

// Popup Banner
window.onload = function () {
    setTimeout(function () {
        const popupBanner = document.getElementById('popup-banner');
        if (popupBanner) {
            popupBanner.style.display = 'block';
        }
    }, 1000); // 1 second delay
};

function closePopup() {
    const popupBanner = document.getElementById('popup-banner');
    if (popupBanner) {
        popupBanner.style.display = 'none';
    }
}

// Text/Animation Reveals
document.addEventListener('DOMContentLoaded', () => {
    const bannerSection = document.getElementById('home');
    if (!bannerSection) return;

    const textRevealElements = document.querySelectorAll('.anim-text-reveal');
    textRevealElements.forEach(element => {
        const textContent = element.innerHTML;
        element.innerHTML = '';
        const lines = textContent.split('<br>');
        lines.forEach((line, lineIndex) => {
            const lineSpan = document.createElement('span');
            lineSpan.style.display = 'inline-block';
            lineSpan.style.overflow = 'hidden';
            const wordSpans = line.split(' ').map(word => {
                const wordSpan = document.createElement('span');
                wordSpan.textContent = word + ' ';
                wordSpan.style.display = 'inline-block';
                wordSpan.style.transform = 'translateY(100%)';
                wordSpan.style.opacity = '0';
                return wordSpan;
            });
            wordSpans.forEach(span => lineSpan.appendChild(span));
            element.appendChild(lineSpan);
            if (lineIndex < lines.length - 1) { element.appendChild(document.createElement('br')); }
        });
    });

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.classList.contains('anim-text-reveal')) {
                    const wordSpans = target.querySelectorAll('.anim-text-reveal > span > span');
                    wordSpans.forEach((span, index) => {
                        setTimeout(() => {
                            span.style.transform = 'translateY(0)';
                            span.style.opacity = '1';
                        }, index * 80);
                    });
                } else if (target.classList.contains('anim-text-fade-in') || target.classList.contains('anim-fade-up')) {
                    target.classList.add('is-visible');
                }
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.Hub, .banner-title, .banner-title-text, .learn-more-btn-section').forEach(element => {
        observer.observe(element);
    });

    // Handle hero image wrapper 3D tilt
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    if (heroImageWrapper) {
        heroImageWrapper.addEventListener('mousemove', (e) => {
            const rect = heroImageWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = (e.clientY - centerY) / 25;
            const rotateY = (centerX - e.clientX) / 25;
            heroImageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        heroImageWrapper.addEventListener('mouseleave', () => {
            heroImageWrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }
});

// WhatsApp Icon Animation
document.addEventListener('DOMContentLoaded', () => {
    const whatsappIcon = document.querySelector('.whatsapp-float img');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('click', () => {
            whatsappIcon.classList.add('zoom-clicked');
            const handleAnimationEnd = () => {
                whatsappIcon.classList.remove('zoom-clicked');
                whatsappIcon.removeEventListener('animationend', handleAnimationEnd);
            };
            whatsappIcon.addEventListener('animationend', handleAnimationEnd);
        });
    }
});


// --- NEW/UPDATED: Intercept clicks on protected links using verifyTokenWithBackend ---
// This part MUST be present and correctly configured to handle protected pages.
document.addEventListener('DOMContentLoaded', () => {
    // Select all links that point to your protected HTML routes
    // Ensure these selectors match your actual HTML link hrefs.
    const protectedLinkSelectors = [
        'a[href="/graphic.html"]',
        'a[href="/internship-form.html"]',
        'a[href="/contact.html"]',
        'a[href="/development.html"]',
        'a[href="/digital.html"]'
    ];
    const protectedLinks = document.querySelectorAll(protectedLinkSelectors.join(', '));

    protectedLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent the default browser navigation

            const targetFrontendUrl = link.getAttribute('href'); // This will be like "/graphic.html"

            try {
                // First, verify the token's validity by calling the backend API
                // verifyTokenWithBackend handles redirects to /login.html if unauthorized.
                const isAuthenticated = await verifyTokenWithBackend();

                if (isAuthenticated) {
                    // If the token is valid, proceed with actual navigation to the frontend page
                    window.location.href = targetFrontendUrl;
                }
                // No need for an else block, as verifyTokenWithBackend already handles redirects

            } catch (error) {
                console.error('Error during protected link navigation (frontend side):', error);
                // This catch primarily handles unexpected JavaScript errors during the async operation.
            }
        });
    });

    // Optional: Attach logout function to a logout button/link
    const logoutButton = document.getElementById('logout-button'); // Example: assumes an element with id="logout-button"
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior if it's an <a> tag
            logoutUser(); // Call the logout function from authUtils.js
        });
    }
});
