/* 
    Helados Clicker, es un juego incremental inspirado por "Cookie Clicker" entre otros juegos incrementales del estilo.
    Se inicio el desarrollo el 6 de septiembre del año 2021 (06/09/2021) por tres personas:
    # Cajita (Desarrollador Web) escribio el codigo de la web y el juego.
    # Delsin (Diseñador Grafico) se encargo del arte y los graficos del juego. 
    # Joche (Diseño UI/UX) diseño la interfaz de usuario y los numeros incrementales.
    En cuanto al Diseño general del juego los tres aportamos por igual.
*/

// Salt para partidas guardadas
const salt = "helado";

//Elementos del DOM
const botonComprarPor1 = document.querySelector("#boton-comprar-por1");
const botonComprarPor10 = document.querySelector("#boton-comprar-por10");
const botonComprarPor100 = document.querySelector("#boton-comprar-por100");
const notificacionGuardado = document.querySelector("#notificacion-guardado");
const notificacionCompra = document.querySelector("#notificacion-compra");
const exportButton = document.querySelector("#button-exportar");
const importButton = document.querySelector("#button-importar");
const resetButton = document.querySelector("#button-reset");
const heladoSpan = document.querySelector("#cookies");
const heladoButton = document.querySelector("#button-cookie");
const heladosPorSegundoSpan = document.querySelector("#cookies-por-segundo");
const contenedorMejoras = document.querySelector("#contenedor-mejoras");
const buttonEstadisticas = document.querySelector("#button-estadisticas");
const popDiv = document.querySelector("#pops");
const precioEdificiosSpans = document.querySelectorAll(
  ".selector-precio-edificio"
);
const cantidadEdificiosSpans = document.querySelectorAll(
  ".selector-cantidad-edificio"
);
const botonesEdificios = document.querySelectorAll(".selector-boton-edificio");
let botonesMejoras = contenedorMejoras.querySelectorAll("div");

// PROBANDO AUDIO
let contadorAudio = 0;
let audio = [];

for (let i = 0; i <= 20; i++) {
  audio[i] = new Audio("./sounds/pop3.mp3");
}

function audioClickHelado() {
  if (contadorAudio < 20) {
    audio[contadorAudio].volume = 0.1;
    audio[contadorAudio].play();
    contadorAudio++;
  } else {
    audio[contadorAudio].volume = 0.1;
    audio[contadorAudio].play();
    contadorAudio = 0;
  }
}
// PROBANDO AUDIO

//Objeto game que trackea las variables principales y algunas funciones
let game = {
  helados: new Decimal(0),
  totalDeHelados: new Decimal("0"),
  heladosClickeados: new Decimal("0"),
  clickValue: new Decimal("1"),
  version: 0.1,
  comprarPorCantidad: 0, //Comprar por cantidad, 0 = comprar x1, 1 = comprar x10 y 2 = comprar x100
  addToScore: function (cantidad) {
    if (mejoras.comprado[8]) {
      this.actualizarClickValue();
    }

    this.helados = this.helados.plus(cantidad);
    this.totalDeHelados = this.totalDeHelados.plus(cantidad);
    display.updateScore();
  },
  getHeladosPorSegundo: function () {
    let heladosPorSegundo = new Decimal("0");
    for (let i = 0; i < edificios.edificiosData.length; i++) {
      heladosPorSegundo = heladosPorSegundo.plus(
        edificios.edificiosData[i].ingresos.times(
          edificios.edificiosData[i].cantidad
        )
      );
    }
    if (heladosPorSegundo.greaterThanOrEqualTo("1000")) {
      return numberformat.formatShort(heladosPorSegundo, {
        backend: "decimal.js",
        format: "standard",
        sigfigs: 4,
      });
    } else {
      return heladosPorSegundo.toFixed(2);
    }
  },
  getHeladosCada100ms: function () {
    let heladosCada100ms = new Decimal("0");
    for (let i = 0; i < edificios.edificiosData.length; i++) {
      heladosCada100ms = heladosCada100ms.plus(
        edificios.edificiosData[i].ingresos.times(
          edificios.edificiosData[i].cantidad.dividedBy(10)
        )
      );
    }
    return heladosCada100ms;
  },
  actualizarClickValue: function () {
    let clickValueActualizado = new Decimal("1");
    for (let i = 0; i < 8; i++) {
      if (mejoras.comprado[i]) {
        clickValueActualizado = clickValueActualizado.times("2");
      }
    }
    clickValueActualizado = clickValueActualizado.plus(
      this.getHeladosCada100ms().dividedBy("10")
    );
    this.clickValue = clickValueActualizado;
  },
};

