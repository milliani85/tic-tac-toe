

// GAMEBOARD

const gameboard = (() => {
    const grid = document.querySelectorAll('.cell');
    const restart = document.querySelector('.restart');
    const nextRoundButton = document.querySelector('.next-round');

    let gameboardArray = ['', '', '', '', '', '', '', '', ''];
    const playerOneMark = 'X';
    const playerTwoMark = 'O';

    let currentMark = '';

    enableGrid();

    // Add choice to gameboard array and board
    function addChoiceArray(index, currentMark) {
        gameboardArray[index] = controlFlow.playerTurn(currentMark);
        grid[index].innerText = gameboardArray[index];
    }
    
    function enableGrid() {
        grid.forEach(cell => {
            cell.addEventListener('click', handleClick)
        })
    }
    
    // Disable cell selection.
    function disableGrid() {
        grid.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }

    // Check if cell hasn't already been played.
    function handleClick(e) {
        const index = e.target.id;
        if (e.target.innerText === '') {
            addChoiceArray(index, gameboard.currentMark);
        }
        controlFlow.winner(gameboardArray);
        controlFlow.draw();
    }

    nextRoundButton.addEventListener('click', () => {
        gameboardArray = ['', '', '', '', '', '', '', '', ''];
        grid.forEach(cell => {
            cell.innerText = '';
            cell.style.color = 'white';
        })
        controlFlow.gameUpdates.innerText = '';
        enableGrid();
    })

    // Restart current game.
    restart.addEventListener('click', () => {
        gameboardArray = ['', '', '', '', '', '', '', '', ''];
        grid.forEach(cell => {
            cell.innerText = '';
            cell.style.color = 'white';
        })
        controlFlow.gameUpdates.innerText = '';
        enableGrid();
        controlFlow.resetScore();
    })

    return {
        gameboardArray,
        currentMark,
        playerOneMark,
        playerTwoMark,
        grid,
        disableGrid
    };
    
})()


// PLAYERS


// CONTROL FLOW

const controlFlow = (() => {

    const gameUpdates = document.querySelector('.game-updates');
    let playerOneScoreboard = document.querySelector('.playerone-score');
    let playerTwoScoreboard = document.querySelector('.playertwo-score');

    let playerOneScore = 0;
    let playerTwoScore = 0;


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
        if (previousChoice === '') {
        gameboard.currentMark = gameboard.playerOneMark;
        return gameboard.currentMark;
        } else if (previousChoice === 'X') {
        gameboard.currentMark = gameboard.playerTwoMark;
        return gameboard.currentMark;
        } else if (previousChoice === 'O') {
        gameboard.currentMark = gameboard.playerOneMark;
        return gameboard.currentMark;
        }
    }

    // Analyze if there has been a winner after each turn.
    function winner(gameboardArray) {
        console.log(gameboardArray)
        for (let i = 0; i < winVariations.length; i++) {
            const [a, b, c] = winVariations[i];
            if ((gameboardArray[a] === 'X' || gameboardArray[a] === 'O')
                && gameboardArray[b] === gameboardArray[a]
                && gameboardArray[c] === gameboardArray[a]) {
                announceWinner(gameboardArray[a]);
                highlightWinRow([a, b, c]);
                stopClick();
                updateScore();
            } 
        }
    }    

    // Analyze if the game has finished as a draw.
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
                stopClick();
                updateScore();
        }
    }

    // Stop any further selections after game has finished.
    function stopClick() {  
        if (gameUpdates.innerText.includes('winner') || gameUpdates.innerText.includes('draw')) {
            gameboard.disableGrid()
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
    
    // Highlights winning row.
    function highlightWinRow(cellIndexes) {
        cellIndexes.forEach(index => {
            gameboard.grid[index].style.color = '#39ff14';
            gameboard.grid[index].style.fontSize = '5rem'
        });
    }

    // Control player scores
    function updateScore() {
        if (gameUpdates.innerText.includes('X')) {
            playerOneScore++;
            playerOneScoreboard.innerText = playerOneScore;
        } else if (gameUpdates.innerText.includes('O')) {
            playerTwoScore++;
            playerTwoScoreboard.innerText = playerTwoScore;
        }
    }

    function resetScore() {
        playerOneScore = 0;
        playerTwoScore = 0;
        playerOneScoreboard.innerText = playerOneScore;
        playerTwoScoreboard.innerText = playerTwoScore;
    }

    return {
        playerTurn,
        winner,
        draw,
        resetScore,
        gameUpdates
    }


})();

