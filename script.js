const empezar = document.getElementById("empezar");
const inicio = document.getElementById("inicio");
const carta = document.getElementById("carta");
const musica = document.getElementById("musica");
const botonNo = document.getElementById("no");
const botonSi = document.getElementById("si");
const contador = document.getElementById("contador");

let nivelNo = 1;
let segundos = 0;
let intervaloLluvia; // control de lluvia principal

/* ABRIR */
empezar.onclick = () => {
    inicio.style.display = "none";
    carta.style.display = "block";

    musica.volume = 0.35;
    musica.play().catch(() => console.log("Audio bloqueado"));

    lluvia();
    contarTiempo();
};

/* BOTÓN SÍ */
botonSi.onclick = () => {

    // detener lluvia principal
    clearInterval(intervaloLluvia);

    // eliminar corazones que aún estén en pantalla
    document.querySelectorAll(".particula").forEach(c => c.remove());

    carta.innerHTML = `
        <h1>¡Sabía que dirías que sí! 💖✨</h1>
        <h2>Bajo este árbol comienza nuestra historia</h2>

        <div class="escena-imagen">
            <img src="hola.jpg" alt="Árbol romántico" class="arbol-img">
            <div class="lluvia-corazones"></div>
        </div>

        <div class="contador-amor" id="contadorAmor"></div>
    `;

    lluviaFinal();
    iniciarContadorAmor();
};

/* LLUVIA PRINCIPAL */
function lluvia() {
    intervaloLluvia = setInterval(() => {
        const corazon = document.createElement("div");
        corazon.innerHTML = "💖";
        corazon.classList.add("particula");
        corazon.style.left = Math.random() * window.innerWidth + "px";
        document.body.appendChild(corazon);
        setTimeout(() => corazon.remove(), 5000);
    }, 300);
}

/* LLUVIA FINAL (SOLO IMAGEN) */
function lluviaFinal(){
    const contenedor = document.querySelector(".lluvia-corazones");

    setInterval(() => {
        let corazon = document.createElement("div");
        corazon.className = "corazon-lluvia";
        corazon.innerHTML = "❤";

        corazon.style.left = Math.random() * 100 + "%";
        corazon.style.fontSize = (Math.random() * 15 + 15) + "px";
        corazon.style.animationDuration = (Math.random() * 2 + 3) + "s";

        contenedor.appendChild(corazon);

        setTimeout(() => {
            corazon.remove();
        }, 5000);

    }, 300);
}

/* CONTADOR ROMÁNTICO FINAL */
function iniciarContadorAmor() {

    const fechaInicio = new Date("2020-06-26T00:00:00");
    const cont = document.getElementById("contadorAmor");

    setInterval(() => {

        const ahora = new Date();
        const diferencia = ahora - fechaInicio;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        cont.innerHTML = `
            ❤️ Desde el 26 de junio de 2020 ❤️<br>
            ${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos
        `;

    }, 1000);
}

/* BOTÓN NO QUE HUYE */
botonNo.onmouseover = () => {
    nivelNo += 0.2;
    botonNo.style.transform = `scale(${1 - nivelNo/5})`;
    botonNo.style.position = "absolute";
    botonNo.style.left = Math.random() * (window.innerWidth - 100) + "px";
    botonNo.style.top = Math.random() * (window.innerHeight - 50) + "px";
};

/* CONTADOR PRIMERA PANTALLA */
function contarTiempo() {
    setInterval(() => {
        segundos++;
        contador.innerHTML = "He pensado en ti durante " + segundos + " segundos 💕";
    }, 1000);
}