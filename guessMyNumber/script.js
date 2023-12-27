"use strict";

// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "Correct Number!";
// (document.querySelector(".message").textContent = message);
// document.querySelector(".guess").value;
// console.log(document.querySelector(".guess").value);
let score,
  secretNum,
  highScore = 0;
const displayMessage = (message) =>
  (document.querySelector(".highscore").textContent = highScore);
// initial values function
const initialValue = function () {
  document.querySelector("body").style.backgroundColor = "#222";
  secretNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".number").textContent = "?";
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = "";
};
initialValue();

// Check btn Event handling funtion
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  document.querySelector(".guess").value = "";

  console.log(guess, typeof guess);
  if (!guess) {
    // document.querySelector(".message").textContent = "No number!";
    displayMessage("No number!");
  }
  if (guess === secretNum) {
    // document.querySelector(".message").textContent = "Correct Number!";
    displayMessage("Correct Number!");
    // store current score into high score if it is highter than current one
    if (highScore < score) {
      document.querySelector(".highscore").textContent = score;
    }
    document.querySelector(".number").textContent = secretNum;
    // change background color Green
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
  } else if (
    document.querySelector(".message").textContent !== "Correct Number!"
  )
    if (score > 1) {
      // document.querySelector(".message").textContent =
      //   guess < secretNum ? "Too low.." : "Too High..";
      displayMessage(guess < secretNum ? "Too low.." : "Too High..");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector(".message").textContent = "we lost the game..";
      displayMessage("we lost the game..");
      document.querySelector(".score").textContent = 0;
    }
});
// Agin btn click event handling
document.querySelector(".again").addEventListener("click", initialValue);
