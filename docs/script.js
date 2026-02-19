const wordDisplay = 
    document.querySelector(".word-display");
const keyboardDiv = 
    document.querySelector(".keyboard");
const hangmanImage = 
    document.querySelector(".hangman-box img");
const guessesText = 
    document.querySelector(".guesses-text b");
const gameModal = 
    document.querySelector(".game-modal");
const playAgainBtn = 
    document.querySelector(".play-again");
const timerDisplay = 
    document.querySelector(".timer");

const codingQuiz = [
  {
    word: "variable",
    hint: "A placeholder for a value.",
  },
  {
    word: "function",
    hint: "A block of code that performs a specific task.",
  },
  {
    word: "loop",
    hint: "A programming structure that repeats a sequence of instructions until a specific condition is met.",
  },
  {
    word: "array",
    hint: "A data structure that stores a collection of elements.",
  },
  {
    word: "boolean",
    hint: "A data type that can have one of two values, true or false.",
  },
  {
    word: "conditional",
    hint: "A statement that executes a block of code if a specified condition is true.",
  },
  {
    word: "parameter",
    hint: "A variable in a method definition.",
  },
  {
    word: "algorithm",
    hint: "A step-by-step procedure or formula for solving a problem.",
  },
  {
    word: "debugging",
    hint: "The process of finding and  fixing errors in code.",
  },
  {
    word: "syntax",
    hint: "The rules that govern the structure of statements in a programming language.",
  },
];

let currentWord, correctLetters, wrongGuessCount, timerInterval;
const maxGuesses = 6;
const gameTimeLimit = 30;

const resetGame = () => {
  //Resetting all game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = 
  `https://media.geeksforgeeks.org//wp-content/uploads/20240215173028/0.png`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  clearInterval(timerInterval);
  startTimer();
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } =
    codingQuiz[Math.floor(Math.random() 
    * codingQuiz.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b")
  .innerText = hint;
  resetGame();
};

const startTimer = () => {
  let timeLeft = gameTimeLimit;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time left:
    ${Math.floor(timeLeft / 60)}:${
      timeLeft % 60 < 10 ? "0" : ""
    }${timeLeft % 60}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver(false);
    }
  }, 1000);
};
const gameOver = (isVictory) => {
  setTimeout(() => {
    clearInterval(timerInterval);
    const modalText = isVictory
      ? ` Yeah! You found the word:`
      : `You Loss! The correct word was:`;
    gameModal.querySelector(
      "p"
    ).innerHTML = 
    `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};
const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index]
        .innerText = letter;
        wordDisplay.querySelectorAll("li")[index]
        .classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    if (wrongGuessCount === 0) {
      hangmanImage.src = 
      `https://media.geeksforgeeks.org//wp-content/uploads/20240215173028/0.png`;
    }
    if (wrongGuessCount === 1) {
      hangmanImage.src = 
      `https://media.geeksforgeeks.org//wp-content/uploads/20240215173033/1.png`;
    }
    if (wrongGuessCount === 2) {
      hangmanImage.src = 
      
      `https://media.geeksforgeeks.org//wp-content/uploads/20240215173038/2.png`;
    }
    if (wrongGuessCount === 3) {
      hangmanImage.src = 
      `https://media.geeksforgeeks.org//wp-content/uploads/20240215172733/3.png`;
    }
    if (wrongGuessCount == 4) {
      hangmanImage.src = 
      `https://media.geeksforgeeks.org//wp-content/uploads/20240215173815/4.png`;
    }
    if (wrongGuessCount === 5) {
      hangmanImage.src = 
      `https://media.geeksforgeeks.org//wp-content/uploads/20240215173859/5.png`;
    }
    if (wrongGuessCount === 6) {
      hangmanImage.src =
      `https://media.geeksforgeeks.org//wp-content/uploads/20240215173931/6.png`;
    }
    // hangmanImage.src = 
    `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) 
  return gameOver(false);
  if (correctLetters.length === currentWord.length)
  return gameOver(true);
};

//Creating keyboard buttons 
//and adding event listerers
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
//keyboard implementation, press for keys- LM
document.addEventListener("keydown", (e) => {
    // e.key will give you the letter pressed
   // e.key
    //query for the button whose text matches the key pressed:
  //  document.querySelector(`button`)
     const pressedKey = e.key.toLowerCase();
    // find the button where innerText matches pressedKey
    // then call initGame with that button and the letter
    const BTN = Array.from(keyboardDiv.querySelectorAll("button")).find(btn => btn.innerText.toLowerCase() === pressedKey);
    //if button is on, not disabled,
    if (BTN && !BTN.disabled) {
//continue the game.
    initGame(BTN, pressedKey);
}
});
