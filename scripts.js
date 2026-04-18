console.log("console is running.");

function Gameboard() {
    const boardSize = 3;
    let board = [];
    const defaultMarker = '-';

    const createBoard = () => {
        for(let i = 0; i < boardSize; i++)
        {
            board[i] = [];
            for(let j = 0; j < boardSize; j++)
            {
                board[i][j] = defaultMarker;
            }
        }
    };

   const getBoard = () => board;

   const getDefaultMarker = () => defaultMarker;

   return {boardSize, createBoard, getBoard, getDefaultMarker};
};

function CreatePlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    let score = 0;

    const win = () => { score++; };
    const getScore = () => score;
    return{name, marker, win, getScore};
};



function HandleGameplay () {
    const board = Gameboard();
    board.createBoard();
    const p1 = CreatePlayer("PLAYER", 'X');
    const p2 = CreatePlayer("COMPUTER", 'O');

    let playerTurned = true;
    let roundOver = false;
    let gameOver = false;
    //First to reach the score wins
    const targetScore = 2;



    const markingMove = (i, j, p) => {
        board.getBoard()[i][j] = p.marker;
    };

    const playerController = (i, j, player) => {
        markingMove(i, j, player);
        //check if winning codition met
        roundWinningCondition();
        playerTurned = !playerTurned;
    };


    const getMove = () => {
        if(playerTurned){
            const input = getInput(p1);
            console.log("input: " + input);
            playerController(parseInt(input.charAt(0)), parseInt(input.charAt(1)), p1);
        }else{
            const input = getInput(p2);
            console.log("input: " + input);
            playerController(parseInt(input.charAt(0)), parseInt(input.charAt(1)), p2);
        }
    };

    const getInput = (player) => {
        const input = prompt(`${player.name} Move: `);
        console.log("getInput: " + input);
        if(validateInput(input)){
            console.log("returnInput: " + input);
            return input;
        }
        else{
            return getInput(player);
        }
    };

    //validate if the coordinates was already used
    const validateInput = (input) =>{
        console.log("validateInput: " + input);
        const x = parseInt(input.charAt(0));
        const y = parseInt(input.charAt(1));
        if(board.getBoard()[x][y] == board.getDefaultMarker()){
            return true;
        }
        return false;
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
        //ex
        console.log("expermient");
        console.log(board.getBoard()[0][0] + " ---- " + board.getDefaultMarker());
        if((upperHorizontal || leftVertical)  && (board.getBoard()[0][0] != board.getDefaultMarker()))
        {
            CheckRoundOver();
        }
        else if((lowerHorizontal || rightVertical)  && (board.getBoard()[2][2] != board.getDefaultMarker())){
           CheckRoundOver();
        }
        else if((midVertical || midHorizontal || midDiagionalFirst || midDiagionalSecond)  && (board.getBoard()[1][1] != board.getDefaultMarker())){
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
            displayGameOverPanel();
        }
    };

    const resetRound = () => {
        board.createBoard();
        roundOver = false;
        
    };

    displayGameOverPanel = () => {
        console.log("Game Winner: " + ((p1.getScore() > p2.getScore()) ? p1.name : p2.name));
        console.log(p1.name + ": " + p1.getScore());
        console.log(p2.name + ": " + p2.getScore());
    };

    const playRound = () => {
        let RoundMinimumTurn = 9;
        while(!roundOver)
        {
            getMove();
            RoundMinimumTurn--;
            if(RoundMinimumTurn <= 0) {
                roundOver = true;
                console.log("Round Tie");
            }
        }
    };

    const playGame = () => {
        CheckGameOver();
        while(!gameOver)
        {
            console.log("start round");
            resetRound();
            playRound();
            CheckGameOver();
        }
    };

    const displayBoard = ()=> board.getBoard();

    return {playGame, displayBoard};
};

const InitiateNewGame = () => {
    console.log("Game Start!");
    const game = HandleGameplay();
    console.log(game.displayBoard());
    
    game.playGame();

};


function PlayAgain() {
    InitiateNewGame();
};


//starts game
InitiateNewGame();
