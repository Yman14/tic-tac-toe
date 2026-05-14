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
        const b = board.getBoard();
        const size = board.getBoardSize();
        const empty = board.getDefaultMarker();

        // Row and Column vector verification
        for (let i = 0; i < size; i++) {
            if (b[i][0] !== empty && b[i].every(val => val === b[i][0])) return true;
            if (b[0][i] !== empty && b.every(row => row[i] === b[0][i])) return true;
        }
        // Diagonal vector verification
        if (b[0][0] !== empty && b.every((row, i) => row[i] === b[0][0])) return true;
        if (b[0][size - 1] !== empty && b.every((row, i) => row[size - 1 - i] === b[0][size - 1])) return true;

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

    //for console result
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