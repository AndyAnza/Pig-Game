'use strict';
const diceImg = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const currentScoreLabel0 = document.getElementById('current--0');
const totalScoreLabel0 = document.getElementById('score--0');
const currentScoreLabel1 = document.getElementById('current--1');
const totalScoreLabel1 = document.getElementById('score--1');
const focusPlayer1 = document.querySelector('.player--0');
const focusPlayer2 = document.querySelector('.player--1');

let player1 = {
  name: 'Player 1',
  acc: 0,
  curr: 0,
  totalScore: 0,
};
let player2 = {
  name: 'Player 2',
  acc: 0,
  curr: 0,
  totalScore: 0,
};
let player1Turn = true;
let currentPlayer = player1;
diceImg.style.opacity = 0;

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const updateCurrentScore = (dice, currentPlayer) => {
  if (dice > 1) {
    currentPlayer.curr = dice;
    currentPlayer.acc = currentPlayer.acc + currentPlayer.curr;
  } else {
    restartCurrent(currentPlayer);
    restartTotal(currentPlayer);
    switchPlayer();
  }
  if (player1Turn) {
    currentScoreLabel0.textContent = currentPlayer.acc;
  } else {
    currentScoreLabel1.textContent = currentPlayer.acc;
  }
};

const updateTotalScore = currentPlayer => {
  currentPlayer.totalScore = currentPlayer.totalScore + currentPlayer.acc;
  console.log(
    'totalScore:',
    currentPlayer.totalScore,
    'acc:',
    currentPlayer.acc
  );
  if (player1Turn) {
    totalScoreLabel0.textContent = currentPlayer.totalScore;
  } else if (!player1Turn) {
    totalScoreLabel1.textContent = currentPlayer.totalScore;
  }
};

const switchPlayer = () => {
  if (player1Turn === true) {
    player1Turn = false;
    currentPlayer = player2;
    focusPlayer1.classList.remove('player--active');
    focusPlayer2.classList.add('player--active');
  } else {
    player1Turn = true;
    currentPlayer = player1;
    focusPlayer2.classList.remove('player--active');
    focusPlayer1.classList.add('player--active');
  }
  console.log(player1Turn, currentPlayer);
};

const restartCurrent = currentPlayer => {
  currentPlayer.acc = 0;
  if (player1Turn) {
    currentScoreLabel0.textContent = currentPlayer.acc;
  } else {
    currentScoreLabel1.textContent = currentPlayer.acc;
  }
};

const restartTotal = currentPlayer => {
  currentPlayer.totalScore = 0;
  if (player1Turn) {
    totalScoreLabel0.textContent = currentPlayer.totalScore;
  } else {
    totalScoreLabel1.textContent = currentPlayer.totalScore;
  }
};

const rollDice = () => {
  const dice = randomInt(1, 6);
  console.log(dice);
  diceImg.style.opacity = 100;
  diceImg.src = `dice-${dice}.png`;
  updateCurrentScore(dice, currentPlayer);
};

const holdScore = () => {
  updateTotalScore(currentPlayer);
  restartCurrent(currentPlayer);
  // winner;
  if (currentPlayer.totalScore >= 10) {
    alert(`${currentPlayer.name} is the winner 🎖`);
    restartGame();
  } else {
    switchPlayer();
  }
};

const restartScores = () => {
  restartCurrent(currentPlayer);
  restartTotal(currentPlayer);
};

const restartGame = () => {
  currentPlayer = player1;
  player1.acc = 0;
  currentScoreLabel0.textContent = player1.acc;
  player2.acc = 0;
  currentScoreLabel1.textContent = player2.acc;
  player1.totalScore = 0;
  totalScoreLabel0.textContent = player1.totalScore;
  player2.totalScore = 0;
  totalScoreLabel1.textContent = player2.totalScore;
  focusPlayer1.classList.add('player--active');
  focusPlayer2.classList.remove('player--active');
  diceImg.style.opacity = 0;
};

// EVENT LISTENERS
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', restartGame);
console.log(`player1Turn: ${player1Turn}`);
