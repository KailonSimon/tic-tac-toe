let gameOver = false;
const gameboard = (() => {
    const gameboardContainer = document.createElement('div');
    const mainDiv = document.querySelector('#main-div');
    gameboardContainer.id = 'gameboard-container';
    for (let i = 0; i < 9; i++) { 
        gameboardContainer.insertAdjacentHTML('beforeend', `<div class='gameboard-item' data-index='${i}'></div>`) //creates squares within gameboard
    };
    const assignSquare = (index, currentPlayer) => {
        let selectedSquare = document.querySelector(`[data-index="${index}"]`);
        selectedSquare.classList.add(`${currentPlayer}`);
    }
    const endGame = (winner) => {
        const gameOverModal = document.createElement('div');
        gameOverModal.classList.add('modal');
        const gameOverModalText = document.createElement('h2');
        gameOverModalText.textContent = `${winner.toUpperCase()} wins!`;
        const resetButton = document.createElement('button');
        resetButton.addEventListener('click', () => {
            window.location.reload();
        });
        resetButton.textContent = 'Reset game';
        resetButton.classList.add('reset-button');
        mainDiv.appendChild(gameOverModal);
        gameOverModal.append(gameOverModalText);
        gameOverModal.append(resetButton);
    }
    mainDiv.appendChild(gameboardContainer); //adds gameboard to main container
    return {
        assignSquare,
        endGame,
    }
})();
const gameController = (() => { 
    let currentTurn = 'x';

    const gameboardItemValues = ['', '', '', '', '', '', '', '', '']; //array of square values; show if square is occupied
    const _evaluateBoard = () => {
        for (let i = 0; i < 3; i++) { //check columns
            if (gameboardItemValues[i] && gameboardItemValues[i] == gameboardItemValues[i+3] && gameboardItemValues[i] == gameboardItemValues[i+6]) {
                gameOver = true;
                gameboard.endGame(currentTurn);
            }
        }
        for (let i = 0; i < 7; i+=3) { //check rows
            if (gameboardItemValues[i] && gameboardItemValues[i] == gameboardItemValues[i+1] && gameboardItemValues[i] == gameboardItemValues[i+2]) {
                gameOver = true;
                gameboard.endGame(currentTurn);
            }
        }
        if (gameboardItemValues[4]) { //check diagonals
            if (gameboardItemValues[4] == gameboardItemValues[0] && gameboardItemValues[4] == gameboardItemValues[8]) {
                gameOver = true;
                gameboard.endGame(currentTurn);
            } else if (gameboardItemValues[4] == gameboardItemValues[2] && gameboardItemValues[4] == gameboardItemValues[4]) {
                gameOver = true;
                gameboard.endGame(currentTurn);
            }
        }
    }
    const assignSquare = (index) => {
        if (gameboardItemValues[index] == '') {
            gameboardItemValues[index] = currentTurn;
            gameboard.assignSquare(index, currentTurn);
            _evaluateBoard();
            currentTurn == 'x' ? currentTurn = 'o' : currentTurn = 'x';
        } else {
            return
        }
    }
    return {
        assignSquare,
    }
})();
const displayController = (() => {
    const gameboardItems = document.querySelectorAll('.gameboard-item');
    for (let i = 0; i < gameboardItems.length; i++) { //evaluates game state with each iteration; iteration count based on number of squares
        gameboardItems[i].addEventListener('click', () => { //adds click event listener to each square
            if (!gameOver) {
                gameController.assignSquare(i);
            }
        });
    }
})();

