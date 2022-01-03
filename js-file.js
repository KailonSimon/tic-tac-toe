const displayController = (() => {
    let currentTurn =  'x';
    const gameboardContainer = document.createElement('div');
    const mainDiv = document.querySelector('#main-div');
    gameboardContainer.id = 'gameboard-container';
    const gameboardItemValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    gameboardItemValues.forEach(value => {
        gameboardContainer.insertAdjacentHTML('beforeend', `<div class='gameboard-item' data-index='${value}'></div>`)
    });
    mainDiv.appendChild(gameboardContainer);
    const gameboardItems = document.querySelectorAll('.gameboard-item');
    gameboardItems.forEach(item => {
        item.addEventListener('click', e => {
            item.classList.contains('occupied') ? 
                console.log('square already occupied!')   
                : (item.classList.add('occupied'),
                item.classList.add(`occupied-${currentTurn}`),
                item.textContent = `${currentTurn.toUpperCase()}`,
                console.log(`Item ${item.dataset.index} selected by player ${currentTurn}`),
                currentTurn == 'x' ? currentTurn = 'o' : currentTurn = 'x');
            

        });
    });

})();

const Player = () => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName}
}
