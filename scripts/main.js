// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Плавная прокрутка для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Обновление активной ссылки
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// Случайная тряска элементов при загрузке
function randomShake() {
    const elements = document.querySelectorAll('.shake-on-hover');
    elements.forEach(el => {
        setTimeout(() => {
            el.style.animation = 'shake-on-hover 0.5s ease-in-out';
            setTimeout(() => {
                el.style.animation = '';
            }, 500);
        }, Math.random() * 2000);
    });
}

// Динамический title с эффектом "взлома"
function dynamicTitle() {
    const originalTitle = "RECH | Разработчик игр";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";
    let iteration = 0;
    let isAnimating = false;
    
    function animate() {
        if (isAnimating) return;
        isAnimating = true;
        
        const interval = setInterval(() => {
            document.title = originalTitle.split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return originalTitle[index];
                    }
                    return symbols[Math.floor(Math.random() * symbols.length)];
                })
                .join("");
            
            if(iteration >= originalTitle.length) {
                clearInterval(interval);
                document.title = originalTitle;
                isAnimating = false;
            }
            
            iteration += 1 / 3;
        }, 50);
    }
    
    // Запускаем анимацию при загрузке
    animate();
    
    // Запускаем анимацию при возвращении на вкладку
    window.addEventListener('focus', () => {
        if (!isAnimating) {
            document.title = originalTitle;
            iteration = 0;
            setTimeout(animate, 2000);
        }
    });
}

// Эффект параллакса для фона
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelector('.hex-grid').style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    randomShake();
    dynamicTitle();
    initParallax();
    
    // Анимация scan-line для секций
    const infoSections = document.querySelectorAll('.info-section');
    infoSections.forEach(section => {
        const scanLine = document.createElement('div');
        scanLine.classList.add('scan-line');
        section.appendChild(scanLine);
    });
});