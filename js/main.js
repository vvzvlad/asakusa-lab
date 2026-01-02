// Yandex Map initialization
function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            var map = new ymaps.Map('yandex-map', {
                center: [55.758574, 37.656854],
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });

            var placemark = new ymaps.Placemark([55.758574, 37.656854], {
                balloonContent: '<strong>Asakusa Lab</strong><br>Казарменный переулок, 8с2<br>вход с зеленым фонарем'
            }, {
                preset: 'islands#greenDotIcon'
            });

            map.geoObjects.add(placemark);
        });
    }
}

// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Yandex Map
    initMap();
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-link, .scroll-down');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            let targetId;
            if (link.classList.contains('scroll-down')) {
                // Scroll to next section for arrow
                const currentSection = link.closest('.screen');
                const nextSection = currentSection.nextElementSibling;
                if (nextSection) {
                    targetId = nextSection.id;
                }
            } else {
                // Get target from href
                targetId = link.getAttribute('href').substring(1);
            }
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Full-page scroll with wheel
    let isScrolling = false;
    const screens = document.querySelectorAll('.screen');
    
    function getCurrentScreenIndex() {
        const scrollPosition = window.scrollY + (window.innerHeight / 2);
        
        for (let i = 0; i < screens.length; i++) {
            const screen = screens[i];
            const screenTop = screen.offsetTop;
            const screenBottom = screenTop + screen.offsetHeight;
            
            if (scrollPosition >= screenTop && scrollPosition < screenBottom) {
                return i;
            }
        }
        return 0;
    }
    
    function scrollToScreen(index) {
        if (index >= 0 && index < screens.length) {
            screens[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Wheel event for full-page scroll
    let wheelTimeout;
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (Math.abs(e.deltaY) < 10) return; // Ignore small scrolls
            
            isScrolling = true;
            
            const currentIndex = getCurrentScreenIndex();
            const direction = e.deltaY > 0 ? 1 : -1;
            const nextIndex = currentIndex + direction;
            
            scrollToScreen(nextIndex);
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }, 50);
    }, { passive: true });
    
    // Touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaY) < 50) return; // Ignore small swipes
        
        isScrolling = true;
        
        const currentIndex = getCurrentScreenIndex();
        const direction = deltaY > 0 ? 1 : -1;
        const nextIndex = currentIndex + direction;
        
        scrollToScreen(nextIndex);
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;
        
        const currentIndex = getCurrentScreenIndex();
        let nextIndex;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                nextIndex = currentIndex + 1;
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                nextIndex = currentIndex - 1;
                break;
            case 'Home':
                e.preventDefault();
                nextIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                nextIndex = screens.length - 1;
                break;
            default:
                return;
        }
        
        isScrolling = true;
        scrollToScreen(nextIndex);
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });
    
});

