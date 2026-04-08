const greet = document.querySelector("h1");
greet.textContent = "Tic Tac Toe Game";
console.log("console is running.");

function Gameboard() {
    const boardSize = 3;
    let board = [];

    const createBoard = () => {
        for(let i = 0; i < boardSize; i++)
        {
            board[i] = [];
            for(let j = 0; j < boardSize; j++)
            {
                board[i][j] = " ";
            }
        }
    };

   const getBoard = () => board;

   return {createBoard, getBoard};
};

const game = Gameboard();
game.createBoard();
console.log(game.getBoard());
