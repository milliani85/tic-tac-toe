

// GAMEBOARD

const gameboard = (() => {
    const grid = document.querySelectorAll('.cell');
    const gameboardArray = ['', '', '', '', '', '', '', '', ''];
    const playerOneMark = 'X';
    const playerTwoMark = 'O';
    let mark = "";

    // Add choice to gameboard array and board
    function addChoiceArray(index) {
        gameboardArray[index] = playerTurn(mark);
        grid[index].innerText = gameboardArray[index];
        console.log(gameboardArray);
    }
          
    // Listen for which cell is clicked
    grid.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const index = e.target.id;
            if (e.target.innerText === "") {
                addChoiceArray(index);
            }
        })
    })

    // Controls the player turn.
    function playerTurn(previousChoice) {
        if (previousChoice === "") {
            mark = playerOneMark
            return mark;
        } else if (previousChoice === "X") {
            mark = playerTwoMark
            return mark;
        } else if (previousChoice === "O") {
            mark = playerOneMark
            return mark;
        }
    }
})()





// PLAYERS


// CONTROL FLOW