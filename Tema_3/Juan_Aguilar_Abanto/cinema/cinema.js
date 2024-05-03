// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

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

    console.log("Butacas inicializadas");
    return butacas;
}

// Inicializar la matriz
let butacas = setup();


function suggest(asientos) {
    let asientoSugeridos = [];
    let sugeridosTemp = [];

    if (asientos > N) {
        return asientoSugeridos;
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j <= N - asientos; j++) {
            let sugerido = [];

            let todosDisponibles = true;
            for (let k = 0; k < asientos; k++) {
                if (butacas[i][j + k].estado) {
                    todosDisponibles = false;
                }
                sugerido.push(butacas[i][j + k].id);
            }

            if (todosDisponibles) {
                sugeridosTemp.push(sugerido.slice());
            }
        }
    }

    if (sugeridosTemp.length > 0) {
        asientoSugeridos = sugeridosTemp[0];
    }

    console.log(asientoSugeridos);

    return asientoSugeridos;
}

