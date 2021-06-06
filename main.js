const game = (() => {
    // factory
    const playerFactory = (marker, winnerValue) => {
        return {marker, winnerValue}
    }

    const playerOne = playerFactory('X', 1)
    const playerTwo = playerFactory('O', -1)


    // module
    const gameBoard = (() => {

        const gameBoardContainer = document.querySelector('#game-board-container');
        const startButtonContainer = document.querySelector("#start-button-container");
        const startButton = document.querySelector("#start-button")
        startButton.addEventListener('click', generateBoard);

        function generateBoard() {
            for (let i = 0; i < 9; i++) {
                const div = document.createElement('div')
                div.setAttribute('class', 'grid-div')
                div.setAttribute('id', `grid-div-${i + 1}`)
                div.innerText = "";
                div.addEventListener('click', function() {gameflow.updateBoard(i+1);});
                gameBoardContainer.appendChild(div);
            }
            
            // deletes start button and makes a restart button in it's place
            document.querySelector("#message-container").innerText = "X Turn"
            startButton.remove()
            const restartButton = document.createElement('button');
            restartButton.setAttribute('id', 'start-button');
            restartButton.addEventListener('click', gameflow.restartGame)
            restartButton.innerText = "Restart Game"
            startButtonContainer.appendChild(restartButton);
        }
    })();

    // module
    const gameflow = (() => {

        let boardObj = {}
        for (let i = 0; i < 9; i++) {
            boardObj[`${i+1}`] = 0;
        }

        let turnCount = 0;
        const messageContainer = document.querySelector("#message-container");
        let isWinner = false;

        function restartGame() {
            isWinner = false;
            currentTurn = playerOne;
            turnCount = 0;
            boardObj = {};
            for (let i = 0; i < 9; i++) {
                boardObj[`${i+1}`] = 0;
                document.querySelector(`#grid-div-${i+1}`).innerText = "";
            }
            messageContainer.innerText = "X Turn";
        }

        function updateBoard(index) {
            if (isWinner === false) {
                if (boardObj[index] === 0) {
                    boardObj[index] = currentTurn.winnerValue;
                    document.querySelector(`#grid-div-${index}`).innerText = currentTurn.marker;
                    changeTurn()
                    turnCount++
                    winCheck(boardObj)
                }
            }
        }

        function winCheck(boardObj) {
            if (turnCount >= 5) {

                // check rows
                for (let i = 1; i <= 9; i = i + 3) {
                    if (boardObj[i] + boardObj[i+1] + boardObj[i+2] === 3) {
                        messageContainer.innerText = "X Wins!";
                        isWinner = true;
                    }
                    else if (boardObj[i] + boardObj[i+1] + boardObj[i+2] === -3) {
                        messageContainer.innerText = "O Wins!";
                        isWinner = true;
                    }
                }
                // check columns
                for (let i =1; i <= 3; i++) {
                    if (boardObj[i] + boardObj[i+3] + boardObj[i+6] === 3) {
                        messageContainer.innerText = "X Wins!";
                        isWinner = true;
                    }
                    else if (boardObj[i] + boardObj[i+3] + boardObj[i+6] === -3) {
                        messageContainer.innerText = "O Wins!";
                        isWinner = true;
                    }
                }
                // check diagonals
                if (boardObj[1] + boardObj[5] + boardObj[9] === 3) {
                    messageContainer.innerText = "X Wins!";
                    isWinner = true;
                }
                else if (boardObj[1] + boardObj[5] + boardObj[9] === -3) {
                    messageContainer.innerText = "O Wins!";
                    isWinner = true;
                }
                else if (boardObj[3] + boardObj[5] + boardObj[7] === 3) {
                    messageContainer.innerText = "X Wins!";
                    isWinner = true;
                }
                else if (boardObj[3] + boardObj[5] + boardObj[7] === -3) {
                    messageContainer.innerText = "O Wins!";
                    isWinner = true;
                }
                // check draw
                else if (turnCount === 9) {
                    messageContainer.innerText = "It's a Draw!";
                    isWinner = true;
                }
            }
        }

        let currentTurn = playerOne
        function changeTurn() {
            if (currentTurn === playerOne) {
                currentTurn = playerTwo;
                messageContainer.innerText = "O Turn"
            }
            else {
                currentTurn = playerOne;
                messageContainer.innerText = "X Turn"
            }
        }

        return {
            updateBoard,
            restartGame
        }
    })();
})();