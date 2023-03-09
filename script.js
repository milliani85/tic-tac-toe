

// GAMEBOARD

const gameboard = (() => {
    const grid = document.querySelectorAll('.cell');
    const gameboardArray = ['', '', '', '', '', '', '', '', ''];
    const playerMark = 'X';

    // Add choice to gameboard array and board
    function addChoiceArray(index) {
        gameboardArray[index] = playerMark;
        grid[index].innerText = gameboardArray[index];
        console.log(gameboardArray);
    }
          
    // Listen for which cell is clicked
    grid.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const index = e.target.id;
            addChoiceArray(index); 
        })
    })
})()





// PLAYERS


// CONTROL FLOW