function showSection(sectionId) {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('juego').classList.add('hidden');
    document.getElementById('historial').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

let secuencia = [];
let secuenciaUsuario = [];
let nivel = 0;
let puntaje = 0;
let sonidos = {
    verde: new Audio('sonidos/verde.mp3'),
    rojo: new Audio('sonidos/rojo.mp3'),
    amarillo: new Audio('sonidos/amarillo.mp3'),
    azul: new Audio('sonidos/azul.mp3')
}

function empezarJuego() {
    secuencia = [];
    secuenciaUsuario = [];
    nivel = 0;
    puntaje = 0;
    actualizarRonda(nivel);
    actualizarPuntaje(puntaje);
    siguienteNivel();
}

function actualizarRonda(nivel) {
    document.getElementById('rondaTexto').textContent = `Ronda: ${nivel}`;
}

function siguienteNivel() {
    nivel++;
    actualizarRonda(nivel);
    secuenciaUsuario = [];
    let nuevoColor = obtenerColorAleatorio();
    secuencia.push(nuevoColor);
    reproducirSecuencia();
}

function obtenerColorAleatorio() {
    const colores = ['verde', 'rojo', 'amarillo', 'azul'];
    let color = colores[Math.floor(Math.random() * 4)];
    console.log('devuelvo 1 color ' + color); 
    return color 
}

function reproducirSecuencia() {
    let retraso = 0.2;
    secuencia.forEach((color, index) => {
        setTimeout(() =>{
            activarBoton(color);
            sonidos[color].play();
        }, retraso);
        retraso += 600;
    });
}    

function activarBoton(color) {
    const boton = document.querySelector(`.boton${capitalize(color)}`);
    boton.classList.add('activo');
    setTimeout(() => {
        boton.classList.remove('activo'); 
    } , 300);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function manejarEntradaUsuario(color) {
    secuenciaUsuario.push(color);
    sonidos[color].play();
    if(!compararSecuencia()) {
        perder();
        return;
    }
    if (secuenciaUsuario.length === secuencia.length) {
        puntaje++
        actualizarPuntaje(puntaje);
        setTimeout(siguienteNivel, 1000);
    }
}

function compararSecuencia() {
    for (let i = 0; i < secuenciaUsuario.length; i++) {
        if (secuenciaUsuario[i] !== secuencia[i]) {
            return false;
        }
    }
    return true;
}

function perder() {
    const nombreUsuario = localStorage.getItem('Nombre del jugador') || "Jugador desconocido";
    alert(`Perdiste! Llegaste al nivel: ${nivel} y tu puntaje fue: ${puntaje} puntos`);
    localStorage.setItem(`Puntaje de ${nombreUsuario}`, puntaje);
    puntaje = 0; 
    nivel = 0;
    actualizarRonda(nivel);
    actualizarPuntaje(puntaje);
    mostrarMejoresPuntaje();
    document.querySelector('.ronda').textContent = 'Ronda: 0';
}


function actualizarPuntaje(puntaje) {
    document.getElementById('puntaje').innerText = puntaje;
}

document.addEventListener('DOMContentLoaded', () => {
document.querySelector('.botonEmpezar').addEventListener('click', empezarJuego);
document.getElementById('botonJugar').addEventListener('click', mostrarMejoresPuntaje);
document.querySelector('.botonVerde').addEventListener('click', () => manejarEntradaUsuario('verde'));
document.querySelector('.botonRojo').addEventListener('click', () => manejarEntradaUsuario('rojo'));
document.querySelector('.botonAmarillo').addEventListener('click', () => manejarEntradaUsuario('amarillo'));
document.querySelector('.botonAzul').addEventListener('click', () => manejarEntradaUsuario('azul'));
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.aceptarNombre').addEventListener('click', obtenerNombreUsuario);
});

function obtenerNombreUsuario() {
    const nombreUsuario = document.querySelector('.nombreUsuario').value;
    localStorage.setItem('Nombre del jugador', nombreUsuario)
    
    console.log(localStorage.getItem('Nombre del jugador'));

    const confirmacion = document.getElementById('confirmacionNombre');
    confirmacion.textContent = 'Nombre guardado exitosamente'
    confirmacion.classList.remove('confirmacion-error');
    confirmacion.classList.add('confirmacion-exito');
    confirmacion.style.display = 'block' ;

    if (nombreUsuario === '') {
        confirmacion.textContent = 'Por favor, ingresa un nombre'
        confirmacion.classList.remove('confirmacion-exito');
        confirmacion.classList.add('confirmacion-error');
        confirmacion.style.display = 'block';

        setTimeout(() => {
            confirmacion.style.display = 'none';
        }, 2000);
        return;
    }

    setTimeout(() => {
        confirmacion.style.display = 'none';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button[onclick="showSection(\'historial\')"]').addEventListener('click', mostrarHistorial);
});

function mostrarHistorial() {
    let mensaje = "";
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if (clave.includes('Puntaje de')) {
            mensaje += `${clave.replace("Puntje de ", "")}: ${localStorage.getItem(clave)} puntos \n`;
        }
    }
    document.getElementById('historialPuntajes').textContent = mensaje || "No hay puntajes guardados";
}

function mostrarMejoresPuntaje() {
    let mejorPuntaje = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if (clave.includes('Puntaje de')) {
            let puntaje = parseInt(localStorage.getItem(clave));
            if (puntaje > mejorPuntaje) {
                mejorPuntaje = puntaje;
            }
        }
    }
    document.getElementById('mejorPuntaje').textContent = `Mejor Puntaje: ${mejorPuntaje}`;
}