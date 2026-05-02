console.log("console is running.");

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
        roundOver = false;
        
    };

    const switchPlayer = () => {
        activePlayer = (activePlayer == p1) ? p2 : p1;
        countTurn++;
    };

    const checkTie = () => {
        return (countTurn >= 9);
    };


    displayGameOverPanel = () => {
        console.log("Game Winner: " + ((p1.getScore() > p2.getScore()) ? p1.name : p2.name));
        console.log(p1.name + ": " + p1.getScore());
        console.log(p2.name + ": " + p2.getScore());
    };

    const getBoard = ()=> board.getBoard();
    const getActivePlayer = () => activePlayer;
    const getTargetScore = () => targetScore;

    return {p1, p2, loadPosition, 
            getActivePlayer, getTargetScore, getBoard, 
            validateInput, checkRoundWinCondition, checkGameOver, checkTie, 
            updateScore, switchPlayer, resetRound};
};



//DOM UI
//Game Screen
function RenderGameStateUI(){
    console.log("Render Game State UI");

    const app = document.getElementById("app");
    app.replaceChildren();
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("gameScreen");
    app.appendChild(gameScreen);

    const playerScore = document.createElement("div");
    const boardUI = document.createElement("div");
    const playerTurnPanel = document.createElement("div");
    const quitButton = document.createElement("button");
    playerScore.classList.add("playerScore");
    boardUI.classList.add("boardUI");
    playerTurnPanel.classList.add("playerTurnPanel");
    quitButton.classList.add("quitButton");
    gameScreen.append(playerScore, boardUI, playerTurnPanel, quitButton);

    //quitbutton ui
    quitButton.textContent = "XXX";

    //render the score
    const renderScoreUI = () => {
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
    };
    renderScoreUI();

    //render the board
    const renderBoardUI = (update) => {
        let boardContainer;
        if(update == null)
        {
            boardContainer = document.createElement("div");
            boardContainer.classList.add("boardContainer");
            boardUI.appendChild(boardContainer);
        }
        else{
            boardContainer = document.querySelector(".boardContainer");
            boardContainer.replaceChildren();
        }

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
        
        const turnPanelText = document.createElement("p");
        turnPanelText.classList.add("turnPanelText");
        turnPanelText.textContent = "PLAYER TURN";
        turnPanel.appendChild(turnPanelText);
    };
    renderPlayerTurnPanel();

    //update ui
    const updateScoreUI = (p1, p2, targetScore) => {
        if(p1 != null && p2 != null) {
            const p1ScoreText = document.querySelector(".p1ScoreText");
            const p2ScoreText = document.querySelector(".p2ScoreText");
            p1ScoreText.textContent = `${p1.getScore()}/${targetScore}`;
            p2ScoreText.textContent = `${p2.getScore()}/${targetScore}`;
        }
    };
    const updateBoardUI = () => {
        renderBoardUI(true);
    };
    const updatePlayerTurnPanelUI = (activePlayer) => {
        document.querySelector(".turnPanel").style.backgroundColor = `var(--${activePlayer}-color)`;
        document.querySelector(".turnPanelText").textContent = activePlayer;

    };

    return {updateScoreUI, updateBoardUI, updatePlayerTurnPanelUI};

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
        StartGame();
    });
};
//Game Over Screen
function RenderGameOverStateUI() {
    const app = document.getElementById("app");
    const gameOverScreen = document.createElement("div");
    gameOverScreen.classList.add("gameOverScreen");
    app.appendChild(gameOverScreen);

    const gameOverScreenPanel = document.createElement("div");
    gameOverScreenPanel.classList.add("gameOverScreenPanel");
    gameOverScreen.appendChild(gameOverScreenPanel);

    const gameOverScreenText = document.createElement("p");
    gameOverScreenText.classList.add("gameOverScreenText");
    gameOverScreenText.textContent = "GAME OVER 0_0";

    const gameOverScreenButton = document.createElement("button");
    gameOverScreenButton.classList.add("gameOverScreenButton");
    gameOverScreenButton.textContent = "PLAY AGAIN :)";

    gameOverScreenPanel.append(gameOverScreenText, gameOverScreenButton);

    gameOverScreenButton.addEventListener("click", () => {
        StartGame();
    });
};


// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------


//The game
let isGameActive = false;

//the game manager that manage the ui and logic
function StartGame() {
    //game running log
    // setInterval(() => {
    //     console.log("Game Logic Heartbeat: ", performance.now());
    // }, 2000); 

    isGameActive = true;
    //logic and ui data
    let logic = HandleGameplay();
    let ui = RenderGameStateUI();
    
    //kill switch
    const controller = new AbortController();
    const{ signal } = controller;

    //if tile is click/press
    const tiles = document.querySelector(".boardContainer");
    tiles.addEventListener("click", (e) => {
        if(!isGameActive){
            return;
        }

        if(e.target.classList.contains("tile")){
            //get the coordinates based on the 2nd class name
            const input = e.target.classList[1];

            //game logic calculation and mark coordinates
            const processedInput = logic.validateInput(input);
            if(!processedInput.isValid) return;
            logic.loadPosition(processedInput.x, processedInput.y);
            //mark the tile ui
            e.target.textContent = logic.getActivePlayer().marker;  

            //check if someone won
            if(logic.checkRoundWinCondition()){
                logic.updateScore();
                ui.updateScoreUI(logic.p1, logic.p2, logic.getTargetScore());
                //update this only when theres a condition (*not yet implemented)
                logic.resetRound();
                ui.updateBoardUI();
            }

            if(logic.checkTie())
            {
                logic.resetRound();
                ui.updateBoardUI();
            }

            //check if the game is over
            if(logic.checkGameOver()){
                controller.abort();
                RenderGameOverStateUI();
            }

            //switch player active
            logic.switchPlayer();
            ui.updatePlayerTurnPanelUI(logic.getActivePlayer().name);
        }
    }, { signal });

    //if quit button is pressed
    const quitButton = document.querySelector(".quitButton");
    quitButton.addEventListener("click", () => { 
        isGameActive = false;
        logic = null;
        ui = null;
        controller.abort();
        console.log("game active off");
        RenderMenuStateUI();
    }, { signal });
};

//Show menu
RenderMenuStateUI();