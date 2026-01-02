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
            
            // Geocode address to get exact coordinates
            ymaps.geocode('Москва, Казарменный переулок, 8с2').then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                var coords = firstGeoObject.geometry.getCoordinates();
                
                map.setCenter(coords, 16);
                placemark.geometry.setCoordinates(coords);
            });
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
