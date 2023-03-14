

// GAMEBOARD

const gameboard = (() => {
    const grid = document.querySelectorAll('.cell');
    const gameboardArray = ['', '', '', '', '', '', '', '', ''];
    const playerOneMark = 'X';
    const playerTwoMark = 'O';
    let currentMark = "";

    // Add choice to gameboard array and board
    function addChoiceArray(index, currentMark) {
        gameboardArray[index] = controlFlow.playerTurn(currentMark);
        grid[index].innerText = gameboardArray[index];
    }
          
    // Listen for which cell is clicked
    grid.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const index = e.target.id;
            if (e.target.innerText === "") {
                addChoiceArray(index, gameboard.currentMark);
            }
            controlFlow.winner();
            controlFlow.draw();
        })
    })

    return {
        gameboardArray,
        currentMark,
        playerOneMark,
        playerTwoMark,
        grid
    };
    
})()


// PLAYERS


// CONTROL FLOW

const controlFlow = (() => {

    const gameUpdates = document.querySelector('.game-updates');

    // Array of winning combinations.
    const winVariations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Controls the players turn.
    function playerTurn(previousChoice) {
        if (previousChoice === "") {
        gameboard.currentMark = gameboard.playerOneMark;
        return gameboard.currentMark;
        } else if (previousChoice === "X") {
        gameboard.currentMark = gameboard.playerTwoMark;
        return gameboard.currentMark;
        } else if (previousChoice === "O") {
        gameboard.currentMark = gameboard.playerOneMark;
        return gameboard.currentMark;
        }
    }

    // Function to analyze if there has been a winner after each turn.
    function winner() {
        for (let i = 0; i < winVariations.length; i++) {
            const [a, b, c] = winVariations[i];
            if ((gameboard.gameboardArray[a] === 'X' || gameboard.gameboardArray[a] === 'O')
                && gameboard.gameboardArray[b] === gameboard.gameboardArray[a]
                && gameboard.gameboardArray[c] === gameboard.gameboardArray[a]) {
                announceWinner(gameboard.gameboardArray[a]);
                highlightWinRow([a, b, c]);
            } 
        }
    }    

    // Function to analyze if the game has finished as a draw.
    function draw() {
        let isDraw = true;
            for (let i = 0; i < gameboard.gameboardArray.length; i++) {
                if (gameboard.gameboardArray[i] !== 'O' && gameboard.gameboardArray[i] !== 'X') {
                    isDraw = false;
                    break;
                }            
            }
            if (isDraw && !gameUpdates.innerText.includes('winner')) {
                announceDraw();
    }
    }

    // Announces winner.
    function announceWinner(winningMark) {
        gameUpdates.innerText = `${winningMark} is the winner!`
    }

    // Announces draw.
    function announceDraw() {
        gameUpdates.innerText = 'This game is a draw!'
    }
    
    function highlightWinRow(cellIndexes) {
        cellIndexes.forEach(index => {
            gameboard.grid[index].style.color = '#39ff14';
            gameboard.grid[index].style.fontSize = '5rem'
        });
    }
        


    return {
        playerTurn,
        winner,
        draw
    }


})();