//Objeto edificios que trackea los edificios del juego
let edificios = {
  edificiosData: [
    {
      nombre: "Cucharas",
      descripcion: "Compra cucharas para hacer helado!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("0.1"),
      precio: new Decimal("15"),
      color: "rgb(255, 70, 70)",
    },
    {
      nombre: "Heladeros",
      descripcion: "Contrata heladeros!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("0.5"),
      precio: new Decimal("100"),
      color: "rgb(70, 255, 70)",
    },
    {
      nombre: "Carritos",
      descripcion: "Compra carritos para vender helados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("4"),
      precio: new Decimal("500"),
      color: "rgb(70, 70, 255)",
    },
    {
      nombre: "Camiones",
      descripcion: "Compra camiones para vender helados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("10"),
      precio: new Decimal("3000"),
      color: "rgb(255, 70, 255)",
    },
    {
      nombre: "Heladerias",
      descripcion: "Abre tus propias heladerias!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("40"),
      precio: new Decimal("10000"),
      color: "rgb(70, 255, 255)",
    },
    {
      nombre: "Granjas",
      descripcion: "Crea tu propia granja de helados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("100"),
      precio: new Decimal("40000"),
      color: "rgb(255, 255, 70)",
    },
    {
      nombre: "Fabricas",
      descripcion: "Produce helados industrializados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("400"),
      precio: new Decimal("200000"),
      color: "rgb(255, 160, 0)",
    },
    {
      nombre: "Iglesias",
      descripcion: "Aprovecha el Boom de la religion!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("6000"),
      precio: new Decimal("1600000"),
      color: "rgb(255, 0, 160)",
    },
    {
      nombre: "Bancos",
      descripcion: "Otorga prestamos de helados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("90000"),
      precio: new Decimal("100000000"),
      color: "rgb(0, 160, 255)",
    },
    {
      nombre: "Alquimia",
      descripcion: "Crea helados con la piedra filosofal",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("900000"),
      precio: new Decimal("4000000000"),
      color: "rgb(0, 255, 160)",
    },
    {
      nombre: "Aliens",
      descripcion: "Contrata Aliens expertos en helados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("10000000"),
      precio: new Decimal("75000000000"),
      color: "rgb(160, 0, 255)",
    },
    {
      nombre: "Planetas",
      descripcion: "Establece bases en los planetas de helado!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("100000000"),
      precio: new Decimal("1500000000000"),
      color: "rgb(160, 255, 0)",
    },
    {
      nombre: "Portales",
      descripcion: "Portales hacia la dimension de los helados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("1000000000"),
      precio: new Decimal("30000000000000"),
      color: "rgb(255, 160, 160)",
    },
    {
      nombre: "Monstruos",
      descripcion: "Monstruos de la dimension de los helados!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("10000000000"),
      precio: new Decimal("550000000000000"),
      color: "rgb(160, 255, 160)",
    },
    {
      nombre: "Dioses",
      descripcion: "Los creadores de todo, usalos a tu favor!",
      cantidad: new Decimal("0"),
      ingresos: new Decimal("100000000000"),
      precio: new Decimal("1500000000000000"),
      color: "rgb(160, 160, 255)",
    },
  ],
  comprar: function (index) {
    if (game.helados.greaterThanOrEqualTo(this.edificiosData[index].precio)) {
      game.helados = game.helados.minus(this.edificiosData[index].precio);
      this.edificiosData[index].cantidad =
        this.edificiosData[index].cantidad.plus("1");
      this.edificiosData[index].precio = this.edificiosData[index].precio.times(
        Decimal("1.15")
      );
      display.updateScore();
      displayBotonesEdificios();
    } else {
      notificacionCompra.classList.add("visible-notificacion-compra");
      notificacionCompra.classList.remove("hidden-notificacion");

      function esconderNotificacion() {
        notificacionCompra.classList.add("hidden-notificacion");
        notificacionCompra.classList.remove("visible-notificacion-compra");
      }
      setTimeout(esconderNotificacion, 2500);
    }
  },
  comprarPor10: function (index) {
    let precioTotalPor10 = [];
    let precioIndividualPor10 = [];

    for (let i = 0; i < edificios.edificiosData.length; i++) {
      precioTotalPor10.push(
        precioTotalPorCantidad(10, edificios.edificiosData[i].precio)
      );
      precioIndividualPor10.push(
        precioIndividualPorCantidad(10, edificios.edificiosData[i].precio)
      );
    }

    if (game.helados.greaterThanOrEqualTo(precioTotalPor10[index])) {
      game.helados = game.helados.minus(precioTotalPor10[index]);
      this.edificiosData[index].cantidad =
        this.edificiosData[index].cantidad.plus("10");

      this.edificiosData[index].precio = precioIndividualPor10[index];
      display.updateScore();
      displayBotonesEdificios();
    } else {
      notificacionCompra.classList.add("visible-notificacion-compra");
      notificacionCompra.classList.remove("hidden-notificacion");

      function esconderNotificacion() {
        notificacionCompra.classList.add("hidden-notificacion");
        notificacionCompra.classList.remove("visible-notificacion-compra");
      }
      setTimeout(esconderNotificacion, 2500);
    }
  },
  comprarPor100: function (index) {
    let precioTotalPor100 = [];
    let precioIndividualPor100 = [];

    for (let i = 0; i < edificios.edificiosData.length; i++) {
      precioTotalPor100.push(
        precioTotalPorCantidad(100, edificios.edificiosData[i].precio)
      );
      precioIndividualPor100.push(
        precioIndividualPorCantidad(100, edificios.edificiosData[i].precio)
      );
    }

    if (game.helados.greaterThanOrEqualTo(precioTotalPor100[index])) {
      game.helados = game.helados.minus(precioTotalPor100[index]);
      this.edificiosData[index].cantidad =
        this.edificiosData[index].cantidad.plus("100");
      this.edificiosData[index].precio = precioIndividualPor100[index];
      display.updateScore();
      displayBotonesEdificios();
    } else {
      notificacionCompra.classList.add("visible-notificacion-compra");
      notificacionCompra.classList.remove("hidden-notificacion");

      function esconderNotificacion() {
        notificacionCompra.classList.add("hidden-notificacion");
        notificacionCompra.classList.remove("visible-notificacion-compra");
      }
      setTimeout(esconderNotificacion, 2500);
    }
  },
};

