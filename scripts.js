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
        const input = getInput();
        if(player1Move){
            playerMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)));
        }else{
            computerMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)));
        }
    };

    const getInput = () => {
        return prompt("Move: ");
    };

    const displayBoard = ()=> board.getBoard();
    const displayBoard1 = ()=> {
        for(let i = 0; i <= board.boardSize; i++)
        {
            for(let j = 0; j <= board.boardSize; j++)
            {
                console.log(board.getBoard()[i][j]);
            }
        }
    };

    return {board, p1, p2, playerController, playerMove, computerMove, getInput, getMove, displayBoard, displayBoard1};
};

(function StartGame(){
    console.log("Game Start!");
    const game = Gameplay();
    console.log(game.displayBoard());
    console.log(game.displayBoard1());
    console.log(game.board.getBoard()[1][0]);
    console.log(game.board.getBoard()[1][0]);
    console.log(game.board.getBoard()[1][0]);
    for(let i = 0; i <= game.board.boardSize; i++)
    {
        for(let j = 0; j <= game.board.boardSize; j++)
        {
            console.log(game.board.getBoard()[i][j]);
        }
    }

    // while(noOneWins()){
    //     getMove();
    // }
    let n = 3;
    while(n>0)
    {
        game.getMove();
        n--;
    }
    console.log(game.board.getBoard()[1][0]);
    console.log(game.board.getBoard()[1][1]);
    console.log(game.board.getBoard()[1][2]);
      console.log(game.board.boardSize);
    for(let i = 0; i <= game.board.boardSize; i++)
    {
        for(let j = 0; j <= game.board.boardSize; j++)
        {
            console.log(game.board.getBoard()[i][j]);
        }
    }

    // console.log("Player Move: ");
    // input = game.getInput();
    // game.playerMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)));
    // console.log(game.displayBoard());

    // console.log("Computer Move: ");
    // input = game.getInput();
    // game.computerMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)));
    // console.log(game.displayBoard());


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
