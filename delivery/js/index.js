let currentSlide = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slideCount = slides.length;

function showSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    currentSlide = index;


    slider.style.transform = `translateX(-${currentSlide * 25}%)`;


    slides.forEach((s, i) => {
        if (i === currentSlide) s.classList.add('active');
        else s.classList.remove('active');
    });


    dots.forEach((d, i) => {
        if (i === currentSlide) d.classList.add('active');
        else d.classList.remove('active');
    });
}

function changeSlide(step) {
    showSlide(currentSlide + step);
    resetTimer();
}

function setSlide(index) {
    showSlide(index);
    resetTimer();
}

let slideTimer = setInterval(() => changeSlide(1), 5000);

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => changeSlide(1), 5000);
}

function toggleMenu(event) {
    if (event) {
        event.stopPropagation();
    }
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Fechar menu ao clicar fora
document.addEventListener('click', function (event) {
    const menu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.mobile-toggle');

    // Se o menu está aberto e o clique não foi no menu nem no botão
    if (menu && menuToggle && menu.classList.contains('active')) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Fechar menu ao clicar em um link
const menuLinks = document.querySelectorAll('.nav-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        const menu = document.querySelector('.nav-menu');
        if (menu) {
            menu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});


window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});


let startX = 0;
let isDown = false;
let scrollStartX = 0;
let walk = 0;
const sliderContainer = document.querySelector('.slider-container');

const getEventX = (e) => e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

sliderContainer.style.cursor = 'grab';


function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

reveal();

function startDragging(e) {
    isDown = true;
    startX = getEventX(e);
    scrollStartX = -currentSlide * sliderContainer.offsetWidth;
    slider.style.transition = 'none';
    sliderContainer.style.cursor = 'grabbing';
    resetTimer();
}

function stopDragging(e) {
    if (!isDown) return;
    isDown = false;
    slider.style.transition = 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
    sliderContainer.style.cursor = 'grab';

    const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 100) {
        if (diff > 0) changeSlide(1);
        else changeSlide(-1);
    } else {
        showSlide(currentSlide);
    }
}

function moveDragging(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = getEventX(e);
    walk = x - startX;
    const currentTranslate = scrollStartX + walk;
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

sliderContainer.addEventListener('mousedown', startDragging);
sliderContainer.addEventListener('touchstart', startDragging, { passive: true });

window.addEventListener('mouseup', stopDragging);
sliderContainer.addEventListener('touchend', stopDragging, { passive: true });

window.addEventListener('mousemove', moveDragging);
sliderContainer.addEventListener('touchmove', moveDragging, { passive: false });


const originalShowSlide = showSlide;
showSlide = function (index) {
    slider.style.transition = 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
    originalShowSlide(index);
}
