const gameBoard = document.getElementById("gameBoard");

// 8 paires pour 16 cartes
const symbols = ["🍎","🍌","🍒","🍇","🍉","🥝","🍍","🍓"];
let cards = [...symbols, ...symbols]; // duplique les symboles
cards = cards.sort(() => Math.random() - 0.5); // mélange aléatoire

// Générer les cartes sur le plateau
cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("carte");
    card.dataset.symbol = symbol;
    card.textContent = ""; // texte vide au début
    card.addEventListener("click", () => revealCard(card));
    gameBoard.appendChild(card);
});

let firstCard = null;
let secondCard = null;

function revealCard(card) {
    if (card.textContent || secondCard) return; // ignore si déjà révélée ou en attente

    card.textContent = card.dataset.symbol;
    card.classList.add("revealed");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        // paires trouvées, on les garde révélées
        resetTurn();
    } else {
        // pas une paire, cacher après 1 seconde
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
}
