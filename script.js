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