var numeroSecreto = Math.floor(Math.random() * 100) + 1;
var intentos = 0;
var puntosT = 0;
var guesses = [];
function adivinarNumero() {
    const guess = parseInt(document.getElementById("guess").value);

    if (isNaN(guess) || guess < 1 || guess > 100 ) {
        document.getElementById("mensaje").textContent =
            "Por favor, ingresa un número válido entre 1 y 100.";
    } else if (guesses.includes(guess)) {
        document.getElementById("mensaje").textContent =
            "Por favor, no ingreses el mismo numero";
    } else{
        document.getElementById("msg-guesses").style.display = "";
        intentos++;
        document.getElementById("intentos").textContent = intentos;
        guesses.push(guess);

        if (guess === numeroSecreto) {
            document.getElementById(
                "mensaje"
            ).textContent = `¡Felicidades! Adivinaste el número en ${intentos} intentos.`;
            document.getElementById("msg-guesses").style.display = "none";
            document.getElementById("reinicio").style.display = "flex";
            document.getElementById("button").style.display = "none";
            document.getElementById("guess").style.display = "none";
            document.getElementById("peach").src = "assets/gif/kiss.webp";
            document.getElementById("peach").style.transition = "transform 0.5s ease";
            document.getElementById("peach").style.height = "7rem";
            document.getElementById("mario").src = "assets/gif/bowser-crying.gif";
            document.getElementById("mario").style.width = "5rem";
            document.getElementById("mario").style.paddingLeft = "179px";
            document.getElementById("bowser").style.display = "none";
            if (intentos < 2) {
                puntosT += 119;
            }
            intentos = 0;
            puntosT += 100;
            document.getElementById("cantidad").textContent = puntosT;
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
        } else {
            let mensaje = "";

            if (numeroSecreto > guess) {
                mensaje = "El numero es mayor.";
            } else {
                mensaje = "El numero es menor.";
            }
            document.getElementById("mensaje").textContent = mensaje;

            document.getElementById(
                "msg-guesses"
            ).textContent = `Tus intentos anteriores son: ${guesses}`;

            let distancia = guess - numeroSecreto;
            // Movimiento de Mario hacia Peach
            if (distancia < 10 && intentos < 3) {
                puntosT +=Math.abs(Math.floor((Math.abs(distancia)-100)/intentos));
            } else if (distancia<30 && intentos<5) {
                puntosT +=Math.abs(Math.floor((Math.abs(distancia)-100)/intentos));
                    }
                    else {
                        puntosT +=Math.abs(Math.floor((Math.abs(distancia)-120)/intentos));
                    }
            document.getElementById("cantidad").textContent = puntosT;
            if (intentos < 10) {

                const maxMovement = 179; // La máxima distancia que Mario puede moverse hacia la derecha

                let movimiento = (Math.abs(distancia) * 340) / maxMovement;// Ajusta el movimiento dentro del contenedor
                let paddingM = parseFloat(document.getElementById("mario").style.paddingLeft);
                let movimientoC = Math.abs(distancia) * 2 + paddingM;
                // Limita el movimiento dentro del contenedor
                movimiento = Math.min(movimiento, maxMovement);

                if (distancia > 0) {
                    movimiento = Math.min(movimientoC, maxMovement);
                    document.getElementById("mario").style.paddingLeft = `${movimiento}px`;
                }
                else
                    document.getElementById("mario").style.paddingLeft = `${movimiento}px`;


                // document.getElementById("mario").style.transform = `translateX(${movimiento}PX)`;


            } else {
                // Bowser aparece y Mario muere
                document.getElementById("msg-guesses").style.display = "none";
                document.getElementById("peach").src = "assets/gif/bowser-dancing.gif";
                document.getElementById("bowser").style.display = "none";
                document.getElementById("mensaje").textContent =
                    "¡Bowser se llevó a Peach y Mario murió!";
                document.getElementById("button").style.display = "none";
                document.getElementById("guess").style.display = "none";
                document.getElementById("mario").style.display = "none";
                document.getElementById("reinicio").style.display = "flex";
                numeroSecreto = Math.floor(Math.random() * 100) + 1;
            }

        }
    }
}
function reiniciar() {
    document.getElementById("reinicio").style.display = "none";
    intentos = 0;
    guesses = [];
    document.getElementById("button").style.display = "inline";
    document.getElementById("guess").style.display = "inline";
    //Vuelven a aparecer mario y peach
    document.getElementById("peach").src = "assets/gif/princess-peach.gif";
    document.getElementById("mario").src = "assets/gif/mj.gif";
    document.getElementById("mario").style.paddingLeft = "179px";
    document.getElementById("mario").style.display = "";
    document.getElementById("bowser").style.display = "";
    document.getElementById("mensaje").textContent = "";
    document.getElementById("mario").style.width = "2.5rem";
    puntosT = 0;
    document.getElementById("cantidad").textContent = puntosT;
}
