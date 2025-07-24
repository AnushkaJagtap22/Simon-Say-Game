const buttonColors = ["red", "blue", "green", "yellow"];
let gameSequence = [];
let userSequence = [];
let started = false;
let level = 0;

const levelTitle = document.querySelector("#level-title");

// Start game on keypress
document.addEventListener("keydown", () => {
  if (!started) {
    startGame();
  }
});

// Start or restart the game
function startGame() {
  level = 0;
  gameSequence = [];
  started = true;
  levelTitle.innerText = `Level ${level}`;
  nextSequence();
}

// Handle next level
function nextSequence() {
  userSequence = [];
  level++;
  levelTitle.innerText = `Level ${level}`;

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);

  const btn = document.querySelector(`#${randomColor}`);
  flashButton(btn);
}

// Flash button in game sequence
function flashButton(button) {
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 300);
}

// Animate button on user click
function animatePress(button) {
  button.classList.add("userflash");
  setTimeout(() => {
    button.classList.remove("userflash");
  }, 150);
}

// Handle user click
function handleUserClick(e) {
  if (!started) return;

  const clickedColor = e.target.id;
  userSequence.push(clickedColor);

  animatePress(e.target);
  checkAnswer(userSequence.length - 1);
}

// Check user's answer
function checkAnswer(currentLevel) {
  if (userSequence[currentLevel] === gameSequence[currentLevel]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

// Handle wrong input
function gameOver() {
  document.body.classList.add("game-over");
  levelTitle.innerText = `Game Over! Score: ${level - 1}. Press any key to restart.`;
  started = false;

  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 300);
}

// Add event listeners to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", handleUserClick);
});
