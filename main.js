// Initialize Animations (AOS)
AOS.init({
    once: true,
    offset: 50,
    duration: 800,
});

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

// Navbar Blur on Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('py-2');
            nav.classList.remove('py-4');
        } else {
            nav.classList.add('py-4');
            nav.classList.remove('py-2');
        }
    }
});

// --- TYPING EFFECT ---
const textElement = document.getElementById("typing-text");
const words = ["Software Developer.", "Content Creator.", "AI Enthusiast.", "Tech Storyteller."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }
}

// Start typing effect on load
if(textElement) {
    setTimeout(type, 1500);
}

// --- 3D TILT EFFECT ---
// Applies a subtle 3D tilt to cards when mouse moves over them
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt (max 15 degrees)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// AJAX Form Submission Handling
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop standard form submission
        
        // Show loading state on button
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        // Send data using fetch API
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success State
                submitBtn.innerHTML = 'Submitted <i class="fas fa-check"></i>';
                submitBtn.classList.remove('bg-white', 'text-black', 'hover:bg-gray-200');
                submitBtn.classList.add('bg-green-500', 'text-white', 'cursor-default');
                contactForm.reset();
            } else {
                // Error State
                submitBtn.innerHTML = 'Failed. Try Again.';
                submitBtn.disabled = false;
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnContent;
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.innerHTML = 'Error. Try Again.';
            submitBtn.disabled = false;
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
            }, 3000);
        });
    });
}
