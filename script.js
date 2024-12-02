const board = document.getElementById("board");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

let emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🍒", "🥝"];
let cards = []; // Stores the shuffled card values
let flippedCards = []; // Tracks the flipped cards
let matchedCards = []; // Tracks matched cards
let score = 0;
let timer = 0;
let timerInterval;

// Initialize the game
function initializeGame() {
    board.innerHTML = "";
    score = 0;
    timer = 0;
    flippedCards = [];
    matchedCards = [];
    updateScore();
    updateTimer();

    // Duplicate and shuffle emojis
    cards = shuffle([...emojis, ...emojis]);

    // Create card elements
    cards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });

    // Start the timer
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        updateTimer();
    }, 1000);
}

// Shuffle an array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Update the timer display
function updateTimer() {
    timerElement.textContent = `Time: ${timer}s`;
}

// Update the score display
function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

// Flip a card
function flipCard() {
    const index = this.dataset.index;
    const emoji = this.dataset.emoji;

    // Ignore clicks on already flipped or matched cards
    if (flippedCards.length >= 2 || matchedCards.includes(index) || flippedCards.includes(index)) return;

    this.textContent = emoji;
    this.classList.add("flipped");
    flippedCards.push(index);

    // Check for a match if two cards are flipped
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check if two flipped cards match
function checkMatch() {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = document.querySelector(`.card[data-index='${firstIndex}']`);
    const secondCard = document.querySelector(`.card[data-index='${secondIndex}']`);

    if (cards[firstIndex] === cards[secondIndex]) {
        matchedCards.push(firstIndex, secondIndex);
        score++;
        updateScore();

        // Check for game over
        if (matchedCards.length === cards.length) {
            clearInterval(timerInterval);
            alert(`You won! Final Score: ${score}, Time: ${timer}s`);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

// Restart the game
function restartGame() {
    initializeGame();
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", initializeGame);