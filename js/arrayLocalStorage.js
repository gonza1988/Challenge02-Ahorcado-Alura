var palabras = ["GATO", "PERRO", "LEON", "CABALLO", "BALLENA", "TIBURON", "ELEFANTE", "TUCAN", "ERIZO", "CONEJO", "TIGRE", "CONDOR", "ZEBRA", "COCODRILO"];

if (localStorage.getItem('myArray') == null) {
    localStorage.setItem('myArray', JSON.stringify(palabras));
}