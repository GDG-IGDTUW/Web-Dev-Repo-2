let targetNumber = generateRandomNumber(1, 100);
let attempts = 0;
let hintsUsed = 0;
const maxHints = 8;

document.getElementById("guess-btn").addEventListener("click", handleGuess);
document.getElementById("hint-btn").addEventListener("click", provideHint);
document.getElementById("restart-btn").addEventListener("click", restartGame);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = parseInt(guessInput.value);
  const feedback = document.getElementById("feedback");

  if (isNaN(guess)) {
    feedback.textContent = "❌ Please enter a valid number.";
    return;
  }

  attempts++;
  document.getElementById("attempts").textContent = `Attempts: ${attempts}`;

  if (guess === targetNumber) {
    feedback.textContent = `🎉 Correct! You guessed it in ${attempts} attempts.`;
    endGame();
  } else if (Math.abs(guess - targetNumber) === 1) {
    feedback.textContent = "🔥 Too close! Just off by 1!";
  } else if (guess < targetNumber) {
    feedback.textContent = "⬇️ Too low! Try again.";
  } else {
    feedback.textContent = "⬆️ Too high! Try again.";
  }
}

function provideHint() {
  if (hintsUsed >= maxHints) {
    endGame("😢 You used all 8 hints! Game over.");
    return;
  }

  hintsUsed++;
  const hintsList = document.getElementById("hints-list");
  const hint = generateHint();

  const hintItem = document.createElement("li");
  hintItem.textContent = hint;
  hintsList.appendChild(hintItem);
}

function generateHint() {
  const hintType = ["even_odd", "range", "divisible", "proximity"][
    Math.floor(Math.random() * 4)
  ];

  if (hintType === "even_odd") {
    return `The number is ${targetNumber % 2 === 0 ? "even" : "odd"}.`;
  } else if (hintType === "range") {
    const offset = Math.floor(Math.random() * 10) + 1;
    return `The number is between ${Math.max(1, targetNumber - offset)} and ${Math.min(100, targetNumber + offset)}.`;
  } else if (hintType === "divisible") {
    const divisor = [2, 3, 5][Math.floor(Math.random() * 3)];
    return `The number is ${
      targetNumber % divisor === 0 ? "" : "not "
    }divisible by ${divisor}.`;
  } else if (hintType === "proximity") {
    const proximityHint = targetNumber > 50 ? "greater than 50" : "less than or equal to 50";
    return `The number is ${proximityHint}.`;
  }
}

function restartGame() {
  targetNumber = generateRandomNumber(1, 100);
  attempts = 0;
  hintsUsed = 0;
  document.getElementById("attempts").textContent = "Attempts: 0";
  document.getElementById("feedback").textContent = "";
  document.getElementById("guess-input").value = "";
  document.getElementById("hints-list").innerHTML = "";
}

function endGame(message) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message || "🎉 Game over! You won!";
  document.getElementById("guess-btn").disabled = true;
  document.getElementById("hint-btn").disabled = true;
}

