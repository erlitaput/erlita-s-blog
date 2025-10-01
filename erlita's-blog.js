// Dynamic page loader
function loadPage(page) {
    fetch(page + '.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            // Re-run interactive JS for new content if needed
            attachFormHandler();
        });
    // Update nav active state
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${page}')`) {
            link.classList.add('active');
        }
    });
}

// Show page handler
function showPage(page) {
    loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load default page and footer on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    loadPage('home');
    fetch('footer.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('footer').innerHTML = html;
        });
});

// --- INTERACTIVE EFFECTS (existing code) ---

// Parallax effect for background shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 20;
        const yPos = (y - 0.5) * speed * 20;
        shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

// Scroll-based parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-shapes');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Ripple effect for glass elements
document.querySelectorAll('.glass').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        this.style.position = 'relative';
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission handler (re-attached after page load)
function attachFormHandler() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(46, 204, 113, 0.9);
                color: white;
                padding: 20px 40px;
                border-radius: 10px;
                backdrop-filter: blur(20px);
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            document.body.appendChild(successMsg);
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
            this.reset();
        });
    }
}

// Fade in animation keyframes
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(fadeStyle);

// popup functions
function openPopup(id) {
    document.getElementById(id).style.display = 'block';
}
function closePopup(id) {
    document.getElementById(id).style.display = 'none';

}
