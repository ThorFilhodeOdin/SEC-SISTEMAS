// SEC SISTEMAS - JavaScript Principal

// ============================================
// MATRIX EFFECT - OTIMIZADO PARA PERFORMANCE
// ============================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d', { alpha: false }); // Otimização: desabilitar alpha

// Detectar dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Configurar tamanho do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalcular colunas após resize
    const columns = Math.floor(canvas.width / fontSize);
    drops.length = columns;
    for (let i = 0; i < columns; i++) {
        if (drops[i] === undefined) {
            drops[i] = Math.random() * -100;
        }
    }
}

// Caracteres do Matrix (reduzido para performance)
const matrixChars = '01アイウエオカキクケコサシスセソタチツテト';
const fontSize = isMobile ? 16 : 14; // Fonte maior em mobile = menos colunas
const drops = [];

resizeCanvas();

// Variáveis de controle de FPS
let lastFrameTime = 0;
const targetFPS = isMobile ? 20 : 30; // FPS reduzido em mobile
const frameInterval = 1000 / targetFPS;

// Função de desenho otimizada
function drawMatrix(currentTime) {
    // Throttle para controlar FPS
    const elapsed = currentTime - lastFrameTime;
    
    if (elapsed > frameInterval) {
        lastFrameTime = currentTime - (elapsed % frameInterval);
        
        // Fundo semi-transparente para efeito de trilha
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cor verde do Matrix
        ctx.fillStyle = '#0f9';
        ctx.font = fontSize + 'px monospace';

        // Desenhar caracteres (otimizado)
        const columns = Math.floor(canvas.width / fontSize);
        for (let i = 0; i < columns; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            // Resetar gota quando chega ao fim ou aleatoriamente
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }
    
    // Continuar animação
    requestAnimationFrame(drawMatrix);
}

// Iniciar animação com requestAnimationFrame (mais eficiente)
requestAnimationFrame(drawMatrix);

// Redimensionar canvas quando janela muda (com debounce)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 250);
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.querySelector('.nav');

if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
