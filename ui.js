//DOM UI
//Game Screen
export function RenderGameStateUI(boardSize){
    console.log("Render Game State UI");

    const app = document.getElementById("app");
    app.replaceChildren();
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("gameScreen");
    app.appendChild(gameScreen);

    const playerScore = document.createElement("div");
    const boardUI = document.createElement("div");
    const playerTurnPanel = document.createElement("div");
    const homeButton = document.createElement("button");
    playerScore.classList.add("playerScore");
    boardUI.classList.add("boardUI");
    playerTurnPanel.classList.add("playerTurnPanel");
    homeButton.classList.add("homeButton");
    gameScreen.append(playerScore, boardUI, playerTurnPanel, homeButton);

    //homeButton ui
    homeButton.classList.add("btnFX");
    homeButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
        </svg>
        `;

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
    const renderBoardUI = () => {
        let boardContainer = document.createElement("div");
        boardContainer.classList.add("boardContainer");
        boardUI.appendChild(boardContainer);

        //tiles
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
    const resetBoardUI = () => {
        // renderBoardUI(true);
        const boardContainer = document.querySelectorAll(".tile");
        boardContainer.forEach(tile => tile.textContent = "");
        console.log("reset board ui");
    };
    const updatePlayerTurnPanelUI = (activePlayerName) => {
        document.querySelector(".turnPanel").style.backgroundColor = `var(--${activePlayerName}-color)`;
        document.querySelector(".turnPanelText").textContent = activePlayerName;

    };

    return {updateScoreUI, resetBoardUI, updatePlayerTurnPanelUI};

};

//Menu Screen
export function RenderMenuStateUI(onStartGame) {
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
    startButton.classList.add("btnFX");
    menuScreen.appendChild(startButton);
    startButton.textContent = "Start Game";

    startButton.addEventListener("click", ()=>{
        onStartGame();
    });
};

//Game Over Screen
export function RenderGameOverStateUI(onStartGame) {
    const app = document.getElementById("app");
    // app.replaceChildren(); //games background can be seen
    const gameOverScreen = document.createElement("div");
    gameOverScreen.classList.add("gameOverScreen");
    app.appendChild(gameOverScreen);

    const gameOverScreenPanel = document.createElement("div");
    gameOverScreenPanel.classList.add("gameOverScreenPanel");
    gameOverScreen.appendChild(gameOverScreenPanel);

    const gameOverScreenText = document.createElement("p");
    gameOverScreenText.classList.add("gameOverScreenText");
    gameOverScreenText.textContent = "GAME OVER 0_0";
    const gameOverScreenButtons = document.createElement("div");
    gameOverScreenButtons.classList.add("gameOverScreenButtons");

    gameOverScreenPanel.append(gameOverScreenText, gameOverScreenButtons);

    const playAgainButton = document.createElement("button");
    playAgainButton.classList.add("playAgainButton");
    playAgainButton.textContent = "PLAY AGAIN :)";
    playAgainButton.classList.add("btnFX");
    const homeButton = document.createElement("button");
    homeButton.classList.add("homeButton");
    homeButton.textContent = "HOME";
    homeButton.classList.add("btnFX");
    gameOverScreenButtons.append(playAgainButton, homeButton);

    playAgainButton.addEventListener("click", () => {
        onStartGame();
    });
    homeButton.addEventListener("click", () => {
        const tempPanel = document.createElement("div");
        gameOverScreenPanel.append(tempPanel);
        tempPanel.textContent = "KEEP PLAYING !!!";
        tempPanel.style.color = "red";

        //destroy element
        setTimeout(() => {
            tempPanel.remove();
        }, 1500);
    } );
};