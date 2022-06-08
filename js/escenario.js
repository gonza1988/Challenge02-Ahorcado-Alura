/* Variables */
var ctx;
var canvas;
var palabra;
var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
var colorTecla = "rgba(0, 0, 0, 0.836)";
var colorMargen = "white";
var inicioX = 200;
var inicioY = 260;
var lon = 48;
var margen = 25;
var pistaText = "";

/* Arreglos */
var teclas_array = new Array();
var letras_array = new Array();
/* var palabras_array = new Array();*/

/* Variables de control */
var aciertos = 0;
var errores = 0;

/* Palabras */

 var palabras = [ "GATO","PERRO","LEON","CABALLO","BALLENA","TIBURON","ELEFANTE","TUCAN","ERIZO","CONEJO","TIGRE","CONDOR","ZEBRA","COCODRILO"];
       
/* localStorage.setItem('myArray', JSON.stringify(palabras_array)); 

 function llamardatosstg() {
     var palabranueva = sessionStorage.getItem("palabraNueva");
     return palabranueva;
 } 

 var palabraaingresar = llamardatosstg();
 palabras_array.push(palabraaingresar); */

/* Variablesvar palabras = localStorage.getItem('myArray');
palabras = JSON.parse(palabras);*/

/* Objetos */
function Tecla(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaCajaLetra;
    this.dibujaLetra = dibujaLetraLetra;
}

/* Funciones */

/* Dibujar Teclas*/
function dibujaTecla() {
    ctx.fillStyle = colorTecla;
    ctx.strokeStyle = colorMargen;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

    ctx.fillStyle = "white";
    ctx.font = " 18px 'Grenze Gotisch'";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
}

/* Dibua la letra y su caja */
function dibujaLetraLetra() {
    var w = this.ancho;
    var h = this.alto;
    ctx.fillStyle = "white";
    ctx.font = " 40px 'Grenze Gotisch'";
    ctx.fillText(this.letra, this.x + w / 2 - 12, this.y + h / 2 + 14);
}
function dibujaCajaLetra() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.836)";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}

/* Distribuir nuestro teclado con sus letras respectivas al acomodo de nuestro array */
function teclado() {
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for (var i = 0; i < letras.length; i++) {
        letra = letras.substr(i, 1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        teclas_array.push(miLetra);
        x += lon + margen;
        col++;
        if (col == 10) {
            col = 0;
            ren++;
            if (ren == 2) {
                x = 280;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 60;
    }
}
