//Il codice dentro questa funzione viene eseguito solo dopo che la pagina è completamente caricata. -> addEventListener("DOMContentLoaded")
// per evitare errori se cerchiamo di modificare elementi html prima che esistano
document.addEventListener("DOMContentLoaded", function () {
  // extractedNumberDisplay → Il testo che mostra il numero estratto.
  const board = document.getElementById("board");
  //extractButton -> Il bottone che estrae un numero.
  const extractButton = document.getElementById("extractNumber");
  // resetButton → Il bottone per resettare il gioco.
  const resetButton = document.getElementById("resetGame");
  // extractedNumberDisplay → Il testo che mostra il numero estratto.
  const extractedNumberDisplay = document.getElementById("extractedNumber");

  //numbers = Crea un array con i numeri da 1 a 90.
  // Array.from({ length: 90 }) → Crea un array di 90 elementi.
  // (_, i) => i + 1 → Riempie l'array con i numeri da 1 a 90.
  let numbers = Array.from({ length: 90 }, (_, i) => i + 1); // Array numeri da 1 a 90

  //Avremo potuto fare la stessa identica cosa con un ciclo for
  //Crea un Array vuoto
  // let numbers = [];
  //Usa un ciclo for per aggiungere i numeri da 1 a 90 con .push(i).
  //  for (let i = 1; i <= 90; i++) {
  // numbers.push(i);
  //  }

  let extractedNumbers = [];

  function createBoard() {
    board.innerHTML = ""; // Svuota la board prima di rigenerarla
    for (let i = 1; i <= 90; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = i;
      cell.setAttribute("id", `num-${i}`);
      board.appendChild(cell);
    }
  }

  createBoard(); // Genera la board all'inizio

  // Funzione per estrarre un numero
  extractButton.addEventListener("click", function () {
    if (numbers.length === 0) {
      extractButton.disabled = true;
      extractedNumberDisplay.textContent =
        "Tutti i numeri sono stati estratti!";
      return;
    }

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const extractedNumber = numbers.splice(randomIndex, 1)[0]; // Rimuove il numero estratto
    extractedNumbers.push(extractedNumber);

    extractedNumberDisplay.textContent = `Numero estratto: ${extractedNumber}`;

    // Evidenzia il numero estratto sulla tabella
    document
      .getElementById(`num-${extractedNumber}`)
      .classList.add("extracted");
  });

  // Funzione per resettare il gioco
  resetButton.addEventListener("click", function () {
    numbers = Array.from({ length: 90 }, (_, i) => i + 1); // Reset numeri
    extractedNumbers = [];
    extractedNumberDisplay.textContent = "Numero estratto: --";
    extractButton.disabled = false; // Riattiva il bottone di estrazione

    createBoard(); // Rigenera la board
  });
});
