// Yandex Map initialization
function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            var markerCoords = [55.755905, 37.650927];
            
            var map = new ymaps.Map('yandex-map', {
                center: markerCoords,
                zoom: 17,
                controls: ['zoomControl', 'fullscreenControl']
            });

            var placemark = new ymaps.Placemark(markerCoords, {
                balloonContent: '<strong>Asakusa Lab</strong><br>Казарменный переулок, 8с2<br>вход с зеленым фонарем'
            }, {
                preset: 'islands#greenDotIcon'
            });

            map.geoObjects.add(placemark);
            map.setCenter(markerCoords, 17);
        });
    }
}

// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Yandex Map
    initMap();
    
    // Handle navigation links - smooth scroll only
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle scroll down arrow
    const scrollDownArrow = document.querySelector('.scroll-down');
    if (scrollDownArrow) {
        scrollDownArrow.addEventListener('click', () => {
            const currentSection = scrollDownArrow.closest('.screen');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
