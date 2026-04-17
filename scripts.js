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
    const gameOver = false;

    const playerController = (i, j, p) => {
        board.getBoard()[i][j] = p.marker;
    };

    const markedMove = (i, j, player) => {
        playerController(i, j, player);
        //check if winning codition met
        roundWinningCondition();
        playerTurned = !playerTurned;
    };


    const getMove = () => {
        if(playerTurned){
            const input = getInput(p1);
            markedMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)), p1);
        }else{
            const input = getInput(p2);
            markedMove(parseInt(input.charAt(0)), parseInt(input.charAt(1)), p2);
        }
    };

    const getInput = (playerInput) => {
        return prompt(`${playerInput.name} Move: `);
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
            console.log(p1.name + " Score: " + p1.getScore());
        }
        else{
            p2.win();
            console.log("Round Win: " + p2.name);
            console.log(p2.name + " Score: " + p2.getScore());
        }
        roundOver = true;
        
    };

    const CheckGameOver = () => {
        if(p1.getScore() >= targetScore || p2.getScore() >= targetScore)
        {
            gameOver = true;
        }
    };

    const resetBoard = () => board.createBoard();

    const getGameOver = () => gameOver;

    const displayBoard = ()=> board.getBoard();

    return {board, roundOver, getGameOver, getMove, displayBoard};
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
    playRound();

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
