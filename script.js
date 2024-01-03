const imagePaths = ['Letter_I.svg', 'Letter_B.svg', 'Letter_R.svg', 'Letter_A.svg', 'Letter_H.svg', 'Letter_I.svg', 'Letter_M.svg'];
const correctSequence = ['Letter_I.svg', 'Letter_B.svg', 'Letter_R.svg', 'Letter_A.svg', 'Letter_H.svg', 'Letter_I.svg', 'Letter_M.svg'];

let shuffledImages = [];
let selectedImages = [];
let score = 0;
let gameStarted = false;

function startGame() {
    selectedImages = [];
    score = 0;
    gameStarted = true;

    shuffledImages = shuffle(imagePaths.slice());

    displayImages();
    setTimeout(coverImages, 2000);
}

function displayImages() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.src = shuffledImages[index];
        card.classList.remove('flipped');
        card.onclick = () => selectCard(index);
    });
}

function resetGame() {
    // Reset the game state
    selectedImages = [];
    gameStarted = false;

    setTimeout(() => {
        displayImages();
        setTimeout(coverImages, 2000);
    }, 2000);

    document.getElementById('score-display').textContent = 'Score: 0';
}

function coverImages() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.src = 'cover.jpg'; 
        card.classList.remove('flipped');
        card.onclick = () => selectCard(index);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function arraysMatch(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function uncoverCard(index) {
    const card = document.querySelectorAll('.memory-card')[index];

    // Uncover the selected image to show the original vector image
    card.src = shuffledImages[index];
    selectedImages.push(shuffledImages[index]);

    // Check if the player's selection is correct
    if (arraysMatch(selectedImages, correctSequence)) {
        // Correct selection
        score += 20;
        document.getElementById('score-display').textContent = `Score: ${score}`;

        if (selectedImages.length === correctSequence.length) {
            score+=20;
            alert('You Win! You Guessed The Correct Order!'); 
            resetGame();
        }
    } else {
        alert(`Game Over! You Chose the Wrong Order! Your score is ${score}`);
        resetGame();
    }
}

function isInitialPhase() {
    // Check if the game is in the initial phase (first two seconds)
    return new Date() - startTime < 2000; // Adjust the value based on your timing
  }

  function restartGame() {
    score = 0; // Reset the score
    document.getElementById('score-display').textContent = 'Score: 0'; // Update the score display
    startGame(); // Restart the game
  }

function selectCard(index) {
    uncoverCard(index);
}

function resetCards() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card) => {
        card.classList.remove('flipped');
    });
}

function resetGame() {
    // Reset the game state
    selectedImages = [];
    gameStarted = false;

    // Reset the cards
    resetCards();

    // Reset the score display
    document.getElementById('score-display').textContent = 'Score: 0';

    // Display the original order of the name without shuffling
    const cards = document.querySelectorAll('.memory-card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].src = imagePaths[i];
    }
}
