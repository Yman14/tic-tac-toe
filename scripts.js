console.log("console is running.");
import { HandleGameplay } from './logic.js';
import * as UI from './ui.js';
//The game
let isGameActive = false;

//the game manager that manage the ui and logic
function StartGame(mode = "player") {
    //game running log
    // setInterval(() => {
    //     console.log("Game Logic Heartbeat: ", performance.now());
    // }, 2000); 

    isGameActive = true;
    //logic and ui data
    let logic = HandleGameplay(mode);
    let ui = UI.RenderGameStateUI(logic.getBoardSize());
    
    //visual
    ui.updatePlayerTurnPanelUI(logic.getActivePlayer().name);
    ui.updateScoreUI(logic.p1, logic.p2, logic.getTargetScore());
    
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
            const x = e.target.dataset.x;
            const y = e.target.dataset.y;
            const input =  `${x}${y}`;

            //game logic calculation and mark coordinates
            const processedInput = logic.validateInput(input);
            if(!processedInput.isValid) return;
            logic.loadPosition(processedInput.x, processedInput.y);
            //mark the tile ui
            e.target.textContent = logic.getActivePlayer().marker;  

            checkWin();
            //check if p2 is computer or not
            if(logic.getActivePlayer().name == "PLAYER-2" && logic.getActivePlayer().isComputer == true) 
            {
                setTimeout(() => {
                    computerPlaying();
                }, 300);
            }
        }
    }, { signal });

    //if home button is pressed
    const homeButton = document.querySelector(".homeButton");
    homeButton.addEventListener("click", () => { 
        isGameActive = false;
        logic = null;
        ui = null;
        controller.abort();
        console.log("game active off");
        UI.RenderMenuStateUI(StartGame);
    }, { signal });


    function checkWin() {
        //check if someone won
        if(logic.checkRoundWinCondition()){
            logic.updateScore();
            ui.updateScoreUI(logic.p1, logic.p2, logic.getTargetScore());
            
            //deactive game for a sec to remove tile access
            isGameActive = false;
            flashTiles();
            setTimeout(() => {
                logic.resetRound();
                ui.resetBoardUI();
                isGameActive = true;
            }, 1000);


            //check if the game is over
            if(logic.checkGameOver()){
                isGameActive = false;
                logic = null;
                ui = null;
                controller.abort();
                console.log("game active off");
                UI.RenderGameOverStateUI(StartGame, mode);
                return;
            }
        } 
        else if(logic.checkTie())
        {
            logic.resetRound();
            ui.resetBoardUI();
        }

        //switch player active
        logic.switchPlayer();
        ui.updatePlayerTurnPanelUI(logic.getActivePlayer().name);
    }

    function computerPlaying() {
        //difficulty level: easy, normal, hard
        let computerMove = logic.getAvailableMoves("normal");
        logic.loadPosition(computerMove.x, computerMove.y);
        //manual query, change later
        const cell = document.querySelector(`.tile${computerMove.x}${computerMove.y}`);
        cell.textContent = logic.getActivePlayer().marker;
        checkWin();
    }

    function flashTiles() {
        let count = 0;
        const interval = setInterval(() => {
            tiles.style.backgroundColor = count % 2 === 0 ? "white" : "yellow";
            count++;

            if (count === 7) {
                clearInterval(interval);
                tiles.style.backgroundColor = ""; 
            }
        }, 150);
    }
};

//Show menu
UI.RenderMenuStateUI(StartGame);