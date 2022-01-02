const gameboard = (() => {
    const gameboardSquares = document.querySelectorAll('.gameboard-item');    
    console.log(typeof gameboardSquares)
    gameboardSquares.forEach(square => {
        square.addEventListener('click', () => {
            square.classList.add('selected');
            square.textContent = '✗';
        });
    });
})();

const Player = () => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName}
}
