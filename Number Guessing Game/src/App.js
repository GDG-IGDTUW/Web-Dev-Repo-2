import logo from './logo.svg'; 
import './App.css'; 
import React, { useState } from 'react'; 

const NumberGuessingGame = () => {
  // Initializing state variables
  const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 10) + 1); // Generating a random number between 1 and 10
  const [guess, setGuess] = useState(''); // State for user's guess
  const [attempts, setAttempts] = useState(0); // State to track number of attempts
  const [hint, setHint] = useState(''); // State for hint msg
  const [message, setMessage] = useState(''); // State for feedback msg
  const [gameOver, setGameOver] = useState(false); // State to track if the game is over

  // Handle changes in the input field
  const handleGuessChange = (event) => {
    setGuess(event.target.value); 
  };

  // Generate hints based on the number and the user's guess
  const generateHint = (number, guess) => {
    let hintMessage = number % 2 === 0 ? 'The number is even.' : 'The number is odd.'; // Checking if the number is even or odd
    if (guess > number) {
      hintMessage += ' Try a smaller number.'; 
    } else if (guess < number) {
      hintMessage += ' Try a larger number.'; 
    }
    return hintMessage; 
  };

  // Handle the submission of the user's guess
  const handleGuessSubmit = () => {
    const parsedGuess = parseInt(guess, 10); 
    if (isNaN(parsedGuess)) {
      setMessage('Please enter a valid number.'); 
      return;
    }

    setAttempts(attempts + 1); 

    if (parsedGuess === numberToGuess) {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`); 
      setHint('');
      setGameOver(true);
    } else {
      if (attempts + 1 >= 3) {
        setMessage(`Game over! The number was ${numberToGuess}.`); // Providing game over message if attempts exceed 3
        setHint(''); 
        setGameOver(true); 
      } else {
        setMessage('Incorrect guess. Would you like a hint?'); // Providing feedback if the guess is incorrect
        setHint(''); 
      }
    }
  };

  // Handle the user's request for a hint
  const handleHintRequest = () => {
    const parsedGuess = parseInt(guess, 10); 
    if (!isNaN(parsedGuess)) {
      const newHint = generateHint(numberToGuess, parsedGuess); 
      setHint(newHint); 
    }
  };

  // Handle the game restart
  const handleRestart = () => {
    setNumberToGuess(Math.floor(Math.random() * 10) + 1); 
    setGuess('');
    setAttempts(0); 
    setHint(''); 
    setMessage(''); 
    setGameOver(false); 
  };

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <p>I'm thinking of a number between 1 and 10. Can you guess it?</p>
      <input 
        type="text" 
        value={guess} 
        onChange={handleGuessChange} 
        placeholder="Enter your guess" // Placeholder text for the input field
        disabled={gameOver} // Disabling input if the game is over
      />
      <button onClick={handleGuessSubmit} disabled={gameOver}>Submit Guess</button> 
      <p>{message}</p> 
      {message && !gameOver && <button onClick={handleHintRequest}>Request Hint</button>} 
      {hint && <p>{hint}</p>} 
      {gameOver && <button onClick={handleRestart}>Restart Game</button>} 
    </div>
  );
};

export default NumberGuessingGame; // Exporting the component