//Objeto display que tiene funciones para actualizar los Spans en el DOM
let display = {
  updateScore: function () {
    let numeroFormateado = "";
    if (game.helados.greaterThanOrEqualTo("1000")) {
      numeroFormateado = `${numberformat.formatShort(game.helados, {
        backend: "decimal.js",
        format: "standard",
        sigfigs: 4,
      })}`;
    } else {
      numeroFormateado = game.helados.toFixed(1);
    }
    heladoSpan.innerText = numeroFormateado;
    heladosPorSegundoSpan.innerText = game.getHeladosPorSegundo();
    document.title = `${numeroFormateado} Helados!`;
  },
  updateSpans: function () {
    for (let i = 0; i < cantidadEdificiosSpans.length; i++) {
      cantidadEdificiosSpans[i].innerText = `${numberformat.formatShort(
        edificios.edificiosData[i].cantidad,
        { backend: "decimal.js", format: "standard", sigfigs: 4 }
      )}`;
    }

    for (let i = 0; i < precioEdificiosSpans.length; i++) {
      if (game.comprarPorCantidad === 0) {
        precioEdificiosSpans[i].innerText = `${numberformat.formatShort(
          edificios.edificiosData[i].precio,
          { backend: "decimal.js", format: "standard", sigfigs: 4 }
        )}`;
      } else if (game.comprarPorCantidad === 1) {
        precioEdificiosSpans[i].innerText = `${numberformat.formatShort(
          precioTotalPorCantidad(10, edificios.edificiosData[i].precio),
          { backend: "decimal.js", format: "standard", sigfigs: 4 }
        )}`;
      } else if (game.comprarPorCantidad === 2) {
        precioEdificiosSpans[i].innerText = `${numberformat.formatShort(
          precioTotalPorCantidad(100, edificios.edificiosData[i].precio),
          { backend: "decimal.js", format: "standard", sigfigs: 4 }
        )}`;
      }
    }
  },
  updateMejoras: function () {
    for (let i = 0; i < mejoras.nombre.length; i++) {
      if (!mejoras.comprado[i]) {
        if (
          mejoras.type[i] == "edificio" &&
          edificios.edificiosData[
            mejoras.edificioIndex[i]
          ].cantidad.greaterThanOrEqualTo(mejoras.requisitos[i])
        ) {
          botonesMejoras[i].classList.remove("hidden");
          botonesMejoras[i].classList.add("visible");
        } else if (
          mejoras.type[i] == "click" &&
          game.heladosClickeados.greaterThanOrEqualTo(mejoras.requisitos[i])
        ) {
          botonesMejoras[i].classList.remove("hidden");
          botonesMejoras[i].classList.add("visible");
        } else if (
          mejoras.type[i] == "clickPorcentual" &&
          game.heladosClickeados.greaterThanOrEqualTo(mejoras.requisitos[i])
        ) {
          botonesMejoras[i].classList.remove("hidden");
          botonesMejoras[i].classList.add("visible");
        }
      } else {
        botonesMejoras[i].classList.remove("visible");
        botonesMejoras[i].classList.add("hidden");
      }
    }
  },
};

