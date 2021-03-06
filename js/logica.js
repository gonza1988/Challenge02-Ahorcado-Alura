/*var palabraaingresar = llamardatosstg();

palabras_array.push(palabraaingresar); */

var palabras = localStorage.getItem('myArray');
palabras = JSON.parse(palabras);

/* aqui obtenemos nuestra palabra aleatoriamente y la dividimos en letras */
function pintaPalabra() {
    var p = Math.floor(Math.random() * palabras.length);
    palabra = palabras[p];
    console.log(palabra);
    console.log(palabras);

    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 160;
    var lon = 50;
    var x = (w - (lon + margen) * len) / 4;
    for (var i = 0; i < palabra.length; i++) {
        letra = palabra.substr(i, 1);
        miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        letras_array.push(miLetra);
        x += lon + margen;
    }
}

/* dibujar cadalzo y partes del pj segun sea el caso */
function horca(errores) {
    ctx.fillStyle = "rgba(182, 10, 10, 0.903)";
    ctx.font = "60px 'Grenze Gotisch'";
    var imagen = new Image();
    var imagen2 = new Image();
    imagen.src = "img/enfermera" + errores + ".png";
    imagen2.src = "img/muerte.png";
    imagen.onload = function () {
        ctx.drawImage(imagen, 908, 57, 230, 230);

        if(errores==4){
            ctx.fillText("¡Ultimo intento!", 420, 100);
        }
        if (errores == 5) {
            ctx.drawImage(imagen2, 1010, 90, 230, 230);
        }

    }

}

/* ajustar coordenadas */
function ajusta(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx - posCanvas.left;
    var y = yy - posCanvas.top;
    return { x: x, y: y }
}

/* Detecta tecla clickeada y la compara con las de la palabra ya elegida al azar */
function selecciona(e) {
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < teclas_array.length; i++) {
        tecla = teclas_array[i];
        if (tecla.x > 0) {
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)) {
                break;
            }
        }
    }
    if (i < teclas_array.length) {
        for (var i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            if (letra == tecla.letra) { /* comparamos y vemos si acerto la letra */
                caja = letras_array[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (bandera == false) { /* Si falla aumenta los errores y checa si perdio para mandar a la funcion gameover */
            errores++;
            horca(errores);
            if (errores == 5) gameOver(errores);
        }
        /* Borra la tecla que se a presionado */
        ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
        tecla.x - 1;
        /* checa si se gano y manda a la funcion gameover */
        if (aciertos == palabra.length) gameOver(errores);
    }
}


/* Borramos las teclas y la palabra con sus cajas y mandamos msj segun el caso si se gano o se perdio */
function gameOver(errores) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    ctx.font = "50px 'Grenze Gotisch'";
    if (errores < 5) {
        ctx.fillText("Muy bien, la palabra es: ", 110, 280);
    } else {
        ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
    }

    ctx.font = "80px 'Grenze Gotisch'";
    lon = (canvas.width - (palabra.length * 48)) / 2;
    ctx.fillText(palabra, lon, 380);
    horca(errores);
}

/* Detectar si se a cargado nuestro contexto en el canvas, iniciamos las funciones necesarias para jugar o se le manda msj de error segun sea el caso */
window.onload = function () {
    canvas = document.getElementById("pantalla");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        if (ctx) {
            teclado();
            pintaPalabra();
            horca(errores);
            canvas.addEventListener("click", selecciona, false);
        } else {
            alert("Error al cargar el contexto!");
        }
    }
}

