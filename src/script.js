const playerSelectValueForm = document.querySelector("#player-select-form");

const inputs = document.querySelectorAll(`input[type="radio"]`);

const modalWelcome = document.querySelector("#welcome");
const modalWelcomeCloseBtn = document.querySelector("#modal-welcome-close");

const modalPlayerSelect = document.querySelector("#player-select");

const startGameBtn = document.querySelector("#start-game");
const resetGameBtn = document.querySelector("#reset-game");

const playerScoreEl = document.querySelector("#player .score");
const computerScoreEl = document.querySelector("#computer .score");

const playerGameOptionEl = document.querySelector("#player .game-option");
const computerGameOptionEl = document.querySelector("#computer .game-option");

//All possible values that player can choose
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

//Count scores
let playerScore = 0;
let computerScore = 0;

function getRandomNumber(n) {
  return Math.floor(Math.random() * (n + 1));
}

function getComputerOption() {
  return gameOptions[getRandomNumber(2)];
}

function playRound(playerOption, computerOption) {
  playerGameOptionEl.innerHTML = playerOption.icon;
  computerGameOptionEl.innerHTML = computerOption.icon;

  if (playerOption.name === computerOption.name) {
    console.log("It's a draw.");
  } else if (
    (playerOption.name === "rock" && computerOption.name === "scissors") ||
    (playerOption.name === "paper" && computerOption.name === "rock") ||
    (playerOption.name === "scissors" && computerOption.name === "paper")
  ) {
    console.log(
      `Player wins. ${
        playerOption.name.charAt(0).toUpperCase() + playerOption.name.slice(1)
      } beats ${computerOption.name}!`
    );
    playerScore++;
  } else {
    console.log(
      `Computer wins. ${
        computerOption.name.charAt(0).toUpperCase() +
        computerOption.name.slice(1)
      } beats ${playerOption.name}!`
    );
    computerScore++;
  }

  playerScoreEl.innerHTML = playerScore;
  computerScoreEl.innerHTML = computerScore;
}

// playGame(5);

function toggleWelcomeModal() {
  modalWelcome.classList.toggle("hidden");
}

function toggleSelectModal() {
  modalPlayerSelect.classList.toggle("hidden");
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;

  playerGameOptionEl.innerHTML = "";
  computerGameOptionEl.innerHTML = "";
}

//Events

playerSelectValueForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const checkedInput = Array.from(inputs).find((input) => input.checked).value;
  const playerSelectedOption = gameOptions.find(
    (item) => item.name === checkedInput
  );

  playRound(playerSelectedOption, getComputerOption());
  toggleSelectModal();
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
  e.target.classList.add("hidden");

  toggleSelectModal();

  resetGameBtn.classList.remove("hidden");
});

resetGameBtn.addEventListener("click", resetGame);
