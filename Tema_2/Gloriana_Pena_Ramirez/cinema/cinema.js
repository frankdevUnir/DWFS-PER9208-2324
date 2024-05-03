// Definir el tamaño de la matriz de butacas
const N = 5; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

function suggest(numButacas) {
    let butacasSeleccionados = new Set(); // Set para almacenar la butacas selecciones

    for (let i = (butacas.length) - 1; i >= 0; i--) { //Buscando la mas lejos de la pantalla
        let fila = butacas[i];
        if (numButacas <= fila.length) { //Si la cantidad de asientos solicitados no supera el existente
            let libres = 0;

            for (let j = 0; j < fila.length; j++) {
                if (butacasSeleccionados.size !== numButacas) {
                    if (!fila[j].estado) {
                        libres++;
                        butacasSeleccionados.add(fila[j].id);
                    } else {
                        libres = 0;
                        butacasSeleccionados.clear();
                    }
                }
            }
        }
    }

    return butacasSeleccionados;
}

// Inicializar la matriz
var butacas = setup();

// Imprimir la matriz
console.log(butacas);
//Poner algunos asientos ocupados
butacas[4][0].estado=true;
butacas[4][1].estado=true;
butacas[4][2].estado=true;

//Imprimir sugerencia de butacas
console.log(suggest(3));

//No estoy segura que si no estan en la misma fila son permitdos
//console.log(suggest(2));