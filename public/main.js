/* 
    Helados Clicker, es un juego incremental inspirado por el Cookie Clicker y otros juegos del estilo.
    Se inicio el desarrollo el 5 de septiembre del año 2021 (06/09/2021) por tres personas:
    # Cajita (Desarrollador Web) que escribio el codigo del juego.
    # Delsin (Diseñador Grafico) que se encargo del arte y los graficos del juego. 
    # Joche que hizo el progreso de los numeros de edificios y diferentes mejoras.
    En cuanto al Diseño general del juego los tres aportamos por igual.
*/

//Codigo para el burger del navbar
document.addEventListener('DOMContentLoaded', () => {

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {

      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

          const target = el.dataset.target;
          const $target = document.getElementById(target);

          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });


//Elementos del DOM
const cookieSpan = document.querySelector("#cookies");
const cookieButton = document.querySelector("#button-cookie");
const farmerSpan = document.querySelector("#farmer");
const farmerButton = document.querySelector("#buy-farmer");
const precioFarmSpan = document.querySelector("#precio-farm");
const farmerSpan2 = document.querySelector("#farmer2");
const farmerButton2 = document.querySelector("#buy-farmer2");
const precioFarmSpan2 = document.querySelector("#precio-farm2");
const farmerSpan3 = document.querySelector("#farmer3");
const farmerButton3 = document.querySelector("#buy-farmer3");
const precioFarmSpan3 = document.querySelector("#precio-farm3");
const farmerSpan4 = document.querySelector("#farmer4");
const farmerButton4 = document.querySelector("#buy-farmer4");
const precioFarmSpan4 = document.querySelector("#precio-farm4");
const cookiesPorSegundoSpan = document.querySelector("#cookies-por-segundo");


//Variables
let cookies = 0;
let farms = 0;
let farms2 = 0;
let farms3 = 0;
let farms4 = 0;
let cookiesPorSegundo = 0;
let precioFarms = 15;
let precioFarms2 = 100;
let precioFarms3 = 1200;
let precioFarms4 = 12000;


//Funcion para hacer potencias (un helper =D)
function potencia (base, exponente) {
    let resultado = base;
    for (let i = 1; i < exponente; i++) {
        resultado = resultado * base;
    }
    return resultado;
}

//El intervalo que actualiza los valores cada 100 milisegundos
setInterval( function() {
    cookies = cookies + (farms * 0.01);
    cookies = cookies + (farms2 * 0.05);
    cookies = cookies + (farms3 * 0.2);
    cookies = cookies + (farms4 * 0.5);
    updateScoreSpan();
}, 100);

//Botones

//Clicker de helado
cookieButton.addEventListener('click', (e) => {
    e.preventDefault();
    cookies++;
    updateScoreSpan();
})

//Botones de edificios
farmerButton.addEventListener('click', (e) => {
    e.preventDefault();
    comprarFarm1();
});

farmerButton2.addEventListener('click', (e) => {
    e.preventDefault();
    comprarFarm2();
});

farmerButton3.addEventListener('click', (e) => {
    e.preventDefault();
    comprarFarm3();
});


farmerButton4.addEventListener('click', (e) => {
    e.preventDefault();
    comprarFarm4();
});


// Funciones de compra de edificios
function comprarFarm1 () {
    if (precioFarms <= cookies) {
        cookiesPorSegundo += 0.1;
        farms++;
        cookies = cookies - precioFarms;
        precioFarms = Math.round(15 * (potencia(1.15, farms)));
        updateScoreSpan();
        updateScorePerSecond();
        updateFarms1();
    }
}

function comprarFarm2 () {
    if (precioFarms2 <= cookies) {
        cookiesPorSegundo += 0.5;
        farms2++;
        cookies = cookies - precioFarms2;
        precioFarms2 = Math.round(100 * (potencia(1.15, farms2)));
        updateFarms2();
        updateScoreSpan();
        updateScorePerSecond();
    }
}

function comprarFarm3 () {
    if (precioFarms3 <= cookies) {
        cookiesPorSegundo += 2;
        farms3++;
        cookies = cookies - precioFarms3;
        precioFarms3 = Math.round(1200 * (potencia(1.15, farms3)));
        updateFarms3();
        updateScoreSpan();
        updateScorePerSecond();
    }
}

function comprarFarm4 () {
    if (precioFarms4 <= cookies) {
        cookiesPorSegundo += 5;
        farms4++;
        cookies = cookies - precioFarms4;
        precioFarms4 = Math.round(12000 * (potencia(1.15, farms4)));
        updateFarms4();
        updateScoreSpan();
        updateScorePerSecond();
    }
}


//Updates de Spans y Edificios
function updateScorePerSecond() {
    cookiesPorSegundoSpan.innerText = cookiesPorSegundo.toFixed(2);
}

function updateScoreSpan () {
    let numeroFormateado = numberFormatter(cookies.toFixed(2));
    cookieSpan.innerHTML = numeroFormateado;
}

function updateFarms1 () {
    farmerSpan.innerText = farms;
    precioFarmSpan.innerText = precioFarms;
}

function updateFarms2 () {
    farmerSpan2.innerText = farms2;
    precioFarmSpan2.innerText = precioFarms2;
}

function updateFarms3 () {
    farmerSpan3.innerText = farms3;
    precioFarmSpan3.innerText = precioFarms3;
}

function updateFarms4 () {
    farmerSpan4.innerText = farms4;
    precioFarmSpan4.innerText = precioFarms4;
}


//Guardado y cargado de las cookies
function loadGame () {
    let savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.cookies !== "undefined") {
        cookies = savedGame.cookies;
    }
    if (typeof savedGame.farms !== "undefined") {
        farms = savedGame.farms;
    }
    if (typeof savedGame.farms2 !== "undefined") {
        farms2 = savedGame.farms2;
    }
    if (typeof savedGame.farms3 !== "undefined") {
        farms3 = savedGame.farms3;
    }
    if (typeof savedGame.farms4 !== "undefined") {
        farms4 = savedGame.farms4;
    }
    if (typeof savedGame.cookiesPorSegundo !== "undefined") {
        cookiesPorSegundo = savedGame.cookiesPorSegundo;
    }
    if (typeof savedGame.precioFarms !== "undefined") {
        precioFarms = savedGame.precioFarms;
    }
    if (typeof savedGame.precioFarms2 !== "undefined") {
        precioFarms2 = savedGame.precioFarms2;
    }
    if (typeof savedGame.precioFarms3 !== "undefined") {
        precioFarms3 = savedGame.precioFarms3;
    }
    if (typeof savedGame.precioFarms4 !== "undefined") {
        precioFarms4 = savedGame.precioFarms4;
    }

}

