
var playerOne = "R";
var playerTwo = "Y";

var currentPlayer = playerOne;
var gameOver = false;
var board;
var currentColumns;

var rows = 6;
var columns = 7;

window.onload = function() {
    startGame();
}


/**
 * Auto create and populate the board upon window loading
 */
function startGame() {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5]; // array make sure people cannot cheat by lokcing in column

    // create and title the rows with id's corresponding
    // to board coordinates
    for (let r = 0; r < rows; r++) {
        let row = []; 
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // set id to board coordinate
            tile.classList.add("tile");
            tile.addEventListener("click", placePiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}


/**
 * places piece on the board
 * @returns 
 */
function placePiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); // grab coordinates
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    if (r < 0) {
        return;  // if at top of stack, return
    }

    board[r][c] = currentPlayer;
    const tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currentPlayer == playerOne) {
        tile.classList.add("red-piece");
        currentPlayer = playerTwo; // change player
    }
    else {
        tile.classList.add("yellow-piece");
        currentPlayer = playerOne;
    }

    r -= 1; // move up one row
    currentColumns[c] = r; // update array to match

    checkForWin();
}

/**
 * Do note: the logic involved here is anything but effecient. I panicked and thought
 * this was due earlier than it was, but hey it works great!
 * @returns 
 */
function checkForWin() {

    // check for horizontal win
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }



     // vertical
     for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }


    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // opposite diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}


function setWinner(r, c) {
    let winner = document.getElementById("winner");
  
    winner.innerText = `Player ${board[r][c] == playerOne ? "One" : "Two"} Wins!!!`; // turnary condition practice yus

    gameOver = true;
}
