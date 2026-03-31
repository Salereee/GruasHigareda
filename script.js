// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');
    
    // Toggle para el menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInside && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Configuración para Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Crear un solo observer para todos los elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = entry.target.dataset.transform || 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Función para configurar elementos animados
    const setupAnimatedElements = (elements, baseTransform, delayMultiplier) => {
        elements.forEach((element, index) => {
            element.style.opacity = 0;
            element.style.transform = baseTransform;
            element.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * delayMultiplier}s`;
            element.dataset.transform = 'translateY(0)';
            observer.observe(element);
        });
    };
    
    // Aplicar animaciones a diferentes elementos
    setupAnimatedElements(document.querySelectorAll('.servicio-card'), 'translateY(20px)', 0.1);
    setupAnimatedElements(document.querySelectorAll('.ciudad-card'), 'translateY(20px)', 0.1);
    setupAnimatedElements(document.querySelectorAll('.img-container'), 'scale(0.95)', 0.1);
    
    // Comportamiento de desplazamiento suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar el estilo del encabezado al hacer scroll
    let scrolled = false;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (!scrolled) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                scrolled = true;
            }
        } else {
            if (scrolled) {
                header.style.boxShadow = 'none';
                scrolled = false;
            }
        }
    });
}); 