var botonguardarpalabra = document.querySelector("#Btnsave");
var masdeocho = document.querySelector("#masdeocho");
var textoconnumeros = document.querySelector("#textoconnumeros");
var menosdeuno = document.querySelector("#menosdeuno");
var acentos = document.querySelector("#noacentos");

var newword = document.querySelector("#ingresarpalabra");
newword.focus();

let numeros=["0","1","2","3","4","5","6","7","8","9"];
let noacentos=["á","é","í","ó","ú","ñ"];

botonguardarpalabra.addEventListener("click",function(){

    var errores = true;
    var palabraNueva = newword.value;

    for(let i = 0; i < palabraNueva.length;i++){

        for(let j = 0; j < numeros.length;j++){
            if(palabraNueva[i].includes(numeros[j])){
                textoconnumeros.classList.remove("invisible");
                errores = false;
                break;
            }
            else{
                textoconnumeros.classList.add("invisible");
            }
        }
    }

    for(let i = 0; i < palabraNueva.length;i++){

        for(let j = 0; j < noacentos.length;j++){
            if(palabraNueva[i].includes(noacentos[j])){
                acentos.classList.remove("invisible");
                errores = false;
                break;
            }
        }
    }

    if(palabraNueva.length > 8){
        masdeocho.classList.remove("invisible");
        errores = false;
    }
    else{
        masdeocho.classList.add("invisible");
    }

    if(palabraNueva.length <= 0){
        menosdeuno.classList.remove("invisible");
        masdeocho.classList.add("invisible");
        textoconnumeros.classList.add("invisible");
        errores = false;
    }
    else{
        menosdeuno.classList.add("invisible");
    }

    if(errores){
        guardarlocalstg(palabraNueva.toUpperCase());
        window.location.href = "./agregarPalabra.html";
    }    
})

function guardarlocalstg(contenido){
    sessionStorage.setItem("palabraNueva",contenido);
    
}


