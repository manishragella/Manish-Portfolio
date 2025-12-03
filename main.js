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
                // Success State: Change button to green with tick
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