//Botones
//Boton del helado-clicker
let handleProximoClick = true;
function setHandleProximoClickTrue() {
  handleProximoClick = true;
}

function setHandleProximoClickTrueDespuesDe25ms() {
  setTimeout(setHandleProximoClickTrue, 25);
}

heladoButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (handleProximoClick) {
    clickBotonHelado();
    setHandleProximoClickTrueDespuesDe25ms();
  }
});

function clickBotonHelado() {
  game.addToScore(game.clickValue);
  game.heladosClickeados = game.heladosClickeados.plus("1");
  let position = heladoButton.getBoundingClientRect();
  let numRandomX = Math.random() * 80;
  let numRandomY = Math.random() * 40;
  let x = position.x - 40 + (numRandomX - 40);
  let y = position.y + 70 + (numRandomY - 20);
  let element = `<div class="pops"><div class="pop" style="position:absolute;left:${x}px;top:${y}px;">+${
    new Decimal("1000").greaterThanOrEqualTo(game.clickValue)
      ? game.clickValue
      : numberformat.formatShort(game.clickValue, {
          backend: "decimal.js",
          format: "standard",
          sigfigs: 4,
        })
  }</div></div>`;
  let nuevoElemento = document.createElement("div");
  nuevoElemento.innerHTML = element;
  popDiv.appendChild(nuevoElemento);
  setTimeout(function () {
    popDiv.removeChild(popDiv.firstChild);
  }, 1200);
  audioClickHelado(contadorAudio);
  handleProximoClick = false;
}

