const playerSelectValueForm = document.querySelector("#player-select-form");
const inputs = document.querySelectorAll(`input[type="radio"]`);

const modalWelcome = document.querySelector("#welcome");
const modalWelcomeCloseBtn = document.querySelector("#modal-welcome-close");

const modalPlayerSelect = document.querySelector("#player-select");

const modalResults = document.querySelector("#result");
const modalResultsHeading = document.querySelector("#result h3");

const startGameBtn = document.querySelector("#start-game");
const resetGameBtn = document.querySelector("#reset-game");

const playerScoreEl = document.querySelector("#player .score");
const computerScoreEl = document.querySelector("#computer .score");

const playerGameOptionEl = document.querySelector("#player .game-option");
const computerGameOptionEl = document.querySelector("#computer .game-option");

const currentRoundInfo = document.querySelector("#currentRound");

// All possible values that player can choose
const gameOptions = [
  {
    name: "rock",
    icon: '<i class="fas fa-hand-rock text-purple-600 text-8xl"></i>',
  },
  {
    name: "paper",
    icon: '<i class="fas fa-hand-paper text-purple-600 text-8xl"></i>',
  },
  {
    name: "scissors",
    icon: '<i class="fas fa-hand-scissors text-purple-600 text-8xl"></i>',
  },
];

// Count scores
let playerScore = 0;
let computerScore = 0;

let isGameEnded = false;
let winner = "";

/**
 * Get a random number between 0 and n
 * @param {number} n - The upper limit
 * @returns {number} - A random number between 0 and n
 */
function getRandomNumber(n) {
  return Math.floor(Math.random() * (n + 1));
}

/**
 * Get a random option for the computer
 * @returns {object} - A random game option
 */
function getComputerOption() {
  return gameOptions[getRandomNumber(2)];
}

/**
 * Reset the styles of the input elements
 */
function resetInputs() {
  inputs.forEach((input) => {
    input.checked = false;
    const parentEl = input.closest(".input-checked-parent");
    const icon = parentEl.querySelector("i");

    parentEl.classList.remove("bg-teal-200");
    icon.classList.remove("text-teal-200");

    icon.classList.add("text-purple-600");
    parentEl.classList.add("bg-purple-600");
  });
}

/**
 * Play a round of the game
 * @param {object} playerOption - The player's selected option
 * @param {object} computerOption - The computer's selected option
 */
function playRound(playerOption, computerOption) {
  if (isGameEnded === false) {
    playerGameOptionEl.innerHTML = playerOption.icon;
    computerGameOptionEl.innerHTML = computerOption.icon;

    if (playerOption.name === computerOption.name) {
      currentRoundInfo.textContent = "It's a draw!";
    } else if (
      (playerOption.name === "rock" && computerOption.name === "scissors") ||
      (playerOption.name === "paper" && computerOption.name === "rock") ||
      (playerOption.name === "scissors" && computerOption.name === "paper")
    ) {
      currentRoundInfo.textContent = `Player wins round. ${
        playerOption.name.charAt(0).toUpperCase() + playerOption.name.slice(1)
      } beats ${computerOption.name}!`;

      playerScore++;
    } else {
      currentRoundInfo.textContent = `Computer wins round. ${
        computerOption.name.charAt(0).toUpperCase() +
        computerOption.name.slice(1)
      } beats ${playerOption.name}!`;

      computerScore++;
    }

    playerScoreEl.innerHTML = playerScore;
    computerScoreEl.innerHTML = computerScore;

    if (playerScore === 5 || computerScore === 5) {
      isGameEnded = true;
      winner = playerScore === 5 ? "Player" : "Computer";

      startGameBtn.classList.add("hidden");
      showResults(`${winner} won the game.`);
    }
  }
}

/**
 * Show the result modal with a message
 * @param {string} msg - The message to display
 */
function showResults(msg) {
  modalResultsHeading.textContent = msg;
  modalResults.classList.remove("hidden");
}

/**
 * Toggle the welcome modal visibility
 */
function toggleWelcomeModal() {
  modalWelcome.classList.toggle("hidden");
}

/**
 * Toggle the player selection modal visibility
 */
function toggleSelectModal() {
  modalPlayerSelect.classList.toggle("hidden");
}

/**
 * Reset the game to its initial state
 */
function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;

  playerGameOptionEl.innerHTML = gameOptions[0].icon;
  computerGameOptionEl.innerHTML = gameOptions[1].icon;

  currentRoundInfo.textContent = "";

  resetInputs();

  isGameEnded = false;
  winner = "";
  startGameBtn.classList.remove("hidden");
  modalResults.classList.add("hidden");
}

/**
 * Change the input style
 */
function changeInputStyle() {
  parentEl.classList.remove("bg-teal-200");
  icon.classList.remove("text-teal-200");

  icon.classList.add("text-purple-600");
  parentEl.classList.add("bg-purple-600");
}

// Events

playerSelectValueForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const checkedInput = Array.from(inputs).find((input) => input.checked);
  if (!checkedInput) {
    alert("Please select an option before submitting.");
    return;
  }

  const playerSelectedOption = gameOptions.find(
    (item) => item.name === checkedInput.value
  );

  playRound(playerSelectedOption, getComputerOption());

  toggleSelectModal();

  resetInputs();
});

inputs.forEach((input) =>
  input.addEventListener("input", (e) => {
    inputs.forEach((input) => {
      const parentEl = input.closest(".input-checked-parent");
      const icon = parentEl.querySelector("i");

      if (input.checked) {
        parentEl.classList.remove("bg-purple-600");
        icon.classList.remove("text-purple-600");

        parentEl.classList.add("bg-teal-200");
        icon.classList.add("text-teal-200");
      } else {
        parentEl.classList.remove("bg-teal-200");
        icon.classList.remove("text-teal-200");

        icon.classList.add("text-purple-600");
        parentEl.classList.add("bg-purple-600");
      }
    });
  })
);

modalWelcomeCloseBtn.addEventListener("click", toggleWelcomeModal);

startGameBtn.addEventListener("click", (e) => {
  e.target.textContent = "Next round";
  toggleSelectModal();
});

resetGameBtn.addEventListener("click", resetGame);
