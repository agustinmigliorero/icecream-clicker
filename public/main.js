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
const resetButton = document.querySelector("#button-reset")
const heladoSpan = document.querySelector("#cookies");
const heladoButton = document.querySelector("#button-cookie");
const heladosPorSegundoSpan = document.querySelector("#cookies-por-segundo");
const contenedorMejoras = document.querySelector("#contenedor-mejoras");
const buttonEstadisticas = document.querySelector("#button-estadisticas");
const popDiv = document.querySelector("#pops");
const precioEdificiosSpans = document.querySelectorAll(".selector-precio-edificio");
const cantidadEdificiosSpans = document.querySelectorAll(".selector-cantidad-edificio");
const botonesEdificios = document.querySelectorAll(".selector-boton-edificio");
let botonesMejoras = contenedorMejoras.querySelectorAll("div");

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
    comprarPorCantidad: 0,    //Comprar por cantidad, 0 = comprar x1, 1 = comprar x10 y 2 = comprar x100
    addToScore: function(cantidad) {

        if (mejoras.comprado[8]) {
            this.actualizarClickValue();
        }

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
    },
    actualizarClickValue: function() {
        let clickValueActualizado = new Decimal('1');
        for (let i = 0; i < 8; i++) {
            if (mejoras.comprado[i]) {
                clickValueActualizado = clickValueActualizado.times('2');
            }
        }
        clickValueActualizado = clickValueActualizado.plus(this.getHeladosCada100ms().dividedBy('10'));
        this.clickValue = clickValueActualizado;
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
    descripcion: 
    [
        "Compra cucharas para hacer helado!",
        "Contrata heladeros!",
        "Compra carritos para vender helados!",
        "Compra camiones para vender helados!",
        "Abre tus propias heladerias!",
        "Crea tu propia granja de helados!",
        "Produce helados industrializados!",
        "Aprovecha el Boom de la religion!",
        "Otorga prestamos de helados!",
        "Crea helados con la piedra filosofal",
        "Contrata Aliens expertos en helados!",
        "Establece bases en los planetas de helado!",
        "Portales hacia la dimension de los helados!",
        "Monstruos de la dimension de los helados!",
        "Los creadores de todo, usalos a tu favor!"
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
            this.precio[index] = this.precio[index].times(Decimal('1.15'));
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
    },
    comprarPor10: function(index) {
        let precioTotalPor10 = [];
        let precioIndividualPor10 = [];

        for (let i = 0; i < edificios.precio.length; i++) {
            precioTotalPor10.push(precioTotalPorCantidad(10, edificios.precio[i]));
            precioIndividualPor10.push(precioIndividualPorCantidad(10, edificios.precio[i]));
        }

        if (game.helados.greaterThanOrEqualTo(precioTotalPor10[index])) {
            game.helados = game.helados.minus(precioTotalPor10[index]);
            this.cantidad[index] = this.cantidad[index].plus('10');
            this.precio[index] = precioIndividualPor10[index];
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
    },
    comprarPor100: function(index) {
        let precioTotalPor100 = [];
        let precioIndividualPor100 = [];
        
        for (let i = 0; i < edificios.precio.length; i++) {
            precioTotalPor100.push(precioTotalPorCantidad(100, edificios.precio[i]));
            precioIndividualPor100.push(precioIndividualPorCantidad(100, edificios.precio[i]));
        }

        if (game.helados.greaterThanOrEqualTo(precioTotalPor100[index])) {
            game.helados = game.helados.minus(precioTotalPor100[index]);
            this.cantidad[index] = this.cantidad[index].plus('100');
            this.precio[index] = precioIndividualPor100[index];
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
        "Click Poderoso tier 1","Click Poderoso tier 2","Click Poderoso tier 3","Click Poderoso tier 4","Click Poderoso tier 5","Click Poderoso tier 6","Click Poderoso tier 7","Click Poderoso tier 8",
        "Click Poderoso tier 9",
        "Cucharas Mutantes tier 1","Cucharas Mutantes tier 2","Cucharas Mutantes tier 3","Cucharas Mutantes tier 4","Cucharas Mutantes tier 5","Cucharas Mutantes tier 6","Cucharas Mutantes tier 7","Cucharas Mutantes tier 8",
        "Uniforme tier 1","Uniforme tier 2","Uniforme tier 3","Uniforme tier 4","Uniforme tier 5","Uniforme tier 6","Uniforme tier 7","Uniforme tier 8",
        "Parlantes tier 1","Parlantes tier 2","Parlantes tier 3","Parlantes tier 4","Parlantes tier 5","Parlantes tier 6","Parlantes tier 7","Parlantes tier 8",
        "Motor turbo tier 1","Motor turbo tier 2","Motor turbo tier 3","Motor turbo tier 4","Motor turbo tier 5","Motor turbo tier 6","Motor turbo tier 7","Motor turbo tier 8",
        "Gerentes tier 1","Gerentes tier 2","Gerentes tier 3","Gerentes tier 4","Gerentes tier 5","Gerentes tier 6","Gerentes tier 7","Gerentes tier 8",
        "Granero tier 1","Granero tier 2","Granero tier 3","Granero tier 4","Granero tier 5","Granero tier 6","Granero tier 7","Granero tier 8",
        "Produccion Automatizada tier 1","Produccion Automatizada tier 2","Produccion Automatizada tier 3","Produccion Automatizada tier 4","Produccion Automatizada tier 5","Produccion Automatizada tier 6","Produccion Automatizada tier 7","Produccion Automatizada tier 8",
        "Misioneros tier 1","Misioneros tier 2","Misioneros tier 3","Misioneros tier 4","Misioneros tier 5","Misioneros tier 6","Misioneros tier 7","Misioneros tier 8",
        "Contadores tier 1","Contadores tier 2","Contadores tier 3","Contadores tier 4","Contadores tier 5","Contadores tier 6","Contadores tier 7","Contadores tier 8",
        "Recetas de Newton tier 1","Recetas de Newton tier 2","Recetas de Newton tier 3","Recetas de Newton tier 4","Recetas de Newton tier 5","Recetas de Newton tier 6","Recetas de Newton tier 7","Recetas de Newton tier 8",
        "Telequinesis tier 1","Telequinesis tier 2","Telequinesis tier 3","Telequinesis tier 4","Telequinesis tier 5","Telequinesis tier 6","Telequinesis tier 7","Telequinesis tier 8",
        "Colonias tier 1","Colonias tier 2","Colonias tier 3","Colonias tier 4","Colonias tier 5","Colonias tier 6","Colonias tier 7","Colonias tier 8",
        "Horizonte de sucesos tier 1","Horizonte de sucesos tier 2","Horizonte de sucesos tier 3","Horizonte de sucesos tier 4","Horizonte de sucesos tier 5","Horizonte de sucesos tier 6","Horizonte de sucesos tier 7","Horizonte de sucesos tier 8",
        "Exoesqueleto obleico tier 1","Exoesqueleto obleico tier 2","Exoesqueleto obleico tier 3","Exoesqueleto obleico tier 4","Exoesqueleto obleico tier 5","Exoesqueleto obleico tier 6","Exoesqueleto obleico tier 7","Exoesqueleto obleico tier 8",
        "Omnipotencia tier 1","Omnipotencia tier 2","Omnipotencia tier 3","Omnipotencia tier 4","Omnipotencia tier 5","Omnipotencia tier 6","Omnipotencia tier 7","Omnipotencia tier 8"
    ],
    descripcion: 
    [
        "El click es el doble de potente!","El click es el doble de potente!","El click es el doble de potente!","El click es el doble de potente!","El click es el doble de potente!","El click es el doble de potente!","El click es el doble de potente!","El click es el doble de potente!",
        "El click hace el 1% de tu produccion por segundo!",
        "Tus cucharas producen el doble!","Tus cucharas producen el doble!","Tus cucharas producen el doble!","Tus cucharas producen el doble!","Tus cucharas producen el doble!","Tus cucharas producen el doble!","Tus cucharas producen el doble!","Tus cucharas producen el doble!",
        "Tus heladeros producen el doble!","Tus heladeros producen el doble!","Tus heladeros producen el doble!","Tus heladeros producen el doble!","Tus heladeros producen el doble!","Tus heladeros producen el doble!","Tus heladeros producen el doble!","Tus heladeros producen el doble!",
        "Tus carritos producen el doble!","Tus carritos producen el doble!","Tus carritos producen el doble!","Tus carritos producen el doble!","Tus carritos producen el doble!","Tus carritos producen el doble!","Tus carritos producen el doble!","Tus carritos producen el doble!",
        "Tus camiones producen el doble!","Tus camiones producen el doble!","Tus camiones producen el doble!","Tus camiones producen el doble!","Tus camiones producen el doble!","Tus camiones producen el doble!","Tus camiones producen el doble!","Tus camiones producen el doble!",
        "Tus heladerias producen el doble!","Tus heladerias producen el doble!","Tus heladerias producen el doble!","Tus heladerias producen el doble!","Tus heladerias producen el doble!","Tus heladerias producen el doble!","Tus heladerias producen el doble!","Tus heladerias producen el doble!",
        "Tus granjas producen el doble!","Tus granjas producen el doble!","Tus granjas producen el doble!","Tus granjas producen el doble!","Tus granjas producen el doble!","Tus granjas producen el doble!","Tus granjas producen el doble!","Tus granjas producen el doble!",
        "Tus fabricas producen el doble!","Tus fabricas producen el doble!","Tus fabricas producen el doble!","Tus fabricas producen el doble!","Tus fabricas producen el doble!","Tus fabricas producen el doble!","Tus fabricas producen el doble!","Tus fabricas producen el doble!",
        "Tus iglesias producen el doble!","Tus iglesias producen el doble!","Tus iglesias producen el doble!","Tus iglesias producen el doble!","Tus iglesias producen el doble!","Tus iglesias producen el doble!","Tus iglesias producen el doble!","Tus iglesias producen el doble!",
        "Tus bancos producen el doble!","Tus bancos producen el doble!","Tus bancos producen el doble!","Tus bancos producen el doble!","Tus bancos producen el doble!","Tus bancos producen el doble!","Tus bancos producen el doble!","Tus bancos producen el doble!",
        "Tus alquimias producen el doble!","Tus alquimias producen el doble!","Tus alquimias producen el doble!","Tus alquimias producen el doble!","Tus alquimias producen el doble!","Tus alquimias producen el doble!","Tus alquimias producen el doble!","Tus alquimias producen el doble!",
        "Tus aliens producen el doble!","Tus aliens producen el doble!","Tus aliens producen el doble!","Tus aliens producen el doble!","Tus aliens producen el doble!","Tus aliens producen el doble!","Tus aliens producen el doble!","Tus aliens producen el doble!",
        "Tus planetas producen el doble!","Tus planetas producen el doble!","Tus planetas producen el doble!","Tus planetas producen el doble!","Tus planetas producen el doble!","Tus planetas producen el doble!","Tus planetas producen el doble!","Tus planetas producen el doble!",
        "Tus portales producen el doble!","Tus portales producen el doble!","Tus portales producen el doble!","Tus portales producen el doble!","Tus portales producen el doble!","Tus portales producen el doble!","Tus portales producen el doble!","Tus portales producen el doble!",
        "Tus monstruos producen el doble!","Tus monstruos producen el doble!","Tus monstruos producen el doble!","Tus monstruos producen el doble!","Tus monstruos producen el doble!","Tus monstruos producen el doble!","Tus monstruos producen el doble!","Tus monstruos producen el doble!",
        "Tus dioses producen el doble!","Tus dioses producen el doble!","Tus dioses producen el doble!","Tus dioses producen el doble!","Tus dioses producen el doble!","Tus dioses producen el doble!","Tus dioses producen el doble!","Tus dioses producen el doble!"
    ],
    image: 
    [
        "clickpoderoso.png","clickpoderoso.png","clickpoderoso.png","clickpoderoso.png","clickpoderoso.png","clickpoderoso.png","clickpoderoso.png","clickpoderoso.png",
        "clickpoderoso.png",
        "Cuchara2.png","Cuchara2.png","Cuchara2.png","Cuchara2.png","Cuchara2.png","Cuchara2.png","Cuchara2.png","Cuchara2.png",
        "Heladero.png","Heladero.png","Heladero.png","Heladero.png","Heladero.png","Heladero.png","Heladero.png","Heladero.png",
        "Puesto.png","Puesto.png","Puesto.png","Puesto.png","Puesto.png","Puesto.png","Puesto.png","Puesto.png",
        "Camion.png","Camion.png","Camion.png","Camion.png","Camion.png","Camion.png","Camion.png","Camion.png",
        "heladeria.png","heladeria.png","heladeria.png","heladeria.png","heladeria.png","heladeria.png","heladeria.png","heladeria.png",
        "Granja.png","Granja.png","Granja.png","Granja.png","Granja.png","Granja.png","Granja.png","Granja.png",
        "Fabrica.png","Fabrica.png","Fabrica.png","Fabrica.png","Fabrica.png","Fabrica.png","Fabrica.png","Fabrica.png",
        "Iglesia.png","Iglesia.png","Iglesia.png","Iglesia.png","Iglesia.png","Iglesia.png","Iglesia.png","Iglesia.png",
        "Banco.png","Banco.png","Banco.png","Banco.png","Banco.png","Banco.png","Banco.png","Banco.png",
        "Alquimia.png","Alquimia.png","Alquimia.png","Alquimia.png","Alquimia.png","Alquimia.png","Alquimia.png","Alquimia.png",
        "Aliens.png","Aliens.png","Aliens.png","Aliens.png","Aliens.png","Aliens.png","Aliens.png","Aliens.png",
        "Planeta.png","Planeta.png","Planeta.png","Planeta.png","Planeta.png","Planeta.png","Planeta.png","Planeta.png",
        "Portal.png","Portal.png","Portal.png","Portal.png","Portal.png","Portal.png","Portal.png","Portal.png",
        "Monstruo2.png","Monstruo2.png","Monstruo2.png","Monstruo2.png","Monstruo2.png","Monstruo2.png","Monstruo2.png","Monstruo2.png",
        "Divinidad.png","Divinidad.png","Divinidad.png","Divinidad.png","Divinidad.png","Divinidad.png","Divinidad.png","Divinidad.png",
    ],
    type:
    [
        "click","click","click","click","click","click","click","click",
        "clickPorcentual",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio",
        "edificio","edificio","edificio","edificio","edificio","edificio","edificio","edificio"
    ],
    precio: 
    [
        new Decimal('100'),new Decimal('1000'),new Decimal('10000'),new Decimal('100000'),new Decimal('1000000'),new Decimal('10000000'),new Decimal('100000000'),new Decimal('1000000000'),
        new Decimal('5000000000'),
        new Decimal('100'),new Decimal('1000'),new Decimal('10000'),new Decimal('100000'),new Decimal('1000000'),new Decimal('10000000'),new Decimal('100000000'),new Decimal('1000000000'),
        new Decimal('500'),new Decimal('5000'),new Decimal('50000'),new Decimal('500000'),new Decimal('5000000'),new Decimal('50000000'),new Decimal('500000000'),new Decimal('5000000000'),
        new Decimal('1000'),new Decimal('10000'),new Decimal('100000'),new Decimal('1000000'),new Decimal('10000000'),new Decimal('100000000'),new Decimal('1000000000'),new Decimal('10000000000'),
        new Decimal('5000'),new Decimal('50000'),new Decimal('500000'),new Decimal('5000000'),new Decimal('50000000'),new Decimal('500000000'),new Decimal('5000000000'),new Decimal('50000000000'),
        new Decimal('10000'),new Decimal('100000'),new Decimal('1000000'),new Decimal('10000000'),new Decimal('100000000'),new Decimal('1000000000'),new Decimal('10000000000'),new Decimal('100000000000'),
        new Decimal('50000'),new Decimal('500000'),new Decimal('5000000'),new Decimal('50000000'),new Decimal('500000000'),new Decimal('5000000000'),new Decimal('50000000000'),new Decimal('500000000000'),
        new Decimal('100000'),new Decimal('1000000'),new Decimal('10000000'),new Decimal('100000000'),new Decimal('1000000000'),new Decimal('10000000000'),new Decimal('100000000000'),new Decimal('1000000000000'),
        new Decimal('500000'),new Decimal('5000000'),new Decimal('50000000'),new Decimal('500000000'),new Decimal('5000000000'),new Decimal('50000000000'),new Decimal('500000000000'),new Decimal('5000000000000'),
        new Decimal('1000000'),new Decimal('10000000'),new Decimal('100000000'),new Decimal('1000000000'),new Decimal('10000000000'),new Decimal('100000000000'),new Decimal('1000000000000'),new Decimal('10000000000000'),
        new Decimal('5000000'),new Decimal('50000000'),new Decimal('500000000'),new Decimal('5000000000'),new Decimal('50000000000'),new Decimal('500000000000'),new Decimal('5000000000000'),new Decimal('50000000000000'),
        new Decimal('10000000'),new Decimal('100000000'),new Decimal('1000000000'),new Decimal('10000000000'),new Decimal('100000000000'),new Decimal('1000000000000'),new Decimal('10000000000000'),new Decimal('100000000000000'),
        new Decimal('50000000'),new Decimal('500000000'),new Decimal('5000000000'),new Decimal('50000000000'),new Decimal('500000000000'),new Decimal('5000000000000'),new Decimal('50000000000000'),new Decimal('500000000000000'),
        new Decimal('100000000'),new Decimal('1000000000'),new Decimal('10000000000'),new Decimal('100000000000'),new Decimal('1000000000000'),new Decimal('10000000000000'),new Decimal('100000000000000'),new Decimal('1000000000000000'),
        new Decimal('500000000'),new Decimal('5000000000'),new Decimal('50000000000'),new Decimal('500000000000'),new Decimal('5000000000000'),new Decimal('50000000000000'),new Decimal('500000000000000'),new Decimal('5000000000000000'),
        new Decimal('1000000000'),new Decimal('10000000000'),new Decimal('100000000000'),new Decimal('1000000000000'),new Decimal('10000000000000'),new Decimal('100000000000000'),new Decimal('1000000000000000'),new Decimal('10000000000000000'),
    ],
    edificioIndex:
    [
        -1,-1,-1,-1,-1,-1,-1,-1,
        -2,
        0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,
        3,3,3,3,3,3,3,3,
        4,4,4,4,4,4,4,4,
        5,5,5,5,5,5,5,5,
        6,6,6,6,6,6,6,6,
        7,7,7,7,7,7,7,7,
        8,8,8,8,8,8,8,8,
        9,9,9,9,9,9,9,9,
        10,10,10,10,10,10,10,10,
        11,11,11,11,11,11,11,11,
        12,12,12,12,12,12,12,12,
        13,13,13,13,13,13,13,13,
        14,14,14,14,14,14,14,14,
    ],
    requisitos:
    [
        new Decimal('200'),new Decimal('400'),new Decimal('800'),new Decimal('1600'),new Decimal('3200'),new Decimal('6400'),new Decimal('12800'),new Decimal('25600'),
        new Decimal('30000'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
        new Decimal('10'),new Decimal('25'),new Decimal('50'),new Decimal('100'),new Decimal('200'),new Decimal('300'),new Decimal('400'),new Decimal('500'),
    ],
    bonus:
    [
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('0'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
        new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),new Decimal('2'),
    ],
    comprado: 
    [
        false,false,false,false,false,false,false,false,
        false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false
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
            else if (this.type[index] == "clickPorcentual" && game.heladosClickeados.greaterThanOrEqualTo(this.requisitos[index])) {
                game.helados = game.helados.minus(this.precio[index]);
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

        for (let i = 0; i < cantidadEdificiosSpans.length; i++) {
            cantidadEdificiosSpans[i].innerText = `${numberformat.formatShort(edificios.cantidad[i], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`
        }

        for (let i = 0; i < precioEdificiosSpans.length; i++) {
            if (game.comprarPorCantidad === 0) {
                precioEdificiosSpans[i].innerText = `${numberformat.formatShort(edificios.precio[i], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`
            }
            else if (game.comprarPorCantidad === 1) {
                precioEdificiosSpans[i].innerText = `${numberformat.formatShort(precioTotalPorCantidad(10, edificios.precio[i]), {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`
            }
            else if (game.comprarPorCantidad === 2) {
                precioEdificiosSpans[i].innerText = `${numberformat.formatShort(precioTotalPorCantidad(100, edificios.precio[i]), {backend: 'decimal.js', format: 'standard', sigfigs: 4})}`
            }
        }
    },
    updateMejoras: function() {
        for (let i = 0; i < mejoras.nombre.length; i++){

            if (!mejoras.comprado[i]) {
                if (mejoras.type[i] == "edificio" && edificios.cantidad[mejoras.edificioIndex[i]].greaterThanOrEqualTo(mejoras.requisitos[i])) {
                    botonesMejoras[i].classList.remove("hidden");
                    botonesMejoras[i].classList.add("visible");
                }
                else if (mejoras.type[i] == "click" && game.heladosClickeados.greaterThanOrEqualTo(mejoras.requisitos[i])) {
                    botonesMejoras[i].classList.remove("hidden");
                    botonesMejoras[i].classList.add("visible");
        
                }
                else if (mejoras.type[i] == "clickPorcentual" && game.heladosClickeados.greaterThanOrEqualTo(mejoras.requisitos[i])) {
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
let handleProximoClick = true;
function setHandleProximoClickTrue () {
    handleProximoClick = true;
}

function setHandleProximoClickTrueDespuesDe25ms () {
    setTimeout(setHandleProximoClickTrue, 25);
}

heladoButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (handleProximoClick) {
        clickBotonHelado();
        setHandleProximoClickTrueDespuesDe25ms();
    }
})

function clickBotonHelado() {
    game.addToScore(game.clickValue);
    game.heladosClickeados = game.heladosClickeados.plus('1');
    let position = heladoButton.getBoundingClientRect();
    let numRandomX = Math.random() * 80;
    let numRandomY = Math.random() * 40;
    let x = position.x - 40 + (numRandomX - 40)
    let y = position.y + 70 + (numRandomY - 20)
    let element = `<div class="pops"><div class="pop" style="position:absolute;left:${x}px;top:${y}px;">+${new Decimal('1000').greaterThanOrEqualTo(game.clickValue) ? game.clickValue : numberformat.formatShort(game.clickValue, {backend: 'decimal.js', format: 'standard', sigfigs: 4})}</div></div>`
    let nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = element;
    popDiv.appendChild(nuevoElemento)
    setTimeout(function() {
        popDiv.removeChild(popDiv.firstChild);
    }, 1200)
    audioClickHelado(contadorAudio);
    handleProximoClick = false;
}

//Botones de edificios
for (let i = 0; i < botonesEdificios.length; i++) {
    botonesEdificios[i].addEventListener('click', (e) => {
        e.preventDefault();
        if (game.comprarPorCantidad === 0) {
            edificios.comprar(i);
        }
        else if (game.comprarPorCantidad === 1) {
            edificios.comprarPor10(i);
        }
        else if (game.comprarPorCantidad === 2) {
            edificios.comprarPor100(i);
        }
        mouseHoverEdificios(i);
        display.updateSpans();
    })
}

//Botones de opciones
resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetGame();
})

exportButton.addEventListener('click', (e) => {
    e.preventDefault();
    exportSaveFile();
});

buttonEstadisticas.addEventListener('click', (e) => {
    document.querySelector('#modal-estadisticas').classList.add('is-active');
    mostrarEstadisticas();
}); 

//Botones para comprar en cantidad
botonComprarPor1.addEventListener('click', (e) => {
    e.preventDefault();
    game.comprarPorCantidad = 0;
    display.updateSpans();
});

botonComprarPor10.addEventListener('click', (e) => {
    e.preventDefault();
    game.comprarPorCantidad = 1;
    display.updateSpans();
});

botonComprarPor100.addEventListener('click', (e) => {
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
    document.querySelector("#textarea-exportar").value = archivoEncriptado;

}

function importSaveFile() {
    let archivoEncriptado = document.querySelector('#textarea-importar').value;
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
    document.querySelector("#loader-window").classList.add("hidden");
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


for (let i = 0; i < mejoras.nombre.length; i++) {
    let nuevaMejora = 
    `
    <div onmouseover="mouseHoverMejoras(${i})" onmouseleave="mouseOutMejoras()" class="borde-mejora hidden tooltip-mejoras" onclick="mejoras.comprar(${i})">
        <img src="./images/${mejoras.image[i]}">
    </div>
    `;

    contenedorMejoras.innerHTML += nuevaMejora;
}

botonesMejoras = contenedorMejoras.querySelectorAll("div");

const tooltipsDiv = document.querySelector("#tooltips-div")

function mouseHoverMejoras (i) {
    onmousemove = function(e){
        let y = e.clientY;
        tooltipsDiv.innerHTML = 
        `<div class="tooltips-mejoras" style="position:absolute;top:${y -75}px;">
            <section class="left">
            <p>${mejoras.nombre[i]}</p>
            <p>${mejoras.descripcion[i]}</p>
            <p>Coste: <b>${numberformat.formatShort(mejoras.precio[i], {backend: 'decimal.js', format: 'standard', sigfigs: 4})}</b> Helados</p>
            <i></i>
            </section>
        </div>`
    }
}

function mouseOutMejoras () {
    onmousemove = function(e){
        tooltipsDiv.innerHTML = "";
    }
}

function mouseHoverEdificios (i) {
    onmousemove = function(e){
        let y = e.clientY;
        let ingresosPorEdificio = (edificios.ingresos[i].times(`${edificios.cantidad[i]}`));
        let heladosCada100ms = game.getHeladosCada100ms();
        tooltipsDiv.innerHTML = 
        `<div class="tooltips-mejoras" style="position:absolute;top:${y -75}px;">
            <section class="left">
            <p>${edificios.nombre[i]}</p>
            <p>${edificios.descripcion[i]}</p>
            <p>Produccion total actual:<b>${new Decimal('1000').greaterThanOrEqualTo(ingresosPorEdificio) ? ingresosPorEdificio.toFixed(2) : numberformat.formatShort(edificios.ingresos[i].times(`${edificios.cantidad[i]}`), {backend: 'decimal.js', format: 'standard', sigfigs: 4})}</b> Helados</p>
            <p>Esto representa el <b>(${heladosCada100ms.d != 0 ? ((edificios.ingresos[i].times(`${edificios.cantidad[i]}`).times('100')).dividedBy(game.getHeladosCada100ms().times('10'))).toFixed(3) : '0'}%)</b> de tu produccion total de Helados</p>
            <i></i>
            </section>
        </div>`
    }
}

function mouseOutEdificios () {
    onmousemove = function(e){
        tooltipsDiv.innerHTML = "";
    }
}

function mejorasPorDesbloquear () {
    let mejorasCompradas = 0;
    for (let i = 0; i < mejoras.comprado.length; i++) {
        if (mejoras.comprado[i] === true) {
            mejorasCompradas++;
        }
    }
    return mejorasCompradas;
}

function mostrarEstadisticas () {
    let textoEstadisticas = 
    `
        <p>Total de clicks hechos: ${numberformat.formatShort(game.heladosClickeados, {backend: 'decimal.js', format: 'standard', sigfigs: 4})}</p>
        <p>Total de helados conseguidos: ${numberformat.formatShort(game.totalDeHelados, {backend: 'decimal.js', format: 'standard', sigfigs: 4})}</p>
        <p>Mejoras compradas: ${mejorasPorDesbloquear()}/${mejoras.comprado.length}</p>
    `
    document.querySelector("#contenedor-modal-estadisticas").innerHTML = textoEstadisticas;
}


//REVISAR MAS TARDE

// Game.GetMouseCoords=function(e)
// {
//     let posx=0;
//     let posy=0;
//     if (!e) var e=window.event;
//     if (e.pageX||e.pageY)
//     {
//         posx=e.pageX;
//         posy=e.pageY;
//     }
//     else if (e.clientX || e.clientY)
//     {
//         posx=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
//         posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
//     }
// }


function precioTotalPorCantidad(cantidad, precioEdificio)//retorna cuanto costaria comprar el total de una cantidad de un edificio
{
    let precio = precioEdificio;
    let precioTotal = new Decimal('0');
    for (let i = 0; i < cantidad; i++)
    {
        precioTotal = precioTotal.plus(precio);
        precio = precio.times('1.15');
    }
    return precioTotal;
}

function precioIndividualPorCantidad(cantidad, precioEdificio)//retorna cuanto costaria comprar un edificio individualmente luego de x cantidad
{
    let precio = precioEdificio;
    for (let i = 0; i < cantidad; i++)
    {
        precio = precio.times('1.15');
    }
    return precio;
}