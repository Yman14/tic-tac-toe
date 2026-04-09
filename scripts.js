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

function CreatePlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    let score = 0;

    const win = () => { score++; };
    const getScore = () => score;
    return{name, marker, win, getScore};
};

function Gameplay () {
    const board = Gameboard();
    board.createBoard();
    const p1 = CreatePlayer("PLAYER", "X");

    const playRound = (i, j) => {
        board.getBoard()[i][j] = p1.marker;
    };

    return {board, p1, playRound};
};


//Lab
const game = Gameboard();
game.createBoard();
console.log(game.getBoard());

const player1 = CreatePlayer("Lee", "X");
console.log(player1);
console.log(player1.getScore());
player1.win();
console.log(player1.getScore());
console.log(player1);

const demo = Gameplay();
console.log(demo);
