class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.statusElement = document.getElementById('status');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        this.updateStatus();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.endGame(false);
        } else if (this.checkDraw()) {
            this.endGame(true);
        } else {
            this.switchPlayer();
            this.updateStatus();
        }
    }
    
    checkWin() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a] !== '' &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    endGame(draw) {
        this.gameActive = false;
        
        if (draw) {
            this.statusElement.textContent = "Game ended in a draw!";
        } else {
            this.statusElement.textContent = `Player ${this.currentPlayer} wins!`;
            this.highlightWinningCells();
        }
    }
    
    highlightWinningCells() {
        const winningCombination = this.winningCombinations.find(combination => {
            const [a, b, c] = combination;
            return this.board[a] !== '' &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
        
        if (winningCombination) {
            winningCombination.forEach(index => {
                this.cells[index].classList.add('winning');
            });
        }
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
    }
    
    restartGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateStatus();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
