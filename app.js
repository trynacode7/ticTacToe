// Selecting all relevant elements
const gridBoxes = document.querySelectorAll(".grid-box");
const resetGameBtn = document.querySelector("#reset-game-btn");
const newGameBtn = document.querySelector("#new-game-btn");
const messageOverlay = document.querySelector(".message-overlay");
const gameMessage = document.querySelector("#game-message");

let isPlayerOTurn = true;
let moveCount = 0;

const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize game state
const initializeGame = () => {
  isPlayerOTurn = true;
  moveCount = 0;
  resetBoard();
  hideMessageOverlay();
};

// Check winner and display results
const checkWinner = () => {
  for (const pattern of WINNING_PATTERNS) {
    const [pos1, pos2, pos3] = pattern;
    const value1 = gridBoxes[pos1].innerText;
    const value2 = gridBoxes[pos2].innerText;
    const value3 = gridBoxes[pos3].innerText;

    if (value1 && value1 === value2 && value1 === value3) {
      displayWinner(value1);
      return true;
    }
  }
  return false;
};

// Handle game draw scenario
const handleGameDraw = () => {
  gameMessage.innerText = "It's a Draw!";
  showMessageOverlay();
  disableGridBoxes();
};

// Handle player's move
const handlePlayerMove = (box) => {
  box.innerText = isPlayerOTurn ? "O" : "X";
  box.disabled = true;
  isPlayerOTurn = !isPlayerOTurn;
  moveCount++;

  const winnerExists = checkWinner();

  if (!winnerExists && moveCount === 9) {
    handleGameDraw();
  }
};

// Attach event listeners to grid boxes
gridBoxes.forEach((box) => {
  box.addEventListener("click", () => handlePlayerMove(box));
});

// Display the winner
const displayWinner = (winner) => {
  gameMessage.innerText = `Congratulations, ${winner} Wins!`;
  showMessageOverlay();
  disableGridBoxes();
};

// Disable grid boxes after game ends
const disableGridBoxes = () => {
  gridBoxes.forEach((box) => (box.disabled = true));
};

// Enable grid boxes to start a new game
const enableGridBoxes = () => {
  gridBoxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Reset the board for a new game
const resetBoard = () => {
  enableGridBoxes();
  hideMessageOverlay();
};

// Show message overlay with game status
const showMessageOverlay = () => {
  messageOverlay.classList.remove("hidden");
};

// Hide message overlay when resetting
const hideMessageOverlay = () => {
  messageOverlay.classList.add("hidden");
};

// Event listeners for reset and new game buttons
newGameBtn.addEventListener("click", initializeGame);
resetGameBtn.addEventListener("click", initializeGame);

// Initialize the game on load
initializeGame();
