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

// Подсветка активного пункта навигации при скролле
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Плавная прокрутка для навигации
function initSmoothScrolling() {
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
}

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

// Инициализация typewriter эффекта для заголовка
function initTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

    const originalText = typewriter.textContent.trim();
    typewriter.textContent = '';
    typewriter.style.visibility = 'visible';
    
    // Создаем каретку с тонким стилем
    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.textContent = '|';
    caret.style.fontWeight = '100'; // Тонкий стиль
    caret.style.marginLeft = '5px'; // Дополнительный отступ
    
    // Вставляем каретку
    typewriter.appendChild(caret);
    
    // Анимация печатания
    let i = 0;
    const speed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            const charSpan = document.createElement('span');
            charSpan.textContent = originalText.charAt(i);
            typewriter.insertBefore(charSpan, caret);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Инициализация scan-line эффекта для секций
function initScanLines() {
    const infoSections = document.querySelectorAll('.info-section');
    infoSections.forEach(section => {
        const scanLine = document.createElement('div');
        scanLine.classList.add('scan-line');
        section.appendChild(scanLine);
    });
}

// Инициализация частиц
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные начальные параметры
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Анимация движения
        particle.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Функция для копирования крипто-адресов
function initCryptoCopy() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            navigator.clipboard.writeText(address).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Скопировано!';
                this.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = 'rgba(0, 30, 0, 0.7)';
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
            });
        });
    });
}


// Основная функция инициализации
function init() {
    // Инициализация компонентов
    initSmoothScrolling();
    initTypewriter();
    initScanLines();
    initParticles();
    initCryptoCopy();
	
    // Запуск анимаций
    randomShake();
    dynamicTitle();
    initParallax();
    
    // Обработчики событий
    window.addEventListener('scroll', () => {
        animateOnScroll();
        highlightNavOnScroll();
    });
    
    // Первоначальный вызов
    animateOnScroll();
    highlightNavOnScroll();
}

// Запуск при полной загрузке страницы
document.addEventListener('DOMContentLoaded', init);