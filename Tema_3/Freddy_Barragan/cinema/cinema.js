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
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
// console.log(butacas);

function suggest (seats_to_reserve) {
    if (seats_to_reserve > N){
        console.log([]);
        return []
    }

    let most_consecutive_seats_available_per_line = []
    let reserved_seats = []

    //create an array with amount of the most consecutive seats available per line
    butacas.forEach(line => {
        let most_consecutive_seats = 0
        let consecutive_seats = 0

        line.forEach(seat => {

            if (seat.estado === false){
                consecutive_seats++
                if (most_consecutive_seats < consecutive_seats){
                    most_consecutive_seats = consecutive_seats
                }
            } else {
                consecutive_seats = 0
            } 
            
        })

        most_consecutive_seats_available_per_line.push(most_consecutive_seats)

        most_consecutive_seats = 0
    });

    //Checks if there are enough consecutive seats on any line
    let are_there_enough_consecutive_seats = false
    for (let i = 0; i < most_consecutive_seats_available_per_line.length && are_there_enough_consecutive_seats === false; i++) {
        if (most_consecutive_seats_available_per_line[i] >= seats_to_reserve){
            are_there_enough_consecutive_seats = true
        }
    }

    if (!are_there_enough_consecutive_seats){
        console.log([]);
        return []
    }

    //Assign the seats on an available line
    for (let i = N - 1 ; i >= 0 && reserved_seats.length < seats_to_reserve ; i--){
        if (most_consecutive_seats_available_per_line[i] >= seats_to_reserve) {
            for(let j = 0; j < N && reserved_seats.length < seats_to_reserve ; j++){
                if(butacas[i][j].estado === false){
                    reserved_seats.push(butacas[i][j].id)
                } else {
                    reserved_seats = []
                }
            }
        }
    }

    console.log('Asientos sugeridos: ',reserved_seats.toString());
    return reserved_seats

}