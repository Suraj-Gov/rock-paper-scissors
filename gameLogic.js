const options = document.querySelectorAll(".option-button");
//const player = document.querySelector(".player");
const result = document.querySelector(".result");
//const computer = document.querySelector(".computer");
const optionArr = ["rock", "paper", "scissors"];
const playerImg = document.getElementById("player-image");
const computerImg = document.getElementById("computer-image");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const star = "⭐";
const retry = document.querySelector(".retry-button");
// retry.addEventListener("click", function () {
//   setTimeout(() => {
//     newGame();
//   }, 350);
// });

retry.addEventListener("transitionend", () => {
  newGame();
});

newGame();

function newGame() {
  playerScore.innerText = "Score:";
  computerScore.innerText = "Score:";
  retry.style.display = "none";
  result.innerText = "";
  for (let i = 0; i < options.length; i++) {
    options[i].disabled = false;
  }
  computerImg.src = "./Blank.svg";
  playerImg.src = "./Blank.svg";
}

let playerChoice, computerChoice;

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function (event) {
    inputHandle(event.target.value);
  });
}

function inputHandle(option) {
  computerChoice = optionArr[generateComputerOption() - 1];
  playerChoice = option;
  setImage(playerChoice, playerImg, true);
  setImage(computerChoice, computerImg, false);
  logicHandle(playerChoice, computerChoice);
}

function setImage(choice, img, isFlip) {
  switch (choice) {
    case "rock":
      img.src = "./Rock.svg";
      break;
    case "paper":
      img.src = "./Paper.svg";
      break;
    case "scissors":
      img.src = "./Scissors.svg";
      break;
  }
  if (isFlip) {
    img.classList.add("slide-in-blurred-left");
    img.addEventListener("animationend", () => {
      img.classList.remove("slide-in-blurred-left");
    });
  }
  img.classList.add("slide-in-blurred-right");
  img.addEventListener("animationend", () => {
    img.classList.remove("slide-in-blurred-right");
  });
}

function generateComputerOption() {
  return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
}

function logicHandle(playerChoice, computerChoice) {
  if (playerChoice == "rock") {
    switch (computerChoice) {
      case "rock": //result.innerText = "Draw";
        break;
      case "paper":
        computerScore.innerText += star;
        break;
      case "scissors":
        playerScore.innerText += star;
        break;
    }
  } else if (playerChoice == "paper") {
    switch (computerChoice) {
      case "rock":
        playerScore.innerText += star;
        break;
      case "paper": //result.innerText = "Draw";
        break;
      case "scissors":
        computerScore.innerText += star;
        break;
    }
  } else if (playerChoice == "scissors") {
    switch (computerChoice) {
      case "rock":
        computerScore.innerText += star;
        break;
      case "paper":
        playerScore.innerText += star;
        break;
      case "scissors": //result.innerText = "Draw";
        break;
    }
  }
  checkWinner();
}

function checkWinner() {
  if (playerScore.innerText.length >= 9) {
    result.innerText = "You Won";
    for (let i = 0; i < options.length; i++) {
      options[i].disabled = true;
    }
  } else if (computerScore.innerText.length >= 9) {
    result.innerText = "You Lose";
    for (let i = 0; i < options.length; i++) {
      options[i].disabled = true;
    }
    retry.style.display = "inline-block";
    retry.innerText = "RETRY";
  }
}
