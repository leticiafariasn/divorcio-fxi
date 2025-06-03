let currentSlide = 0;
const totalSlides = 4;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next', 'far-left', 'far-right', 'hidden');

        const position = (index - currentSlide + totalSlides) % totalSlides;

        switch (position) {
            case 0:
                slide.classList.add('active');
                break;
            case 1:
                slide.classList.add('next');
                break;
            case totalSlides - 1:
                slide.classList.add('prev');
                break;
            case totalSlides - 2:
                slide.classList.add('far-left');
                break;
            default:
                slide.classList.add('hidden');
                break;
        }
    });

    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Auto-play
let autoPlayInterval = setInterval(nextSlide, 4000);

// Pausar auto-play ao hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 4000);
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/Swipe para mobile
let startX = 0;
let endX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Inicializar o carrossel
updateCarousel();