const gameBoard = (() => {
    //private
    const gameBoardContainer = document.querySelector('#game-board-container');

    function generateBoard() {
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div')
            div.setAttribute('class', 'grid-div')
            div.setAttribute('id', `grid-div-${i + 1}`)
            gameBoardContainer.appendChild(div);
        }
    }


    //public
    return {
        generateBoard
    };
})();

gameBoard.generateBoard();