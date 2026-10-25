const slider = document.getElementById('gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
});
slider.addEventListener('mouseup', () => {
    isDown = false;
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

function scrollGallery(amount) {
    slider.scrollBy({
        left: amount,
        behavior: 'smooth'
    });
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