//Botones de edificios
for (let i = 0; i < botonesEdificios.length; i++) {
  botonesEdificios[i].addEventListener("click", (e) => {
    e.preventDefault();
    if (game.comprarPorCantidad === 0) {
      edificios.comprar(i);
    } else if (game.comprarPorCantidad === 1) {
      edificios.comprarPor10(i);
    } else if (game.comprarPorCantidad === 2) {
      edificios.comprarPor100(i);
    }
    mouseHoverEdificios(i);
    display.updateSpans();
  });
}

//Botones de opciones
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  resetGame();
});

exportButton.addEventListener("click", (e) => {
  e.preventDefault();
  exportSaveFile();
});

buttonEstadisticas.addEventListener("click", (e) => {
  document.querySelector("#modal-estadisticas").classList.add("is-active");
  mostrarEstadisticas();
});

//Botones para comprar en cantidad
botonComprarPor1.addEventListener("click", (e) => {
  e.preventDefault();
  game.comprarPorCantidad = 0;
  display.updateSpans();
});

botonComprarPor10.addEventListener("click", (e) => {
  e.preventDefault();
  game.comprarPorCantidad = 1;
  display.updateSpans();
});

botonComprarPor100.addEventListener("click", (e) => {
  e.preventDefault();
  game.comprarPorCantidad = 2;
  display.updateSpans();
});

