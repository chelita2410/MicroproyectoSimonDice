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
    actualizarPuntaje(puntaje);
    siguienteNivel();
}

function siguienteNivel() {
    nivel++;
    document.getElementById('rondaTexto').textContent = `Ronda: ${nivel}`;
    secuenciaUsuario = [];
    let nuevoColor = obtenerColorAleatorio();
    secuencia.push(nuevoColor);
    reproducirSecuencia();
}

function obtenerColorAleatorio() {
    const colores = ['verde', 'rojo', 'amarillo', 'azul'];
    let color = colores[Math.floor(Math.random() * 4)];
    console.log('devuelvo 1 color ' + color); /* Esto es una prueba para ver qué me devuelve */
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
    alert(`Perdiste! Llegaste al nivel: ${nivel} y tu puntaje fue: ${puntaje} puntos`);
    puntaje = 0; 
    actualizarPuntaje(puntaje);
    document.querySelector('.ronda').textContent = 'Ronda: 0';
}


function actualizarPuntaje(puntaje) {
    document.getElementById('puntaje').innerText = puntaje;
}

document.addEventListener('DOMContentLoaded', () => {
document.querySelector('.botonEmpezar').addEventListener('click', empezarJuego);
document.querySelector('.botonVerde').addEventListener('click', () => manejarEntradaUsuario('verde'));
document.querySelector('.botonRojo').addEventListener('click', () => manejarEntradaUsuario('rojo'));
document.querySelector('.botonAmarillo').addEventListener('click', () => manejarEntradaUsuario('amarillo'));
document.querySelector('.botonAzul').addEventListener('click', () => manejarEntradaUsuario('azul'));
});

