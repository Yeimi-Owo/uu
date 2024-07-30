// Arreglo que contiene las palabras para jugar
let arrayPalabras = ["GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA"];
// Arreglo que contiene las ayudas de cada palabra
let ayudas = [
    "Instrumento Musical",
    "Animal de la selva",
    "Es un color",
    "Nombre de mujer",
    "Hardware de computadora",
    "Es un Pais"
];
// Variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

// Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

// Variable que guarda el índice de la Palabra actual
let posActual;

// Arreglo que contiene la palabra actual con la que estoy jugando
let arrayPalabraActual = [];

// Cantidad de letras acertadas por cada jugada
let cantidadAcertadas = 0;

// Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

// Cantidad de palabras que debe acertar en cada jugada
let totalQueDebeAcertar;

// Función que carga la palabra nueva para jugar
function cargarNuevaPalabra() {
    // Aumento en uno cantidad de palabras jugadas y controlo si llego a su límite
    cantPalabrasJugadas++;
    if (cantPalabrasJugadas > 6) {
        // Volvemos a cargar el arreglo
        arrayPalabras = ["GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA"];
        ayudas = [
            "Instrumento Musical",
            "Animal de la selva",
            "Es un color",
            "Nombre de mujer",
            "Hardware de computadora",
            "Es un Pais"
        ];
    }

    // Selecciono una posición random
    posActual = Math.floor(Math.random() * arrayPalabras.length);

    // Tomamos la palabra nueva
    let palabra = arrayPalabras[posActual];
    // Cantidad de letras que tiene esa palabra
    totalQueDebeAcertar = palabra.length;
    // Coloco en 0 la cantidad acertadas hasta el momento
    cantidadAcertadas = 0;

    // Guardamos la palabra que está en formato string en un arreglo
    arrayPalabraActual = palabra.split('');

    // Limpiamos los contenedores que quedaron cargadas con la palabra anterior
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    // Cargamos la cantidad de divs (letras) que tiene la palabra
    for (i = 0; i < palabra.length; i++) {
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    // Selecciono todos los divs de la palabra
    divsPalabraActual = document.getElementsByClassName("letra");

    // Seteamos los intentos
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    // Cargamos la ayuda de la pregunta
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    // Elimino el elemento ya seleccionado del arreglo
    // splice(posActual,1): A partir de la posición posActual elimino 1 elemento
    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);

    // Enfoco el campo de entrada
    document.getElementById("inputLetra").focus();
}

// Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();

// Detecto la tecla que el usuario presiona
document.getElementById("inputLetra").addEventListener("input", event => {
    let letraIngresada = event.target.value.toUpperCase();
    event.target.value = ''; // Limpio el campo de entrada después de capturar la letra

    if (isLetter(letraIngresada)) {
        // Tomo las letras ya ingresadas hasta el momento
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        // Armo un arreglo con las letras ingresadas
        letrasIngresadas = letrasIngresadas.split('');

        // Controlo si la letra ingresada ya ha sido ingresada
        if (letrasIngresadas.lastIndexOf(letraIngresada) === -1) {
            // Variable bandera para saber si la letra ingresada está en la palabra a descubrir
            let acerto = false;

            // Recorro el arreglo que contiene la palabra para verificar si la palabra ingresada está
            for (i = 0; i < arrayPalabraActual.length; i++) {
                if (arrayPalabraActual[i] === letraIngresada) { // Acertó
                    divsPalabraActual[i].innerHTML = letraIngresada;
                    acerto = true;
                    // Aumento en uno la cantidad de letras acertadas
                    cantidadAcertadas++;
                }
            }

            // Controlo si acertó al menos una letra
            if (acerto) {
                // Controlamos si ya acertó todas
                if (totalQueDebeAcertar === cantidadAcertadas) {
                    // Asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
                    for (i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            } else {
                // No acertó, decremento los intentos restantes
                intentosRestantes--;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                // Controlamos si ya acabó todas las oportunidades
                if (intentosRestantes <= 0) {
                    for (i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintarError";
                    }
                }
            }

            // Agrega la letra ingresada a las letras ya ingresadas que se visualizan
            document.getElementById("letrasIngresadas").innerHTML += letraIngresada + " - ";
        }
    }
});

// Función que determina si un carácter es una letra
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
