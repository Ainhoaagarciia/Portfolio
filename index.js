// --- Animaciones al hacer scroll ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// --- Desplegables fluidos (Accordeons) ---
document.querySelectorAll('details.animated-details').forEach((details) => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.accordion-content-inner');

    summary.addEventListener('click', (e) => {
        e.preventDefault();
        if (details.open) {
            content.style.maxHeight = content.scrollHeight + 'px';
            requestAnimationFrame(() => {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
            });
            setTimeout(() => {
                details.open = false;
            }, 300);
        } else {
            details.open = true;
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            requestAnimationFrame(() => {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            });
            setTimeout(() => {
                content.style.maxHeight = 'none';
            }, 300);
        }
    });
});

// --- Carrusel Suave con Indicadores (Dots) ---
function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-slide');
    let activeIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

    let newIndex = (activeIndex + direction + slides.length) % slides.length;
    updateCarousel(carouselId, newIndex);
}

function currentSlide(carouselId, index) {
    updateCarousel(carouselId, index);
}

function updateCarousel(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    track.style.transform = `translateX(-${index * 100}%)`;
}

// --- Menú Hamburguesa ---
(function () {
    function initMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        if (!menuToggle || !navLinks) return;

        // Abrir / Cerrar al hacer clic en el botón de la hamburguesa
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Cerrar al hacer clic en cualquier enlace del menú
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // Cerrar si se hace clic fuera del menú lateral
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    // Ejecutar cuando el DOM esté listo o de forma inmediata si ya cargó
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();