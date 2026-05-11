//LOGIC
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
   const getBoardSize = () => boardSize;
   const getDefaultMarker = () => defaultMarker;
   return {getBoardSize, createBoard, getBoard, getDefaultMarker};
};
function CreatePlayer(name, marker) {
    name = name;
    marker = marker;
    let score = 0;

    const win = () => { score++; };
    const getScore = () => score;
    return{name, marker, win, getScore};
};


export function HandleGameplay () {
    const board = Gameboard();
    board.createBoard();
    const p1 = CreatePlayer("PLAYER-1", 'X');
    const p2 = CreatePlayer("PLAYER-2", 'O');
    let activePlayer = p1;
    //First to reach the score wins
    const targetScore = 2;
    let countTurn = 1;

    //player input
    const loadPosition = (x, y) => {
        board.getBoard()[x][y] = activePlayer.marker;
    };

    //validate if the coordinates was already used
    const validateInput = (input) =>{
        const x = parseInt(input.charAt(0));
        const y = parseInt(input.charAt(1));
        console.log("validateInput: " + x + y);
        if(board.getBoard()[x][y] == board.getDefaultMarker()){
            return {isValid: true, x,y};
        }
        return {isValid: false};
    };

    const checkRoundWinCondition = () => {
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

        if((upperHorizontal || leftVertical)  && (board.getBoard()[0][0] != board.getDefaultMarker()))
        {
            return true;
        }
        else if((lowerHorizontal || rightVertical)  && (board.getBoard()[2][2] != board.getDefaultMarker())){
           return true;
        }
        else if((midVertical || midHorizontal || midDiagionalFirst || midDiagionalSecond)  && (board.getBoard()[1][1] != board.getDefaultMarker())){
           return true;
        }

        return false; 
    };

    const checkGameOver = () => {
        if(p1.getScore() >= targetScore || p2.getScore() >= targetScore)
        {
            displayGameOverPanel();
            return true;
        }

        return false;
    };

    const updateScore = () => {
        activePlayer.win();
        console.log("Round Win: " + activePlayer.name);
        console.log(activePlayer.name + " Score: " + activePlayer.getScore());
        // resetRound();
    };

    const resetRound = () => {
        board.createBoard();
        countTurn = 1;
        
    };

    const switchPlayer = () => {
        activePlayer = (activePlayer == p1) ? p2 : p1;
        countTurn++;
    };

    const checkTie = () => {
        return (countTurn >= 9);
    };


    const displayGameOverPanel = () => {
        console.log("Game Winner: " + ((p1.getScore() > p2.getScore()) ? p1.name : p2.name));
        console.log(p1.name + ": " + p1.getScore());
        console.log(p2.name + ": " + p2.getScore());
    };

    const getBoard = ()=> board.getBoard();
    const getBoardSize = ()=> board.getBoardSize();
    const getActivePlayer = () => activePlayer;
    const getTargetScore = () => targetScore;

    return {p1, p2, loadPosition, 
            getActivePlayer, getTargetScore, getBoard, getBoardSize, 
            validateInput, checkRoundWinCondition, checkGameOver, checkTie, 
            updateScore, switchPlayer, resetRound};
};