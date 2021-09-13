/* 
    Helados Clicker, es un juego incremental inspirado por "Cookie Clicker" entre otros juegos incrementales del estilo.
    Se inicio el desarrollo el 6 de septiembre del año 2021 (06/09/2021) por tres personas:
    # Cajita (Desarrollador Web) escribio el codigo de la web y el juego.
    # Delsin (Diseñador Grafico) se encargo del arte y los graficos del juego. 
    # Joche (Diseño UI/UX) diseño la interfaz de usuario y los numeros incrementales.
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


const salt = "helado";

let x = new Decimal('0');
let y = new Decimal('100')
x = x.plus(y)
numberformat.formatShort(x, {backend: 'decimal.js', format: 'standard', sigfigs: 2})
console.log(`${numberformat.formatShort(x, {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`);

//Elementos del DOM
const notificacionGuardado = document.querySelector("#notificacion-guardado");
const notificacionCompra = document.querySelector("#notificacion-compra");
const exportButton = document.querySelector("#button-exportar");
const importButton = document.querySelector("#button-importar");
const resetButton = document.querySelector("#button-reset")
const heladoSpan = document.querySelector("#cookies");
const heladoButton = document.querySelector("#button-cookie");
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
const farmerSpan5 = document.querySelector("#farmer5");
const farmerButton5 = document.querySelector("#buy-farmer5");
const precioFarmSpan5 = document.querySelector("#precio-farm5");
const farmerSpan6 = document.querySelector("#farmer6");
const farmerButton6 = document.querySelector("#buy-farmer6");
const precioFarmSpan6 = document.querySelector("#precio-farm6");
const farmerSpan7 = document.querySelector("#farmer7");
const farmerButton7 = document.querySelector("#buy-farmer7");
const precioFarmSpan7 = document.querySelector("#precio-farm7");
const farmerSpan8 = document.querySelector("#farmer8");
const farmerButton8 = document.querySelector("#buy-farmer8");
const precioFarmSpan8 = document.querySelector("#precio-farm8");
const farmerSpan9 = document.querySelector("#farmer9");
const farmerButton9 = document.querySelector("#buy-farmer9");
const precioFarmSpan9 = document.querySelector("#precio-farm9");
const farmerSpan10 = document.querySelector("#farmer10");
const farmerButton10 = document.querySelector("#buy-farmer10");
const precioFarmSpan10 = document.querySelector("#precio-farm10");
const farmerSpan11 = document.querySelector("#farmer11");
const farmerButton11 = document.querySelector("#buy-farmer11");
const precioFarmSpan11 = document.querySelector("#precio-farm11");
const farmerSpan12 = document.querySelector("#farmer12");
const farmerButton12 = document.querySelector("#buy-farmer12");
const precioFarmSpan12 = document.querySelector("#precio-farm12");
const farmerSpan13 = document.querySelector("#farmer13");
const farmerButton13 = document.querySelector("#buy-farmer13");
const precioFarmSpan13 = document.querySelector("#precio-farm13");
const farmerSpan14 = document.querySelector("#farmer14");
const farmerButton14 = document.querySelector("#buy-farmer14");
const precioFarmSpan14 = document.querySelector("#precio-farm14");
const farmerSpan15 = document.querySelector("#farmer15");
const farmerButton15 = document.querySelector("#buy-farmer15");
const precioFarmSpan15 = document.querySelector("#precio-farm15");
const heladosPorSegundoSpan = document.querySelector("#cookies-por-segundo");
const contenedorMejoras = document.querySelector("#contenedor-mejoras");
let botonesMejoras = contenedorMejoras.querySelectorAll("div");

const popDiv = document.querySelector("#pops")

// PROBANDO AUDIO 
let contadorAudio = 0;
let audio = [];

for (let i = 0; i <= 20; i++) {
    audio[i] = new Audio('./sounds/pop3.mp3');
}

function audioClickHelado () {
    if (contadorAudio < 20) {
        audio[contadorAudio].volume = 0.1;
        audio[contadorAudio].play();
        contadorAudio++;
    }
    else {
        audio[contadorAudio].volume = 0.1;
        audio[contadorAudio].play();
        contadorAudio = 0;
    }
}
// PROBANDO AUDIO

//Objeto game que trackea las variables principales y algunas funciones
let game = 
{
    helados: new Decimal(0),
    totalDeHelados: new Decimal('0'),
    heladosClickeados: new Decimal('0'),
    clickValue: new Decimal('1'),
    version: 0.1,
    addToScore: function(cantidad) {
        this.helados = this.helados.plus(cantidad);
        this.totalDeHelados = this.totalDeHelados.plus(cantidad);
        display.updateScore();
    },
    getHeladosPorSegundo: function() {
        let heladosPorSegundo = new Decimal('0');
        for (let i = 0; i < edificios.nombre.length; i++) {
            heladosPorSegundo = heladosPorSegundo.plus(edificios.ingresos[i].times(edificios.cantidad[i]));
        }
        if (heladosPorSegundo.greaterThanOrEqualTo('1000')) {
            return numberformat.formatShort(heladosPorSegundo, {backend: 'decimal.js', format: 'standard', sigfigs: 4});
        }
        else {
            return heladosPorSegundo.toFixed(2);
        }
        
    },
    getHeladosCada100ms: function() {
        let heladosCada100ms = new Decimal('0');
        for (let i = 0; i < edificios.nombre.length; i++) {
            heladosCada100ms = heladosCada100ms.plus(edificios.ingresos[i].times(edificios.cantidad[i].dividedBy(10)));
        }
        return heladosCada100ms;
    }
}

//Objeto edificios que trackea los edificios del juego
let edificios = 
{
    nombre:
    [
        "Cucharas",
        "Heladeros",
        "Carritos",
        "Camiones",
        "Heladerias",
        "Granjas",
        "Fabricas",
        "Iglesias",
        "Bancos",
        "Alquimia",
        "Aliens",
        "Planetas",
        "Portales",
        "Monstruos",
        "Dioses"
    ],
    cantidad: 
    [
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0'),
        new Decimal('0')
    ],
    ingresos: 
    [
        new Decimal('0.1'),
        new Decimal('0.5'),
        new Decimal('4'),
        new Decimal('10'),
        new Decimal('40'),
        new Decimal('100'),
        new Decimal('400'),
        new Decimal('6000'),
        new Decimal('90000'),
        new Decimal('900000'),
        new Decimal('10000000'),
        new Decimal('100000000'),
        new Decimal('1000000000'),
        new Decimal('10000000000'),
        new Decimal('100000000000')
    ],
    precio: 
    [
        new Decimal('15'),
        new Decimal('100'),
        new Decimal('500'),
        new Decimal('3000'),
        new Decimal('10000'),
        new Decimal('40000'),
        new Decimal('200000'),
        new Decimal('1600000'),
        new Decimal('100000000'),
        new Decimal('4000000000'),
        new Decimal('75000000000'),
        new Decimal('1500000000000'),
        new Decimal('30000000000000'),
        new Decimal('550000000000000'),
        new Decimal('1500000000000000')
    ],
    comprar: function(index) {
        if (game.helados.greaterThanOrEqualTo(this.precio[index])) {
            game.helados = game.helados.minus(this.precio[index]);
            this.cantidad[index] = this.cantidad[index].plus('1');
            this.precio[index] = this.precio[index].times('1.15');
            display.updateScore();
        }
        else {
            notificacionCompra.classList.add("visible-notificacion-compra");
            notificacionCompra.classList.remove("hidden-notificacion");

            function esconderNotificacion() {
                notificacionCompra.classList.add("hidden-notificacion");
                notificacionCompra.classList.remove("visible-notificacion-compra");
            }
            setTimeout(esconderNotificacion, 2500);
        }
    }
}

let mejoras = 
{
    nombre: 
    [
        "Click Poderoso",
        "Cucharas Mutantes",
        "Click Poderoso",
        "Click Poderoso",
        "Cucharas Mutantes"
    ],
    descripcion: 
    [
        "El click es el doble de potente!",
        "Tus cucharas producen el doble!",
        "El click es el doble de potente!",
        "El click es el doble de potente!",
        "Tus cucharas producen el doble!"
    ],
    image: 
    [
        "./images/cuchara.png",
        "./images/puesto-de-helados-nuevo.png",
        "./images/cuchara.png",
        "./images/cuchara.png",
        "./images/puesto-de-helados-nuevo.png"
    ],
    type:
    [
        "click",
        "edificio",
        "click",
        "click",
        "edificio"
    ],
    precio: 
    [
        new Decimal('100'),
        new Decimal('300'),
        new Decimal('750'),
        new Decimal('2500'),
        new Decimal('3000')
    ],
    edificioIndex:
    [
        -1,
        0,
        -1,
        -1,
        0
    ],
    requisitos:
    [
        new Decimal('100'),
        new Decimal('10'),
        new Decimal('300'),
        new Decimal('700'),
        new Decimal('25')
    ],
    bonus:
    [
        new Decimal('2'),
        new Decimal('2'),
        new Decimal('2'),
        new Decimal('2'),
        new Decimal('2')
    ],
    comprado: 
    [
        false,
        false,
        false,
        false,
        false
    ],
    comprar: function(index) {
        if (!this.comprado[index] && game.helados.greaterThanOrEqualTo(this.precio[index])) {
            if(this.type[index] == "edificio" && edificios.cantidad[this.edificioIndex[index]].greaterThanOrEqualTo(this.requisitos[index])) {
                game.helados = game.helados.minus(this.precio[index]);
                edificios.ingresos[this.edificioIndex[index]] = edificios.ingresos[this.edificioIndex[index]].times(this.bonus[index]);
                this.comprado[index] = true;

                display.updateScore();
                display.updateMejoras();
            }
            else if (this.type[index] == "click" && game.heladosClickeados.greaterThanOrEqualTo(this.requisitos[index])) {
                game.helados = game.helados.minus(this.precio[index]);
                game.clickValue = game.clickValue.times(this.bonus[index]);
                this.comprado[index] = true;

                display.updateScore();
                display.updateMejoras();
            }
        }
        else {
            notificacionCompra.classList.add("visible-notificacion-compra");
            notificacionCompra.classList.remove("hidden-notificacion");

            function esconderNotificacion() {
                notificacionCompra.classList.add("hidden-notificacion");
                notificacionCompra.classList.remove("visible-notificacion-compra");
            }
            setTimeout(esconderNotificacion, 3000);
        }
    }
}

//Objeto display que tiene funciones para actualizar los Spans en el DOM
let display = 
{
    updateScore: function() {
        let numeroFormateado = "";
        if (game.helados.greaterThanOrEqualTo('1000')) {
            numeroFormateado = `${numberformat.formatShort(game.helados, {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        }
        else {
            numeroFormateado = game.helados.toFixed(1);
        }
        heladoSpan.innerText = numeroFormateado;
        heladosPorSegundoSpan.innerText = game.getHeladosPorSegundo();
        document.title = `${numeroFormateado} Helados!`
    },
    updateSpans: function() {
        farmerSpan.innerText = `${numberformat.formatShort(edificios.cantidad[0], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan.innerText = `${numberformat.formatShort(edificios.precio[0], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan2.innerText = `${numberformat.formatShort(edificios.cantidad[1], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan2.innerText = `${numberformat.formatShort(edificios.precio[1], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan3.innerText = `${numberformat.formatShort(edificios.cantidad[2], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan3.innerText = `${numberformat.formatShort(edificios.precio[2], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan4.innerText = `${numberformat.formatShort(edificios.cantidad[3], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan4.innerText = `${numberformat.formatShort(edificios.precio[3], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan5.innerText = `${numberformat.formatShort(edificios.cantidad[4], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan5.innerText = `${numberformat.formatShort(edificios.precio[4], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan6.innerText = `${numberformat.formatShort(edificios.cantidad[5], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan6.innerText = `${numberformat.formatShort(edificios.precio[5], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan7.innerText = `${numberformat.formatShort(edificios.cantidad[6], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan7.innerText = `${numberformat.formatShort(edificios.precio[6], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan8.innerText = `${numberformat.formatShort(edificios.cantidad[7], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan8.innerText = `${numberformat.formatShort(edificios.precio[7], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan9.innerText = `${numberformat.formatShort(edificios.cantidad[8], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan9.innerText = `${numberformat.formatShort(edificios.precio[8], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan10.innerText = `${numberformat.formatShort(edificios.cantidad[9], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan10.innerText = `${numberformat.formatShort(edificios.precio[9], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan11.innerText = `${numberformat.formatShort(edificios.cantidad[10], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan11.innerText = `${numberformat.formatShort(edificios.precio[10], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan12.innerText = `${numberformat.formatShort(edificios.cantidad[11], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan12.innerText = `${numberformat.formatShort(edificios.precio[11], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan13.innerText = `${numberformat.formatShort(edificios.cantidad[12], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan13.innerText = `${numberformat.formatShort(edificios.precio[12], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan14.innerText = `${numberformat.formatShort(edificios.cantidad[13], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan14.innerText = `${numberformat.formatShort(edificios.precio[13], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        farmerSpan15.innerText = `${numberformat.formatShort(edificios.cantidad[14], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
        precioFarmSpan15.innerText = `${numberformat.formatShort(edificios.precio[14], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`;
    },
    updateMejoras: function() {
        for (let i = 0; i < botonesMejoras.length; i++){
            if (!mejoras.comprado[i]) {
                if (mejoras.type[i] == "edificio" && edificios.cantidad[mejoras.edificioIndex[i]].greaterThanOrEqualTo(mejoras.requisitos[i])) {
                    botonesMejoras[i].classList.remove("hidden");
                    botonesMejoras[i].classList.add("visible");
                }
                else if (mejoras.type[i] == "click" && game.heladosClickeados.greaterThanOrEqualTo(mejoras.requisitos[i])) {
                    botonesMejoras[i].classList.remove("hidden");
                    botonesMejoras[i].classList.add("visible");
                }
            }
            else {
                botonesMejoras[i].classList.remove("visible");
                botonesMejoras[i].classList.add("hidden");
            }
        }
    }
}

//Botones
//Boton del helado-clicker
heladoButton.addEventListener('click', (e) => {
    e.preventDefault();
    game.addToScore(game.clickValue);
    game.heladosClickeados = game.heladosClickeados.plus('1');
    let position = heladoButton.getBoundingClientRect();
    let numRandomX = Math.random() * 80;
    let numRandomY = Math.random() * 40;
    let x = position.x - 40 + (numRandomX - 40)
    let y = position.y + 70 + (numRandomY - 20)
    let element = `<div class="pops"><div class="pop" style="position:absolute;left:${x}px;top:${y}px;">+${numberformat.formatShort(game.clickValue, {backend: 'decimal.js', format: 'standard', sigfigs: 2})}</div></div>`
    let nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = element;
    popDiv.appendChild(nuevoElemento)
    setTimeout(function() {
        popDiv.removeChild(popDiv.firstChild);
    }, 1200)
    audioClickHelado(contadorAudio);
});

//Botones de edificios
farmerButton.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(0);
    display.updateSpans();
});

farmerButton2.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(1);
    display.updateSpans();
});

farmerButton3.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(2);
    display.updateSpans();
});

farmerButton4.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(3);
    display.updateSpans();
});

farmerButton5.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(4);
    display.updateSpans();
});

farmerButton6.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(5);
    display.updateSpans();
});

farmerButton7.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(6);
    display.updateSpans();
});

farmerButton8.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(7);
    display.updateSpans();
});

farmerButton9.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(8);
    display.updateSpans();
});

farmerButton10.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(9);
    display.updateSpans();
});

farmerButton11.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(10);
    display.updateSpans();
});

farmerButton12.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(11);
    display.updateSpans();
});

farmerButton13.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(12);
    display.updateSpans();
});

farmerButton14.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(13);
    display.updateSpans();
});

farmerButton15.addEventListener('click', (e) => {
    e.preventDefault();
    edificios.comprar(14);
    display.updateSpans();
});

//Botones de mejoras

botonesMejoras[0].addEventListener('click', (e) => {
    e.preventDefault();
    mejoras.comprar(0);
    display.updateMejoras();
});

botonesMejoras[1].addEventListener('click', (e) => {
    e.preventDefault();
    mejoras.comprar(1);
    display.updateMejoras();
});

botonesMejoras[2].addEventListener('click', (e) => {
    e.preventDefault();
    mejoras.comprar(2);
    display.updateMejoras();
})

botonesMejoras[3].addEventListener('click', (e) => {
    e.preventDefault();
    mejoras.comprar(3);
    display.updateMejoras();
})

botonesMejoras[4].addEventListener('click', (e) => {
    e.preventDefault();
    mejoras.comprar(4);
    display.updateMejoras();
})

resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetGame();
})

exportButton.addEventListener('click', (e) => {
    e.preventDefault();
    exportSaveFile();
});

importButton.addEventListener('click', (e) => {
    importSaveFile();
})


function saveGame() {
    let gameSave = {
        helados: game.helados,
        totalDeHelados: game.totalDeHelados,
        heladosClickeados: game.heladosClickeados,
        clickValue: game.clickValue,
        version: game.version,
        edificiosCantidad: edificios.cantidad,
        edificiosIngresos: edificios.ingresos,
        edificiosPrecio: edificios.precio,
        mejorasComprado: mejoras.comprado
    }
    localStorage.setItem("gamesave", JSON.stringify(gameSave));
    notificacionGuardado.classList.add("visible-notificacion-guardado");
    notificacionGuardado.classList.remove("hidden-notificacion");

    function esconderNotificacion() {
        notificacionGuardado.classList.add("hidden-notificacion");
        notificacionGuardado.classList.remove("visible-notificacion-guardado");
    }
    setTimeout(esconderNotificacion, 3000);
}

function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem("gamesave"));
    if (localStorage.getItem("gamesave") !== null) {
        if (typeof savedGame.helados !== "undefined") {
            game.helados = new Decimal(savedGame.helados);
        }
        if (typeof savedGame.totalDeHelados !== "undefined") {
            game.totalDeHelados = new Decimal(savedGame.totalDeHelados);
        }
        if (typeof savedGame.heladosClickeados !== "undefined") {
            game.heladosClickeados = new Decimal(savedGame.heladosClickeados);
        }
        if (typeof savedGame.clickValue !== "undefined") {
            game.clickValue = new Decimal(savedGame.clickValue);
        }
        if (typeof savedGame.version !== "undefined") {
            game.version = savedGame.version;
        }
        if (typeof savedGame.edificiosCantidad !== "undefined") {
            for (let i = 0; i < savedGame.edificiosCantidad.length; i++) {
                edificios.cantidad[i] = new Decimal(savedGame.edificiosCantidad[i]);
            }
        }
        if (typeof savedGame.edificiosIngresos !== "undefined") {
            for (let i = 0; i < savedGame.edificiosIngresos.length; i++) {
                edificios.ingresos[i] = new Decimal(savedGame.edificiosIngresos[i]);
            }
        }
        if (typeof savedGame.edificiosPrecio !== "undefined") {
            for (let i = 0; i < savedGame.edificiosPrecio.length; i++) {
                edificios.precio[i] = new Decimal(savedGame.edificiosPrecio[i]);
            }
        }
        if (typeof savedGame.mejorasComprado !== "undefined") {
            for (let i = 0; i < savedGame.mejorasComprado.length; i++) {
                mejoras.comprado[i] = savedGame.mejorasComprado[i];
            }
        }
        display.updateSpans();
        display.updateScore();
        display.updateMejoras();
    }
}

function exportSaveFile() {
    let savedGame = localStorage.getItem("gamesave");
    let partidaGuardada = `${savedGame}`;
    let archivoEncriptado = encriptar(partidaGuardada);
    prompt("Copia este texto y pegalo en un lugar seguro! Es tu partida guardada =)", archivoEncriptado);

}

function importSaveFile() {
    let archivoEncriptado = prompt("Pega tu archivo guardado anterior aqui =)")
    let archivoDesencriptado = desencriptar(archivoEncriptado);
    localStorage.setItem("gamesave", archivoDesencriptado.toString(CryptoJS.enc.Utf8));
    location.reload();
}

setInterval(function() {
    game.helados = game.helados.plus(game.getHeladosCada100ms());
    game.totalDeHelados = game.totalDeHelados.plus(game.getHeladosCada100ms());
    display.updateScore();
    display.updateMejoras();
}, 100);

function resetGame() {
    if (confirm("Estas seguro que quieres reiniciar tu partida? esto eliminara todo tu progreso.")) {
        let gameSave = {};
        localStorage.setItem("gamesave", JSON.stringify(gameSave));
        location.reload();
    }
}

window.onload = function() {
    loadGame();
    display.updateSpans();
    display.updateScore();
    display.updateMejoras();
}

setInterval(function() {
    saveGame();
}, 60000); //Se guarda cada 60 segundos.

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key == 83) {
        event.preventDefault();
      } else if (event.ctrlKey && event.keyIdentifier == 83) {
        event.preventDefault();
      } else if (event.ctrlKey && event.keyCode == 83) {
        event.preventDefault();
        saveGame();
      }
}, false);

function encriptar (partidaGuardada) {
    let archivoEncriptado = CryptoJS.AES.encrypt(partidaGuardada, salt);
    return archivoEncriptado;
}

function desencriptar (partidaEncriptada) {
    let archivoDesencriptado = CryptoJS.AES.decrypt(partidaEncriptada, salt);
    return archivoDesencriptado;
}