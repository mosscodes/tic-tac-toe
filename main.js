// this factory needs to be wrapped in a module to become private. wrap the whole game into a game module?

// factory
const playerFactory = (marker, winnerValue) => {
    return {marker, winnerValue}
}

const playerOne = playerFactory('X', 1)
const playerTwo = playerFactory('O', -1)


// module
const gameBoard = (() => {

    const gameBoardContainer = document.querySelector('#game-board-container');

    function generateBoard() {
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div')
            div.setAttribute('class', 'grid-div')
            div.setAttribute('id', `grid-div-${i + 1}`)
            div.innerText = "";
            div.addEventListener('click', function() {gameflow.updateBoard(i+1);});
            gameBoardContainer.appendChild(div);
        }
        const buttonContainer = document.querySelector('#start-button-container')
        const startButton = document.createElement('button')
        startButton.setAttribute('id', 'start-button')
        startButton.innerText = "Start Game!";
        buttonContainer.appendChild(startButton)
    }

    return {
        generateBoard,
    };
})();

// module
const gameflow = (() => {

    let boardObj = {}
    for (let i = 0; i < 9; i++)
        boardObj[`${i+1}`] = 0;

    function gameStart() {

        // add html button
        // add event listeners to all grid divs
        // instead of adding line 23 at generate board, add updateBoard functionality on gamestart
        // div.addEventListener('click', function() {gameflow.updateBoard(i+1);});

        // currentTurn = playerOne
        // change start button to say 'restart'
        // if button.innertext = 'restart, clear board, boardObj, currentTurn = playerOne, turnCount = 0


    }

    function updateBoard(index) {
        if (boardObj[index] === 0) {
            boardObj[index] = currentTurn.winnerValue;
            document.querySelector(`#grid-div-${index}`).innerText = currentTurn.marker;
            changeTurn()
            turnCount++
        }
    }

    let turnCount = 0

    // winning combinations: 123, 456, 789, 147, 258, 369, 159, 753
    // minimum placements until winCheck needs to be executed: 5 placements minimum to win
    // 9 placements to draw

    // add functionality to remove the ability to updateboard
    function winCheck(boardObj) {
        if (turnCount >= 5) {
            // check rows
            for (let i = 1; i <= 9; i = i + 3) {
                if (boardObj[i] + boardObj[i+1] + boardObj[i+2] === 3) {
                    alert("X Wins!")
                }
                else if (boardObj[i] + boardObj[i+1] + boardObj[i+2] === -3) {
                    alert("O Wins!")
                }
            }
            // check columns
            for (let i =1; i <= 3; i++) {
                if (boardObj[i] + boardObj[i+3] + boardObj[i+6] === 3) {
                    alert("X Wins!")
                }
                else if (boardObj[i] + boardObj[i+3] + boardObj[i+6] === -3) {
                    alert("O Wins!")
                }
            }
            // check diagonals
            if (boardObj[1] + boardObj[5] + boardObj[9] === 3) {
                alert("X Wins!")
            }
            else if (boardObj[1] + boardObj[5] + boardObj[9] === -3) {
                alert("O Wins!")
            }
            else if (boardObj[3] + boardObj[5] + boardObj[7] === 3) {
                alert("X Wins!")
            }
            else if (boardObj[3] + boardObj[5] + boardObj[7] === -3) {
                alert("0 Wins!")
            }
            // check draw
            else if (turnCount === 9) {
                alert("It's a Draw!")
            }
        }
    }

    let currentTurn = playerOne
    function changeTurn() {
        if (currentTurn === playerOne) {
            currentTurn = playerTwo;
        }
        else {
            currentTurn = playerOne;
        }
    }

    return {
        updateBoard,
        winCheck,
        boardObj
    }
})();


gameBoard.generateBoard();