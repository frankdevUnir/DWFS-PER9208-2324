let url = "https://api.chucknorris.io/jokes/random";
let chuckFactElement = document.querySelector('.chuck-fact');

function flipCard() {
    let cardContainer = document.querySelector('.card-container');
    cardContainer.classList.toggle('flip');

    // Verificar si el dorso está visible
    if (cardContainer.classList.contains('flip')) {
        // Añadir un retraso de 100ms antes de realizar la llamada a la API
        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    chuckFactElement.textContent = json.value;
                })
                .catch(error => console.error("Error al obtener el hecho de Chuck Norris:", error));
        }, 50);
    } else {
        // Ocultar y vaciar el texto cuando se muestra el frente
        chuckFactElement.textContent = "";
    }
}
