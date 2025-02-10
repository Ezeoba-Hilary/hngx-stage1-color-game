// Get DOM elements
const colorBox = document.getElementById('colorBox');
const newGameBtn = document.getElementById('newGameButton');
const gameStatus = document.getElementById('gameStatus');
const scoreCounter = document.getElementById('score');
const colorsContainer = document.getElementById('colorOptions');

// Initialize game variables
let targetColor;
let score = 0;

// Function to generate a random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random value between 0-255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`; // Returns a string like "rgb(123, 45, 67)"
}

// Function to start a new round of the game
function startGame() {
    // Generate a new target color
    targetColor = generateRandomColor();

    // Reset the colorBox to black and display a question mark icon
    colorBox.style.backgroundColor = 'rgb(63, 68, 73)';
    colorBox.innerHTML = '<i class="fas fa-question"></i>'; // Font Awesome question mark

    // Update game status message
    gameStatus.textContent = 'Guess the color in the box above!';

    // Generate multiple color options
    const options = [];
    for (let i = 0; i < 6; i++) {
        options.push(generateRandomColor());
    }

    // Replace a random option with the correct color
    const randomIndex = Math.floor(Math.random() * options.length);
    options[randomIndex] = targetColor;

    // Clear previous options
    colorsContainer.innerHTML = '';

    // Create buttons for each color option
    options.forEach(color => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option');
        optionButton.style.backgroundColor = color;
        optionButton.addEventListener('click', () => handleGuess(color));
        colorsContainer.appendChild(optionButton);
    });

    // Update score display
    scoreCounter.textContent = score;
}

// Function to handle user's guess
function handleGuess(guessColor) {
    if (guessColor === targetColor) {
        // Player guessed correctly
        gameStatus.textContent = 'Great! Keep at it!';
        score +=5; // Increase score by 5 points
        colorBox.style.backgroundColor = targetColor; // Show correct color in colorBox

        // Delay and start a new round automatically
        setTimeout(startGame, 1000);
    } else {
        // Player guessed wrong
        gameStatus.textContent = 'Wrong guess! Try again.';
    }

    // Update score display
    scoreCounter.textContent = score;
}

// Event listener for "New Game" button
newGameBtn.addEventListener('click', () => {
    score = 0;  // Reset score to 0
    startGame();
});

// Start the game when the page loads
startGame();
