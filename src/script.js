//All possible values that player can choose
const gameOptions = ["rock", "paper", "scissors"];

//Count scores
let humanScore = 0;
let computerScore = 0;

function getRandomNumber(n) {
  return Math.floor(Math.random() * (n + 1));
}

function getComputerChoice() {
  return gameOptions[getRandomNumber(2)];
}

function getHumanChoice() {
  let userChoice = prompt("Choose your value (rock | paper | scissors): ");
  return userChoice.trim().toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log("It's a draw.");
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log(
      `Player wins. ${
        humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)
      } beats ${computerChoice}!`
    );
    humanScore++;
  } else {
    console.log(
      `Computer wins. ${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      } beats ${humanChoice}!`
    );
    computerScore++;
  }
}

function playGame(rounds) {
  let winner;

  for (let i = 0; i < rounds; i++) {
    playRound(getHumanChoice(), getComputerChoice());
  }

  if (humanScore == computerScore) {
    console.log("It's draw!");
  } else {
    winner = humanScore > computerScore ? "Player" : "Computer";
    console.log(`${winner} won game! Score: ${humanScore} - ${computerScore}`);
  }
}

// playGame(5);

const inputs = document.querySelectorAll(`input[type="radio"]`);

inputs.forEach((input) =>
  input.addEventListener("input", (e) => {
    inputs.forEach((input) => {
      const parentEl = input.closest(".input-checked-parent");
      if (input.checked) {
        parentEl.classList.remove("bg-purple-600");
        parentEl.classList.add("bg-teal-200");
      } else {
        parentEl.classList.remove("bg-teal-200");
        parentEl.classList.add("bg-purple-600");
      }
    });
  })
);

const playerSelectValueForm = document.querySelector("#player-select-form");

playerSelectValueForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("test");
});