function saveGame() {
  let gameSave = {
    helados: game.helados,
    totalDeHelados: game.totalDeHelados,
    heladosClickeados: game.heladosClickeados,
    clickValue: game.clickValue,
    version: game.version,
    edificiosData: edificios.edificiosData,
    mejorasComprado: mejoras.comprado,
  };
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
    if (typeof savedGame.edificiosData !== "undefined") {
      edificios.edificiosData = savedGame.edificiosData;
      for (let i = 0; i < edificios.edificiosData.length; i++) {
        edificios.edificiosData[i].cantidad = new Decimal(
          edificios.edificiosData[i].cantidad
        );
        edificios.edificiosData[i].precio = new Decimal(
          edificios.edificiosData[i].precio
        );
        edificios.edificiosData[i].ingresos = new Decimal(
          edificios.edificiosData[i].ingresos
        );
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
    displayBotonesEdificios();
  }
}

function exportSaveFile() {
  let savedGame = localStorage.getItem("gamesave");
  let partidaGuardada = `${savedGame}`;
  let archivoEncriptado = encriptar(partidaGuardada);
  document.querySelector("#textarea-exportar").value = archivoEncriptado;
}

function importSaveFile() {
  let archivoEncriptado = document.querySelector("#textarea-importar").value;
  let archivoDesencriptado = desencriptar(archivoEncriptado);
  localStorage.setItem(
    "gamesave",
    archivoDesencriptado.toString(CryptoJS.enc.Utf8)
  );
  location.reload();
}

setInterval(function () {
  game.helados = game.helados.plus(game.getHeladosCada100ms());
  game.totalDeHelados = game.totalDeHelados.plus(game.getHeladosCada100ms());
  display.updateScore();
  display.updateMejoras();
}, 100);

function resetGame() {
  if (
    confirm(
      "Estas seguro que quieres reiniciar tu partida? esto eliminara todo tu progreso."
    )
  ) {
    let gameSave = {};
    localStorage.setItem("gamesave", JSON.stringify(gameSave));
    location.reload();
  }
}

window.onload = function () {
  loadGame();
  display.updateSpans();
  display.updateScore();
  display.updateMejoras();
  document.querySelector("#loader-window").classList.add("hidden");
};

setInterval(function () {
  saveGame();
}, 60000); //Se guarda cada 60 segundos.

document.addEventListener(
  "keydown",
  function (event) {
    if (event.ctrlKey && event.key == 83) {
      event.preventDefault();
    } else if (event.ctrlKey && event.keyIdentifier == 83) {
      event.preventDefault();
    } else if (event.ctrlKey && event.keyCode == 83) {
      event.preventDefault();
      saveGame();
    }
  },
  false
);

function encriptar(partidaGuardada) {
  let archivoEncriptado = CryptoJS.AES.encrypt(partidaGuardada, salt);
  return archivoEncriptado;
}

function desencriptar(partidaEncriptada) {
  let archivoDesencriptado = CryptoJS.AES.decrypt(partidaEncriptada, salt);
  return archivoDesencriptado;
}

for (let i = 0; i < mejoras.nombre.length; i++) {
  let nuevaMejora = `
    <div onmouseover="mouseHoverMejoras(${i})" onmouseleave="mouseOutMejoras()" class="borde-mejora hidden tooltip-mejoras" onclick="mejoras.comprar(${i})">
        <img src="./images/${mejoras.image[i]}">
    </div>
    `;

  contenedorMejoras.innerHTML += nuevaMejora;
}

botonesMejoras = contenedorMejoras.querySelectorAll("div");

const tooltipsDiv = document.querySelector("#tooltips-div");

function mouseHoverMejoras(i) {
  onmousemove = function (e) {
    let y = e.clientY;
    tooltipsDiv.innerHTML = `<div class="tooltips-mejoras" style="position:absolute;top:${
      y - 75
    }px;">
            <section class="left">
            <p>${mejoras.nombre[i]}</p>
            <p>${mejoras.descripcion[i]}</p>
            <p>Coste: <b>${numberformat.formatShort(mejoras.precio[i], {
              backend: "decimal.js",
              format: "standard",
              sigfigs: 4,
            })}</b> Helados</p>
            <i></i>
            </section>
        </div>`;
  };
}

function mouseOutMejoras() {
  onmousemove = function (e) {
    tooltipsDiv.innerHTML = "";
  };
}

function mouseHoverEdificios(i) {
  onmousemove = function (e) {
    let y = e.clientY;
    let ingresosPorEdificio = edificios.edificiosData[i].ingresos.times(
      `${edificios.edificiosData[i].cantidad}`
    );
    let heladosCada100ms = game.getHeladosCada100ms();
    tooltipsDiv.innerHTML = `<div class="tooltips-mejoras" style="position:absolute;top:${
      y - 75
    }px;">
            <section class="left">
            <p>${edificios.edificiosData[i].nombre}</p>
            <p>${edificios.edificiosData[i].descripcion}</p>
            <p>Produccion total actual:<b>${
              new Decimal("1000").greaterThanOrEqualTo(ingresosPorEdificio)
                ? ingresosPorEdificio.toFixed(2)
                : numberformat.formatShort(
                    edificios.edificiosData[i].ingresos.times(
                      `${edificios.edificiosData[i].cantidad}`
                    ),
                    { backend: "decimal.js", format: "standard", sigfigs: 4 }
                  )
            }</b> Helados</p>
            <p>Esto representa el <b>(${
              heladosCada100ms.d != 0
                ? edificios.edificiosData[i].ingresos
                    .times(`${edificios.edificiosData[i].cantidad}`)
                    .times("100")
                    .dividedBy(game.getHeladosCada100ms().times("10"))
                    .toFixed(3)
                : "0"
            }%)</b> de tu produccion total de Helados</p>
            <i></i>
            </section>
        </div>`;
  };
}

function mouseOutEdificios() {
  onmousemove = function (e) {
    tooltipsDiv.innerHTML = "";
  };
}

function mejorasPorDesbloquear() {
  let mejorasCompradas = 0;
  for (let i = 0; i < mejoras.comprado.length; i++) {
    if (mejoras.comprado[i] === true) {
      mejorasCompradas++;
    }
  }
  return mejorasCompradas;
}

function mostrarEstadisticas() {
  const dataChart = {
    labels: [],
    datasets: [
      {
        label: "Porcentaje de produccion",
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  };

  //${heladosCada100ms.d != 0 ? ((edificios.edificiosData[i].ingresos.times(`${edificios.edificiosData[i].cantidad}`).times('100')).dividedBy(game.getHeladosCada100ms().times('10'))).toFixed(3) : '0'}

  for (let i = 0; i < edificios.edificiosData.length; i++) {
    if (edificios.edificiosData[i].cantidad > 0) {
      dataChart.labels.push(edificios.edificiosData[i].nombre);
      dataChart.datasets[0].data.push(
        edificios.edificiosData[i].ingresos
          .times(`${edificios.edificiosData[i].cantidad}`)
          .times("100")
          .dividedBy(game.getHeladosCada100ms().times("10"))
          .toFixed(2)
      );
      dataChart.datasets[0].backgroundColor.push(
        edificios.edificiosData[i].color
      );
    }
  }

  console.log(dataChart);

  const config = {
    type: "pie",
    data: dataChart,
    options: {},
  };

  let textoEstadisticas = `
        <div>
            <p>Total de clicks hechos: ${numberformat.formatShort(
              game.heladosClickeados,
              { backend: "decimal.js", format: "standard", sigfigs: 4 }
            )}</p>
            <p>Total de helados conseguidos: ${numberformat.formatShort(
              game.totalDeHelados,
              { backend: "decimal.js", format: "standard", sigfigs: 4 }
            )}</p>
            <p>Mejoras compradas: ${mejorasPorDesbloquear()}/${
    mejoras.comprado.length
  }</p>
        </div>
        <div class="text-center" style="font-size: 20px; margin-bottom: 1.5rem!important; margin-top: 2.5rem!important;">
            <h1><strong>Porcentaje de produccion por edificio</strong></h1>
        </div>
        <div class="text-center" style="margin: auto; margin-top: 3rem!important; height: 75%; width: 75%;">
            <canvas id="estadisticasChart"></canvas>
        </div>
    `;

  //

  document.querySelector("#contenedor-modal-estadisticas").innerHTML =
    textoEstadisticas;

  const myChart = new Chart(
    document.getElementById("estadisticasChart"),
    config
  );
}

function precioTotalPorCantidad(cantidad, precioEdificio) {
  //retorna cuanto costaria comprar el total de una cantidad de un edificio
  let precio = precioEdificio;
  let precioTotal = new Decimal("0");
  for (let i = 0; i < cantidad; i++) {
    precioTotal = precioTotal.plus(precio);
    precio = precio.times("1.15");
  }
  return precioTotal;
}

function precioIndividualPorCantidad(cantidad, precioEdificio) {
  //retorna cuanto costaria comprar un edificio individualmente luego de x cantidad
  let precio = precioEdificio;
  for (let i = 0; i < cantidad; i++) {
    precio = precio.times("1.15");
  }
  return precio;
}

function displayBotonesEdificios() {
  //   for (let i = 0; i < botonesEdificios.length - 2; i++) {
  //     if (edificios.edificiosData[i].cantidad > 0) {
  //       botonesEdificios[i + 1].classList.remove("edificio-no-disponible");
  //       botonesEdificios[i + 2].classList.add("edificio-no-disponible");
  //       botonesEdificios[i + 1].disabled = false;
  //       botonesEdificios[i + 2].disabled = true;
  //       botonesEdificios[i + 2].classList.remove("d-none");
  //     } else {
  //       botonesEdificios[i + 2].classList.add("d-none");
  //     }
  //   }
  //   if (edificios.edificiosData[13].cantidad > 0) {
  //     botonesEdificios[14].classList.remove("edificio-no-disponible");
  //   }
}

// function heladoBonusRandom() {
//   const divHeladoRandom = document.querySelector("#helado-random");
//   let x = +Math.random() * 75;
//   let y = +Math.random() * 75;
//   let element = `
//   <div class="div-helado-random"><div class="pop" style="position:absolute;left:${x}vw;top:${y}vh;">
//     <img src="images/helado-nuevo.png"></img>
//   </div></div>`;
//   let nuevoElemento = document.createElement("div");
//   nuevoElemento.innerHTML = element;
//   divHeladoRandom.appendChild(nuevoElemento);
//   setTimeout(function () {
//     divHeladoRandom.removeChild(divHeladoRandom.firstChild);
//   }, 10000);
// }

// setInterval(() => {
//   heladoBonusRandom();
// }, 10000);
