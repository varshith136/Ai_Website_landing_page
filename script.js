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

    // 5. URGENCY COUNTDOWN TIMER & SEAT COUNTER
    const timerDuration = 300; // 5 minutes in seconds
    let timeRemaining = timerDuration;
    
    const timerElements = document.querySelectorAll(".countdown-timer");
    const spotsElements = document.querySelectorAll(".spots-count");
    
    function updateUrgencyDisplays() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timerElements.forEach(el => {
            el.textContent = timeString;
        });
        
        // Count down seats from 8 to 3 as time ticks away
        let spotsLeft = 8;
        if (timeRemaining < 250 && timeRemaining >= 180) {
            spotsLeft = 7;
        } else if (timeRemaining < 180 && timeRemaining >= 120) {
            spotsLeft = 6;
        } else if (timeRemaining < 120 && timeRemaining >= 60) {
            spotsLeft = 5;
        } else if (timeRemaining < 60 && timeRemaining >= 20) {
            spotsLeft = 4;
        } else if (timeRemaining < 20) {
            spotsLeft = 3;
        }
        
        spotsElements.forEach(el => {
            el.textContent = spotsLeft;
        });
    }
    
    setInterval(() => {
        timeRemaining--;
        if (timeRemaining < 0) {
            timeRemaining = timerDuration; // Reset to 5:00
        }
        updateUrgencyDisplays();
    }, 1000);
    
    updateUrgencyDisplays();
});
