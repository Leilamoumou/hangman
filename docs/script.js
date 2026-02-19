const wordDisplay = 
    document.querySelector(".word-display");
const keyboardDiv = 
    document.querySelector(".keyboard");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
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
const gameTimeLimit = 60;

//
//drawGALLOWS
const drawGallows = () => {
    ctx.beginPath();
    // base
    ctx.moveTo(10, 240);
    ctx.lineTo(190, 240);
    // vertical pole
    ctx.moveTo(50, 240);
    ctx.lineTo(50, 10);
    // horizontal beam
    ctx.moveTo(50, 10);
    ctx.lineTo(100, 10);
    // rope
    ctx.moveTo(100, 10);
    ctx.lineTo(100, 30);
    ctx.stroke();
};
const resetGame = () => {
  //Resetting all game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGallows();
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
      ? `NICE ಠ‿↼! You found the word:`
      : `LOSERRR (¬‿¬) ! The correct word was:`;
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
  }
   else {
    wrongGuessCount++;
    drawHangman(wrongGuessCount);
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
  if (e.key.length !== 1 || !e.key.match(/[a-z]/i)) return;

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
//drawing the hangman as you go

const drawParts = [
    () => { /* draw head (circle) */ 
      //start at y=50
      ctx.beginPath();
      ctx.arc(100, 50, 20, 0, Math.PI * 2); // centerX, centerY, radius
      ctx.stroke();
    },
    () => { /* draw body (line down) */
      ctx.beginPath();
      ctx.moveTo(100, 70); // starting the line below the head position
      ctx.lineTo(100, 150); // draws down
      ctx.stroke();
     },

    () => { /* draw left arm (line) */
      //indicating not following past one.
       ctx.beginPath();
       ctx.moveTo(100, 100);
       ctx.lineTo(50, 100);
       ctx.stroke();
     },
    () => { /* draw right arm (line) */
       ctx.beginPath();
       ctx.moveTo(100, 100);
       ctx.lineTo(150, 100);
       ctx.stroke();
     },
    () => { /* draw left leg (line) */ 

      ctx.beginPath();
       ctx.moveTo(100, 150);
       ctx.lineTo(50, 220);
       ctx.stroke();
    },
    () => { /* draw right leg (line) */ 

      ctx.beginPath();
       ctx.moveTo(100, 150);
       ctx.lineTo(150, 220);
       ctx.stroke();
    },
];
const drawHangman = (step) => {
    drawParts[step - 1]();
}