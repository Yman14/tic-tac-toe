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
    let playerTurned = true;
    let roundOver = false;
    //First to reach the score wins
    const targetScore = 2;

    const playerController = (i, j, p) => {
        board.getBoard()[i][j] = p.marker;
    };

    const playerMove = (i, j) => {
        playerController(i, j, p1);
        //check if winning codition met
        roundWinningCondition();

        playerTurned = false;
    };

    const computerMove = (i, j) => {
        playerController(i, j, p2);
        //check if winning codition met
        roundWinningCondition();

        playerTurned = true;
    };

    const getMove = () => {
        if(playerTurned){
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

    const roundWinningCondition = () => {
        //MANUAL WINNNING CONDITIONS
        //first corner base check
        const upperHorizontal = (board.getBoard()[0][0] === board.getBoard()[0][1]) && (board.getBoard()[0][1] === board.getBoard()[0][2]);
        const leftVertical = (board.getBoard()[0][0] === board.getBoard()[1][0]) && (board.getBoard()[1][0] === board.getBoard()[2][0]);
        //last corner base check
        const lowerHorizontal = (board.getBoard()[2][2] === board.getBoard()[2][1]) && (board.getBoard()[2][1] === board.getBoard()[2][0]);
        const rightVertical = (board.getBoard()[2][2] === board.getBoard()[1][2]) && (board.getBoard()[1][2] === board.getBoard()[0][2]);
        //middle base check
        const midVertical = (board.getBoard()[1][1] === board.getBoard()[0][1]) && (board.getBoard()[1][1] === board.getBoard()[2][1]);
        const midHorizontal = (board.getBoard()[1][1] === board.getBoard()[1][0]) && (board.getBoard()[1][1] === board.getBoard()[1][2]);
        const midDiagionalFirst = (board.getBoard()[1][1] === board.getBoard()[0][0]) && (board.getBoard()[1][1] === board.getBoard()[2][2]);
        const midDiagionalSecond = (board.getBoard()[1][1] === board.getBoard()[0][2]) && (board.getBoard()[1][1] === board.getBoard()[2][0]);

        if((upperHorizontal || leftVertical)  && (board.getBoard()[0][0] != "-"))
        {
            CheckRoundOver();
        }
        else if((lowerHorizontal || rightVertical)  && (board.getBoard()[2][2] != "-")){
           CheckRoundOver();
        }
        else if((midVertical || midHorizontal || midDiagionalFirst || midDiagionalSecond)  && (board.getBoard()[1][1] != "-")){
           CheckRoundOver();
        }
        
    };

    const CheckRoundOver = () => {
        if(playerTurned) {
            p1.win();
            console.log("Round Win: " + p1.name);
            console.log("Player Score: " + p1.getScore());
        }
        else{
            p2.win();
            console.log("Round Win: " + p2.name);
            console.log("Player Score: " + p2.getScore());
        }
        roundOver = true;
        
    };

    const displayBoard = ()=> board.getBoard();

    return {board, roundOver, getMove, displayBoard};
};

(function StartGame(){
    console.log("Game Start!");
    const game = Gameplay();
    console.log(game.displayBoard());
    
    function playRound() {
        let RoundMinimumTurn = 9;

        while(!game.roundOver) {
            game.getMove();
            RoundMinimumTurn--;
            if(RoundMinimumTurn <= 0) {
                game.roundOver = true;
                console.log("Round Tie");
            }
        }
    };
    // while(!gameOver)
    // {
    //     playRound();
    // }

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
