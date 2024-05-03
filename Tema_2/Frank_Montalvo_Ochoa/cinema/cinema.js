const N = 5; // Número de filas y columnas

function suggest(butacas, numeroAsientos) {
    if (numeroAsientos > N) {
        return [];
    }

    let sugerencias = [];
    let filas = [];
    for (let i = N - 1; i >= 0; i--) {
        for (let j = N - 1; j >= 0 && sugerencias.length < numeroAsientos; j--) {
            const butaca = butacas[i][j];
            if (butaca.estado === false) {
                filas.push(i);
                sugerencias.push(butaca.id);

                if (!mismaFila(filas)) {
                    j = N;
                    filas = [];
                    sugerencias = [];
                }
            }
            else {
                filas = [];
                sugerencias = [];
            }

        }
    }

    return (sugerencias.length < numeroAsientos) ? [] : sugerencias;
}


function mismaFila(fila) {
    if (fila.length === 0) {
        return true;
    }

    const primerElemento = fila[0];
    for (let i = 1; i < fila.length; i++) {
        if (fila[i] !== primerElemento) {
            return false;
        }
    }

    return true;
}

function reserve(butacas, reservas) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < reservas.length; k++) {
                if (butacas[i][j].id === reservas[k]) {
                    butacas[i][j].estado = true;
                }
            }
        }
    }
}

function print(butacas) {
    for (let i = 0; i < N; i++) {
        let fila = '';
        for (let j = 0; j < N; j++) {
            const butaca = butacas[i][j];
            fila += butaca.estado ? ` [${butaca.id < 10 ? `0${butaca.id}` : butaca.id}:X] ` : ` [${butaca.id < 10 ? `0${butaca.id}` : butaca.id}:-] `;
        }
        console.log(fila);
    }
}

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

// Inicializar la matriz
let butacas = setup();

//Butacas ocupadas
// Fila 1
butacas[0][2].estado = true;
butacas[0][3].estado = true;
// Fila 2
butacas[1][1].estado = true;
butacas[1][2].estado = true;
butacas[1][3].estado = true;
butacas[1][4].estado = true;
// Fila 3
butacas[2][2].estado = true;
// Fila 4
butacas[3][0].estado = true;
butacas[3][1].estado = true;
butacas[3][3].estado = true;
// Fila 5
butacas[4][2].estado = true;

const test1 = suggest(butacas, 6);
console.assert(test1.length === 0, '1) Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.');
console.log(test1);

const test2 = suggest(butacas, 3);
console.assert(test2.length === 0, '2) Si en ninguna fila hay suficientes asientos disponibles juntos , la función debe devolver un set vacío.');
console.log(test2);

print(butacas);

const test3 = suggest(butacas, 1);
console.assert(test3.length !== 0, '3) Si existe una fila con suficientes asientos disponibles juntos, la función debe devolver un set no vacío con los ids de los asientos.');
reserve(butacas, test3);
console.log(test3);

print(butacas);

const test4 = suggest(butacas, 2);
console.assert(test4.length !== 0, '4) Si existe una fila con suficientes asientos disponibles juntos, la función debe devolver un set no vacío con los ids de los asientos.');
reserve(butacas, test4);
console.log(test4);

print(butacas);

// Imprimir la matriz
// console.log(butacas);