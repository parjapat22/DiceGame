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

// temp variables
let totalScore, currentScore, activePlayer, playing;

// initialise the game
function init() {
  // initialise temp variables
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  // initialise scores
  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  // initial css states
  btnNew.classList.add("hidden");
  diceEl.classList.add("hidden");
  player1El.classList.add("player-active");
  player2El.classList.remove("player-active");
  player1El.classList.remove("player-winner");
  player2El.classList.remove("player-winner");

  // enable buttons
  btnRoll.disabled = false;
  btnHold.disabled = false;
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
}

// roll the dice
function rollDice() {
  if (playing) {
    // generating random number on dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // displaying rolled dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./img/dice-${diceNum}.png`;
    diceEl.classList.toggle("diceAnimation");

    // check for rolled dice number
    if (diceNum != 1) {
      currentScore += diceNum;

      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player if dice is 1
      switchPlayer();
    }
  }
}

// switch player if dice is 1 or hold button is clicked
function switchPlayer() {
  // reset the current score
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  // switch player
  activePlayer = activePlayer === 1 ? 2 : 1;

  // toggle background color of players
  player1El.classList.toggle("player-active");
  player2El.classList.toggle("player-active");
}

// hold score, check winner and switch player
function holdScore() {
  if (playing) {
    // add current score to the array
    totalScore[activePlayer - 1] += currentScore;

    // display total score
    document.getElementById(`score-${activePlayer}`).textContent =
      totalScore[activePlayer - 1];

    // check for winning player
    if (totalScore[activePlayer - 1] >= 50) {
      playing = false;

      // display new game button
      btnNew.classList.remove("hidden");

      // disable other buttons
      btnRoll.disabled = true;
      btnHold.disabled = true;
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");

      // hide dice
      diceEl.classList.add("hidden");

      document.getElementById(`current-${activePlayer}`).textContent = 0;

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
    } else {
      // switch player
      switchPlayer();
    }
  }
}

btnNew.addEventListener("click", init);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);

init();
