// Game state variables
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let cells = [];
let statusElement = null;
let restartBtn = null;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Arrow function to initialize the game
const initializeGame = () => {
    cells = document.querySelectorAll('[data-cell]');
    statusElement = document.getElementById('status');
    restartBtn = document.getElementById('restartBtn');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
    
    restartBtn.addEventListener('click', () => restartGame());
    
    updateStatus();
};

// Arrow function to handle cell clicks
const handleCellClick = (index) => {
    if (board[index] !== '' || !gameActive) {
        return;
    }
    
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    
    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        switchPlayer();
        updateStatus();
    }
};

// Arrow function to check for win
const checkWin = () => {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' &&
               board[a] === board[b] &&
               board[a] === board[c];
    });
};

// Arrow function to check for draw
const checkDraw = () => {
    return board.every(cell => cell !== '');
};

// Arrow function to end the game
const endGame = (draw) => {
    gameActive = false;
    
    if (draw) {
        statusElement.textContent = "Game ended in a draw!";
    } else {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
    }
};

// Arrow function to highlight winning cells
const highlightWinningCells = () => {
    const winningCombination = winningCombinations.find(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' &&
               board[a] === board[b] &&
               board[a] === board[c];
    });
    
    if (winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('winning');
        });
    }
};

// Arrow function to switch players
const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Arrow function to update status
const updateStatus = () => {
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
};

// Arrow function to restart the game
const restartGame = () => {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });
    
    updateStatus();
};

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});
