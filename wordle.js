// script.js
let words = [
    "apple", "table", "chair", "plant", "grass", "candy", "light", "water", "paint", "music",
    "happy", "smile", "heart", "phone", "pizza", "bread", "honey", "beach", "cloud", "grass",
    "ocean", "dream", "river", "movie", "queen", "woman", "child", "house", "horse", "clock",
    "earth", "money", "peace", "sugar", "piano", "robot", "space", "tiger", "mouse", "sweat",
    "lemon", "melon", "peach", "wheat", "globe", "knife", "ruler", "light", "teeth", "sight",
    "sound", "music", "night", "plant", "stone", "grass", "beard", "shirt", "pants", "shoes",
    "socks", "glove", "clock", "phone", "piano", "water", "chair", "table", "dream", "bread",
    "horse", "earth", "cloud", "space", "queen", "happy", "smile", "heart", "child", "woman",
    "river", "movie", "robot", "sugar", "peace", "phone", "grass", "paint", "music", "light"
];

let secretWord;
let attemptsLeft = 6;
let guessedLetters = [];
let wrongGuesses = [];

function generateRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function resetGame() {
    secretWord = generateRandomWord();
    attemptsLeft = 6;
    guessedLetters = [];
    wrongGuesses = [];
    document.getElementById("attempts-left").textContent = attemptsLeft;
    document.getElementById("message").textContent = "";
    document.getElementById("guess-input").disabled = false;
    document.getElementById("guess-input").value = "";
    updateWordDisplay();
    resetFeedbackBoxes();
    updateGuessList();
    hidePlayAgainButton();
}

function resetFeedbackBoxes() {
    let feedbackBoxes = document.querySelectorAll(".feedback-box");
    for (let box of feedbackBoxes) {
        box.style.backgroundColor = "transparent";
    }
}

function updateWordDisplay() {
    const wordDisplay = document.querySelector(".word-display");
    wordDisplay.innerHTML = "";
    for (let i = 0; i < secretWord.length; i++) {
        wordDisplay.innerHTML += `<div class="letter">${guessedLetters.includes(secretWord[i]) ? secretWord[i] : "_"}</div>`;
    }
}

function updateGuessList() {
    const guessList = document.getElementById("guess-list");
    guessList.innerHTML = "";
    wrongGuesses.forEach(guess => {
        const guessItem = document.createElement("div");
        guessItem.classList.add("guess-list-item");
        guessItem.textContent = guess;
        guessList.appendChild(guessItem);
    });
}

function checkGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 5) {
        document.getElementById("message").textContent = "Please enter a 5-letter word!";
        return;
    }

    if (guessedLetters.includes(guess)) {
        document.getElementById("message").textContent = "You already guessed that word!";
        return;
    }

    guessedLetters = guess.split('');
    updateWordDisplay();

    let correctPositionIndices = [];
    let correctLettersIndices = [];

    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guess[i]) {
            correctPositionIndices.push(i);
        }
        if (secretWord.includes(guess[i])) {
            correctLettersIndices.push(i);
        }
    }

    let feedbackBoxes = document.querySelectorAll(".feedback-box");
    for (let i = 0; i < feedbackBoxes.length; i++) {
        if (correctPositionIndices.includes(i)) {
            feedbackBoxes[i].style.backgroundColor = "green";
        } else if (correctLettersIndices.includes(i)) {
            feedbackBoxes[i].style.backgroundColor = "orange";
        } else {
            feedbackBoxes[i].style.backgroundColor = "transparent";
        }
    }

    if (correctPositionIndices.length === 5) {
        document.getElementById("message").textContent = `Congratulations! You guessed the word ${secretWord}!`;
        document.getElementById("guess-input").disabled = true;
        showPlayAgainButton();
    } else {
        attemptsLeft--;
        document.getElementById("attempts-left").textContent = attemptsLeft;
        if (attemptsLeft === 0) {
            document.getElementById("message").textContent = `Out of attempts! The secret word was ${secretWord}.`;
            document.getElementById("guess-input").disabled = true;
            showPlayAgainButton();
        } else {
            wrongGuesses.push(guess);
            updateGuessList();
        }
    }

    guessInput.value = "";
}

function showPlayAgainButton() {
    document.getElementById("play-again-button").style.display = "block";
}

function hidePlayAgainButton() {
    document.getElementById("play-again-button").style.display = "none";
}

resetGame();
