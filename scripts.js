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
    const p1 = CreatePlayer("PLAYER 1", 'X');
    const p2 = CreatePlayer("PLAYER 2", 'O');

    let activePlayer = p1;
    let roundOver = false;
    let gameOver = false;
    //First to reach the score wins
    const targetScore = 2;

    //player input
    const playerController = (input) => {
        const x = parseInt(input.charAt(0));
        const y = parseInt(input.charAt(1));
        board.getBoard()[x][y] = activePlayer.marker;
        // checkRoundWinCondition();
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

    const updateScore = () => {
        activePlayer.win();
        console.log("Round Win: " + activePlayer.name);
        console.log(activePlayer.name + " Score: " + activePlayer.getScore());
        // resetRound();
    };

    const switchPlayer = () => {
        activePlayer = (activePlayer == p1) ? p2 : p1;
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

    const getBoard = ()=> board.getBoard();
    const getActivePlayer = () => activePlayer;

    return {p1, p2, playerController, getActivePlayer, checkRoundWinCondition, updateScore, switchPlayer, playGame, getBoard};
};

function Start() {
    const game = HandleGameplay();
    RenderGameStateUI();
    GameController(game);
};




//DOM
function GameController(game) {
    //if tile is click/press
    const tiles = document.querySelector(".boardContainer");
    tiles.addEventListener("click", (e) => {
        if(e.target.classList.contains("tile")){
            const input = e.target.classList[1];
            game.playerController(input);
            e.target.textContent = game.getActivePlayer().marker;   
            //
            if(game.checkRoundWinCondition()){
                game.updateScore();
                RenderGameStateUI().renderScoreUI(game.p1, game.p2);
            }
            game.switchPlayer();
        }
    });
};


//Game Screen
function RenderGameStateUI(){
    const app = document.getElementById("app");
    app.replaceChildren();
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("gameScreen");
    app.appendChild(gameScreen);

    const playerScore = document.createElement("div");
    const boardUI = document.createElement("div");
    const playerTurnPanel = document.createElement("div");
    playerScore.classList.add("playerScore");
    boardUI.classList.add("boardUI");
    playerTurnPanel.classList.add("playerTurnPanel");
    gameScreen.append(playerScore, boardUI, playerTurnPanel);

    //render the score
    const renderScoreUI = (p1, p2) => {
        const p1Score = document.querySelector(".p1Score");
        const p2Score = document.querySelector(".p2Score");

        if(document.querySelector(".p1Score") == null)
        {
            const p1Score = document.createElement("div");
            const p2Score = document.createElement("div");
            p1Score.classList.add("p1Score");
            p2Score.classList.add("p2Score");
            playerScore.append(p1Score, p2Score);

            const p1ScoreText = document.createElement("p");
            const p2ScoreText = document.createElement("p");
            p1ScoreText.classList.add("p1ScoreText");
            p2ScoreText.classList.add("p2ScoreText");
            p1Score.appendChild(p1ScoreText);
            p2Score.appendChild(p2ScoreText);
            p1ScoreText.textContent = "0";
            p2ScoreText.textContent = "0";
        }

        const updateScore = () => {
            if(p1 != null) {
                const p1ScoreText = document.querySelector(".p1ScoreText");
                const p2ScoreText = document.querySelector(".p2ScoreText");
                p1ScoreText.textContent = p1.getScore();
                p2ScoreText.textContent = p2.getScore();
            }
        };
        updateScore();
    };
    renderScoreUI();

    //render the board
    const renderBoardUI = () => {
        const boardContainer = document.createElement("div");
        boardContainer.classList.add("boardContainer");
        boardUI.appendChild(boardContainer);

        //tiles
        boardSize = Gameboard().boardSize;
        for(let i = 0; i < boardSize; i++)
        {
            for(let j = 0; j < boardSize; j++)
            {
                const tile = document.createElement("button");
                tile.classList.add("tile");
                tile.classList.add(`${i}${j}`);
                boardContainer.appendChild(tile);
            }
        }
    };
    renderBoardUI();

    //render player turn panel
    const renderPlayerTurnPanel = () => {
        const turnPanel = document.createElement("div");
        turnPanel.classList.add("turnPanel");
        playerTurnPanel.appendChild(turnPanel);
    };
    renderPlayerTurnPanel();

    return {renderScoreUI};

};


//Menu Screen
function RenderMenuStateUI() {
    const app = document.getElementById("app");
    app.replaceChildren();

    const menuScreen = document.createElement("div");
    menuScreen.classList.add("menuScreen");
    app.appendChild(menuScreen);

    //title
    const startButtonText = document.createElement("h1");
    startButtonText.classList.add("startButtonText");
    startButtonText.textContent = "Tic Tac Toe";
    menuScreen.appendChild(startButtonText);


    //start Button code
    const startButton = document.createElement("button");
    startButton.classList.add("startButton");
    menuScreen.appendChild(startButton);
    startButton.textContent = "Start Game";
    menuScreen.appendChild(startButton);

    startButton.addEventListener("click", ()=>{
        Start();
    });
};
// RenderMenuStateUI();
Start();
