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
                board[i][j] = "-";
            }
        }
    };

   const getBoard = () => board;

   return {boardSize, createBoard, getBoard};
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
    const p2 = CreatePlayer("COMPUTER", "O");
    let player1Move = true;

    const playerController = (i, j, p) => {
        board.getBoard()[i][j] = p.marker;
    };

    const playerMove = (i, j) => {
        playerController(i, j, p1);
        player1Move = false;
    };

    const computerMove = (i, j) => {
        playerController(i, j, p2);
        player1Move = true;
    };

    const getMove = () => {
        if(player1Move){
            const input = getInput(p1);
            playerMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)));
        }else{
            const input = getInput(p2);
            computerMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)));
        }
    };

    const getInput = (playerTurn) => {
        return prompt(`${playerTurn.name} Move: `);
    };

    const displayBoard = ()=> board.getBoard();

    return {board, p1, p2, playerController, playerMove, computerMove, getInput, getMove, displayBoard};
};

(function StartGame(){
    console.log("Game Start!");
    const game = Gameplay();
    console.log(game.displayBoard());
    
    function playRound() {
        let minTurn = 9;
        let gameOver = false;

        while(!gameOver) {
            game.getMove();
            minTurn--;
            if(minTurn<=0) gameOver=true;
        }
    };
    let play = 1;
    while(play == 1)
    {
        playRound();
        play = prompt("Enter 1 to play again: ");
    }

})();


//Lab
// const demo = Gameplay();
// console.log(demo);
// console.log(demo.getBoard());
// demo.playerMove(1,1);
// console.log(demo.getBoard());
// demo.computerMove(1,2);
// console.log(demo.getBoard());
// demo.playerMove(2,0);
// console.log(demo.getBoard());
