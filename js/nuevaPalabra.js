var botonguardarpalabra = document.querySelector("#Btnsave");
var masdeocho = document.querySelector("#masdeocho");
var textoconnumeros = document.querySelector("#textoconnumeros");
var menosdeuno = document.querySelector("#menosdeuno");
var acentos = document.querySelector("#noacentos");
var repetida = document.querySelector("#repetida");

var newword = document.querySelector("#ingresarpalabra");
newword.focus();

let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let noacentos = ["Á", "É", "Í", "Ó", "Ú", "Ñ"];
/*let criterio = /^[a-zA-Z]+$/; //solo se aceptan letras */

var palabras = localStorage.getItem('myArray');
palabras = JSON.parse(palabras);

botonguardarpalabra.addEventListener("click", function () {

    var errores = true;
    var palabraNueva = newword.value;
    palabraNueva = palabraNueva.toUpperCase();

    for (let i = 0; i < palabraNueva.length; i++) {

        for (let j = 0; j < numeros.length; j++) {
            if (palabraNueva[i].includes(numeros[j])) {
                textoconnumeros.classList.remove("invisible");
                newword.value = "";
                errores = false;
                break;
            }
            else {
                textoconnumeros.classList.add("invisible");
            }
        }
    }

    for (let i = 0; i < palabraNueva.length; i++) {

        for (let j = 0; j < noacentos.length; j++) {
            if (palabraNueva[i].includes(noacentos[j])) {
                acentos.classList.remove("invisible");
                newword.value = "";
                errores = false;
                break;
            }
        }
    }

    

    if (palabraNueva.length > 8) {
        masdeocho.classList.remove("invisible");
        newword.value = "";
        errores = false;
    }
    else {
        masdeocho.classList.add("invisible");
    }

    if (palabraNueva.length <= 0) {
        menosdeuno.classList.remove("invisible");
        masdeocho.classList.add("invisible");
        textoconnumeros.classList.add("invisible");
        newword.value = "";
        errores = false;
    }
    else {
        menosdeuno.classList.add("invisible");
    }

    if (palabras.indexOf(palabraNueva) > 0){
        repetida.classList.remove("invisible");
        newword.value = "";
        errores = false;

    }
    
    if (errores) {
        palabras.push(palabraNueva);
        localStorage.setItem('myArray', JSON.stringify(palabras));
        alert('se agrego "' + palabraNueva + '" a la lista');
        window.location.href = "./agregarPalabra.html";
    }

})

/*function guardarlocalstg(contenido){
    sessionStorage.setItem("palabraNueva",contenido);
    
}*/


