document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const extractButton = document.getElementById("extractNumber");
  const resetButton = document.getElementById("resetGame");
  const extractedNumberDisplay = document.getElementById("extractedNumber");
  const cardsContainer = document.getElementById("cardsContainer");

  let numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  let extractedNumbers = [];
  let claimedPrizes = new Set();
  let cards = [];
  let usedNumbers = new Set(); // Per evitare numeri duplicati sulle cartelle

  function createBoard() {
    board.innerHTML = "";
    for (let i = 1; i <= 90; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = i;
      cell.id = `num-${i}`;
      board.appendChild(cell);
    }
  }

  function generateCard() {
    const columns = Array.from({ length: 9 }, (_, i) => {
      const min = i === 0 ? 1 : i * 10;
      const max = i === 8 ? 90 : i * 10 + 9;
      const colNums = [];
      while (colNums.length < 3) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!colNums.includes(num) && !usedNumbers.has(num)) {
          colNums.push(num);
          usedNumbers.add(num);
        }
      }
      return colNums.sort((a, b) => a - b);
    });

    const card = Array.from({ length: 3 }, () => Array(9).fill(""));

    for (let col = 0; col < 9; col++) {
      const nums = columns[col];
      nums.forEach((num, i) => {
        card[i][col] = num;
      });
    }

    for (let row of card) {
      let indices = [...Array(9).keys()];
      while (row.filter((n) => n !== "").length > 5) {
        const idx = indices.splice(
          Math.floor(Math.random() * indices.length),
          1
        )[0];
        row[idx] = "";
      }
    }

    return card;
  }

  function drawCards() {
    cardsContainer.innerHTML = "";
    cards.forEach((card, index) => {
      const title = document.createElement("h4");
      title.textContent = `Cartella ${index + 1}`;
      cardsContainer.appendChild(title);
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      card.forEach((row, r) => {
        row.forEach((cell, c) => {
          const cellDiv = document.createElement("div");
          cellDiv.classList.add("card-cell");
          if (cell !== "") {
            cellDiv.textContent = cell;
            cellDiv.id = `card-${index}-${r}-${c}`;
          }
          cardDiv.appendChild(cellDiv);
        });
      });
      cardsContainer.appendChild(cardDiv);
    });
  }

  function checkWinnings() {
    const prizeLevels = {
      2: "Ambo",
      3: "Terno",
      4: "Quaterna",
      5: "Cinquina",
    };

    let awardedPrizeTypes = new Set([...claimedPrizes]); // Copia i premi già assegnati

    cards.forEach((card, cardIndex) => {
      card.forEach((row, rowIndex) => {
        const matched = row.filter((n) => extractedNumbers.includes(n));
        const matchCount = matched.length;

        const prizeName = prizeLevels[matchCount];
        if (prizeName && !awardedPrizeTypes.has(prizeName)) {
          alert(
            `🎉 ${prizeName} sulla cartella ${cardIndex + 1}, riga ${
              rowIndex + 1
            }`
          );
          claimedPrizes.add(prizeName);
          awardedPrizeTypes.add(prizeName);
        }
      });

      const allNums = card.flat().filter((n) => n !== "");
      const tombolaKey = "Tombola";
      if (
        allNums.every((n) => extractedNumbers.includes(n)) &&
        !claimedPrizes.has(tombolaKey)
      ) {
        alert(`🎉🎉🎉 TOMBOLA sulla cartella ${cardIndex + 1}!`);
        claimedPrizes.add(tombolaKey);
      }
    });
  }

  extractButton.addEventListener("click", () => {
    if (numbers.length === 0) return;
    const i = Math.floor(Math.random() * numbers.length);
    const num = numbers.splice(i, 1)[0];
    extractedNumbers.push(num);

    extractedNumberDisplay.textContent = `Numero estratto: ${num}`;

    const boardCell = document.getElementById(`num-${num}`);
    if (boardCell) boardCell.classList.add("extracted");

    cards.forEach((card, ci) => {
      card.forEach((row, ri) => {
        row.forEach((n, ci2) => {
          if (n === num) {
            const cell = document.getElementById(`card-${ci}-${ri}-${ci2}`);
            if (cell) cell.classList.add("extracted");
          }
        });
      });
    });

    checkWinnings();
  });

  resetButton.addEventListener("click", () => {
    numbers = Array.from({ length: 90 }, (_, i) => i + 1);
    extractedNumbers = [];
    claimedPrizes = new Set();
    usedNumbers = new Set();
    extractedNumberDisplay.textContent = "Numero estratto: --";
    createBoard();
    cards = [generateCard(), generateCard(), generateCard()];
    drawCards();
  });

  createBoard();
  cards = [generateCard(), generateCard(), generateCard()];
  drawCards();
});
