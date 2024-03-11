"use strict";

// select player and score elements
const player1El = document.querySelector(".player-1");
const player2El = document.querySelector(".player-2");
const score1El = document.querySelector("#score-1");
const score2El = document.getElementById("score-2");
const current1El = document.getElementById("current-1");
const current2El = document.getElementById("current-2");

// select dice element
const diceEl = document.querySelector(".dice");

// select button elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let totalScore, currentScore, activePlayer, playing;

// starting conditions
function init() {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  diceEl.classList.add("hidden");
  player1El.classList.add("player-active");
  player2El.classList.remove("player-active");
  player1El.classList.remove("player-winner");
  player2El.classList.remove("player-winner");
}

init();

// rolling dice
function rollDice() {
  if (playing) {
    // generating random number on dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // displaying dice of generated random
    diceEl.classList.remove("hidden");
    diceEl.classList.toggle("diceAnimation");
    diceEl.src = `./img/dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;

      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
}

// switch player
function switchPlayer() {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle("player-active");
  player2El.classList.toggle("player-active");
}

// hold score, check winner and switch player
function holdScore() {
  if (playing) {
    // add current score to total score
    totalScore[activePlayer - 1] += currentScore;

    document.getElementById(`score-${activePlayer}`).textContent =
      totalScore[activePlayer - 1];

    // check for winning player
    if (totalScore[activePlayer - 1] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
    } else {
      // switch player
      switchPlayer();
    }
  }
}

btnNew.addEventListener("click", init);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);
