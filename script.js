function showSection(sectionId) {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('juego').classList.add('hidden');
    document.getElementById('historial').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

let secuencia = [];
let secuenciaUsuario = [];
let nivel = 0;
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
    return colores[Math.floor(Math.random() * 4)];
}

function reproducirSecuencia() {
    let retraso = 0;
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
        setTimeout(siguienteNivel, 1000);
    }
}


