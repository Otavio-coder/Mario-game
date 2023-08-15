const player = document.getElementById('player');
const platforms = document.querySelectorAll('.platform');

let isJumping = false;
let jumpHeight = 150;
let playerBottom = 0;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            if (jumpHeight > 0) {
                playerBottom += 5;
                jumpHeight -= 5;
                player.style.bottom = playerBottom + 'px';
            } else {
                clearInterval(jumpInterval);
                fall();
            }
        }, 20);
    }
}

function fall() {
    let fallInterval = setInterval(() => {
        if (playerBottom > 0) {
            playerBottom -= 5;
            player.style.bottom = playerBottom + 'px';
        } else {
            clearInterval(fallInterval);
            isJumping = false;
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
        jump();
    }
});

// ... (código anterior) ...

const barrel = document.getElementById('barrel');
const item = document.getElementById('item');

let barrelPosition = 800; // Initial position outside the game area
let itemPosition = 600;   // Initial position outside the game area

function moveBarrel() {
    barrelPosition -= 3; // Adjust speed as needed
    barrel.style.left = barrelPosition + 'px';

    if (barrelPosition <= -50) {
        barrelPosition = 800; // Reset barrel position when it goes off-screen
        barrel.style.left = barrelPosition + 'px';
    }
}

function moveItem() {
    itemPosition -= 2; // Adjust speed as needed
    item.style.left = itemPosition + 'px';

    if (itemPosition <= -30) {
        itemPosition = 600; // Reset item position when it goes off-screen
        item.style.left = itemPosition + 'px';
    }
}

// Game loop
function gameLoop() {
    moveBarrel();
    moveItem();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// ... (código anterior) ...

let score = 0;
const scoreDisplay = document.createElement('div');
scoreDisplay.classList.add('score');
document.body.appendChild(scoreDisplay);

function checkCollisions() {
    // Player and barrel collision
    if (
        playerBottom <= 60 && // Adjust collision threshold
        playerBottom + 50 >= 50 &&
        barrelPosition <= 30
    ) {
        resetGame();
    }

    // Player and item collision
    if (
        playerBottom <= 60 && // Adjust collision threshold
        playerBottom + 50 >= 50 &&
        itemPosition <= 30
    ) {
        score += 10;
        scoreDisplay.innerText = 'Score: ' + score;
        itemPosition = 600;
        item.style.left = itemPosition + 'px';
    }
}

function resetGame() {
    alert('Game Over! Your score: ' + score);
    location.reload(); // Reload the page to restart the game
}

// Game loop
function gameLoop() {
    moveBarrel();
    moveItem();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

gameLoop();

