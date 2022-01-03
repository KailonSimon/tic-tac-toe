const gameboard = (() => { //View
    const gameboardContainer = document.createElement('div');
    const mainDiv = document.querySelector('#main-div');
    gameboardContainer.id = 'gameboard-container';
    for (let i = 0; i < 9; i++) { 
        gameboardContainer.insertAdjacentHTML('beforeend', `<div class='gameboard-item'></div>`) //creates squares within gameboard
    };
    mainDiv.appendChild(gameboardContainer); //adds gameboard to main container
})();

const displayController = (() => { //Controller
    let currentTurn =  'x';
    const gameboardItems = document.querySelectorAll('.gameboard-item'); //returns array of game squares
    const gameboardItemValues = ['', '', '', '', '', '', '', '', '']; //array of square values; show if square is occupied
    for (let i = 0; i < gameboardItems.length; i++) { //evaluates game state with each iteration; iteration count based on number of squares
        gameboardItems[i].addEventListener('click', e => { //adds click event listener to each square
            switch (gameboardItems[i].classList.contains('occupied')) { //evaluates if square has already been selected
                case true: 
                    console.log('square already occupied!');
                    break;
                case false: 
                    gameboardItems[i].classList.add(`occupied`, `occupied-${currentTurn}`) //marks square as occupied
                    gameboardItemValues[i] = currentTurn; //assigns player selection to gameboard value array
                    console.log(gameboardItemValues);
                    if (gameboardItemValues[0] == 'x' && gameboardItemValues[1] == 'x' && gameboardItemValues[2] == 'x') { //initial x player win state
                        console.log(`${currentTurn} is the winner!`);
                    } else {                
                        currentTurn == 'x' ? currentTurn = 'o' : currentTurn = 'x'; //changes current player turn
                    }
                    break;
            } 
        })
    }
})();

