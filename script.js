// ==========================================================================
// AI Website Building Webinar - JavaScript Functionality
// ==========================================================================

// 1. RAZORPAY REGISTRATION URL
const REGISTRATION_URL = "https://rzp.io/rzp/KEXZYJO";

document.addEventListener("DOMContentLoaded", () => {
    // 2. INITIALIZE LUCIDE ICONS
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // 3. ATTACH REGISTRATION ACTION TO ALL CTA BUTTONS
    const ctaButtons = document.querySelectorAll(".cta-trigger");
    ctaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            // Redirect to Razorpay hosted payment page in the same window
            window.location.href = REGISTRATION_URL;
        });
    });

    // 4. SCROLL ENTRANCE ANIMATIONS (FADE-UP)
    const fadeUpElements = document.querySelectorAll(".fade-up");
    
    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null, // use viewport as root
            rootMargin: "0px",
            threshold: 0.1 // trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Once animated, stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeUpElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        fadeUpElements.forEach(element => {
            element.classList.add("visible");
        });
    }
});
