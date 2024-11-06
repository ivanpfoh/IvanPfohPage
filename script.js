document.getElementById('mi-imagen').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'flex'; // Muestra el popup
});

document.getElementById('cerrar-popup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none'; // Cierra el popup
});

// Cerrar el popup si se hace clic fuera de él
window.addEventListener('click', function(event) {
    var popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

document.getElementById('copiar-email').addEventListener('click', function() {
    var email = document.getElementById('email').textContent;
    
    // Crea un elemento temporal para copiar el texto
    var tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    
    tempInput.select();  // Selecciona el texto
    document.execCommand('copy');  // Copia el texto al portapapeles
    
    // Elimina el input temporal
    document.body.removeChild(tempInput);
    
    // Mostrar el mensaje de "Correo copiado" con animación
    var mensaje = document.getElementById('mensaje-copiado');
    mensaje.style.display = 'block';
    mensaje.style.opacity = 1;
    
    // Ocultar el mensaje después de 2 segundos
    setTimeout(function() {
        mensaje.style.opacity = 0;
        setTimeout(function() {
            mensaje.style.display = 'none';
        }, 500);  // Espera que la animación termine antes de ocultar el mensaje
    }, 2000); // El mensaje estará visible durante 2 segundos
});
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Si el elemento está en la vista
        if (entry.isIntersecting) {
            entry.target.classList.add('aparecer'); // Añadimos la clase 'aparecer'
            observer.unobserve(entry.target); // Deja de observar el elemento una vez que ha sido animado
        }
    });
}, {
    threshold: 0.5 // El 50% del elemento debe ser visible para activar la animación
});

// Seleccionamos todos los elementos <p> que queremos animar
const elementos = document.querySelectorAll('p');

// Comenzamos a observar cada uno de esos elementos
elementos.forEach(elemento => {
    observer.observe(elemento);
});


function smoothScroll(target) {
    const targetElement = document.getElementById(target);
    const targetPosition = targetElement.offsetTop; // Obtiene la posición del destino
    const startPosition = window.pageYOffset; // Posición actual de la página
    const distance = targetPosition - startPosition; // Distancia total a recorrer
    const duration = 1000; // Duración de la animación (en milisegundos)
    let startTime = null;

    // Función de animación
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = currentTime - startTime;
        const run = easeInOutCubic(progress, startPosition, distance, duration);

        window.scrollTo(0, run);

        if (progress < duration) {
            requestAnimationFrame(animation); // Continuar la animación hasta completar la duración
        }
    }

    // Función de easing para suavizar el desplazamiento
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    // Iniciar la animación
    requestAnimationFrame(animation);
}

// Seleccionamos los enlaces del menú
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        const target = link.getAttribute('href').substring(1);
        smoothScroll(target);
    });
});