window.onload = function() {
    loadGame();
    updateScorePerSecond();
    updateScoreSpan();
    updateFarms1();
    updateFarms2();
    updateFarms3();
    updateFarms4();
}

function saveGame () {
    let gameSave = 
    {
        cookies: cookies,
        farms: farms,
        farms2: farms2,
        farms3: farms3,
        farms4: farms4,
        cookiesPorSegundo: cookiesPorSegundo,
        precioFarms: precioFarms,
        precioFarms2: precioFarms2, 
        precioFarms3: precioFarms3,
        precioFarms4: precioFarms4
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}


setInterval(function() {
    saveGame();
    console.log("Juego guardado!")
}, 45000); //Se guarda automaticamente cada 45 segundos.


//Formateo de numeros (proximamente se va a cambiar)
function numberFormatter(num) {
    let numeroFormateado;
    if (Math.abs(num) > 999949999999999) {
        numeroFormateado = Math.sign(num)*((Math.abs(num)/1000000000000000).toFixed(2)) + 'Q'
    }
    else if (Math.abs(num) > 999949999999) {
        numeroFormateado = Math.sign(num)*((Math.abs(num)/1000000000000).toFixed(2)) + 'T'
    }
    else if (Math.abs(num) > 999949999) {
        numeroFormateado = Math.sign(num)*((Math.abs(num)/1000000000).toFixed(2)) + 'B'
    }
    else if (Math.abs(num) > 999949) {
        numeroFormateado = Math.sign(num)*((Math.abs(num)/1000000).toFixed(2)) + 'M'
    }
    else if (Math.abs(num) > 999) {
       numeroFormateado = Math.sign(num)*((Math.abs(num)/1000).toFixed(2)) + 'K'
    }
    else {
        numeroFormateado = Math.sign(num)*Math.abs(num).toFixed(1);
    }
    return numeroFormateado; 
}


