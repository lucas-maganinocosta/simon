let colors = ['red', 'green', 'blue', 'yellow'];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let score = 0;
let playerName = "";

const startButton = document.getElementById('start-btn');
const message = document.getElementById('message');
const colorElements = colors.map(color => document.getElementById(color));
const scoreDisplay = document.getElementById('current-score');
const playerDisplay = document.getElementById('player-display');
const playerInfoSection = document.getElementById('player-info');
const scoreboardSection = document.getElementById('scoreboard');
const submitNameButton = document.getElementById('submit-name-btn');
const playerNameInput = document.getElementById('player-name');
const controlsSection = document.getElementById('controls');

function playColor(color) {
  const element = document.getElementById(color);
  element.classList.add('active');
  setTimeout(() => element.classList.remove('active'), 500);
}

function playSequence() {
  let delay = 0;
  gameSequence.forEach((color, index) => {
    setTimeout(() => playColor(color), delay);
    delay += 600;
  });
  setTimeout(() => enablePlayerInput(), delay);
}

function nextLevel() {
  level++;
  playerSequence = [];
  message.textContent = `Level ${level}`;

  const nextColor = colors[Math.floor(Math.random() * 4)];
  gameSequence.push(nextColor);

  setTimeout(() => playSequence(), 1000);

  // Incrementa a pontuação a cada nível
  score++;
  scoreDisplay.textContent = score;
}

function enablePlayerInput() {
  colorElements.forEach(element => {
    element.addEventListener('click', handlePlayerInput);
  });
}

function disablePlayerInput() {
  colorElements.forEach(element => {
    element.removeEventListener('click', handlePlayerInput);
  });
}

function handlePlayerInput(event) {
  const clickedColor = event.target.id;
  playColor(clickedColor);
  playerSequence.push(clickedColor);

  if (clickedColor !== gameSequence[playerSequence.length - 1]) {
    message.textContent = `Game Over! Final Score: ${score}`;
    disablePlayerInput();
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    disablePlayerInput();
    nextLevel();
  }
}

// Função para iniciar o jogo após o nome do jogador ser submetido
submitNameButton.addEventListener('click', () => {
  playerName = playerNameInput.value.trim();
  if (playerName === "") {
    alert("Please enter your name to start the game.");
    return;
  }
  
  playerDisplay.textContent = playerName;
  playerInfoSection.style.display = 'none';
  scoreboardSection.style.display = 'block';
  controlsSection.style.display = 'block';
});

startButton.addEventListener('click', () => {
  gameSequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
  scoreDisplay.textContent = score;
  message.textContent = 'Game started!';
  nextLevel();
});
