console.log("console is running.");
import { HandleGameplay } from './logic.js';
import * as UI from './ui.js';
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
    let ui = UI.RenderGameStateUI(logic.getBoardSize());
    
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
                ui.resetBoardUI();
            } 
            else if(logic.checkTie())
            {
                logic.resetRound();
                ui.resetBoardUI();
            }

            //switch player active
            logic.switchPlayer();
            ui.updatePlayerTurnPanelUI(logic.getActivePlayer().name);

            //check if the game is over
            if(logic.checkGameOver()){
                isGameActive = false;
                logic = null;
                ui = null;
                controller.abort();
                console.log("game active off");
                UI.RenderGameOverStateUI(StartGame);
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
};

//Show menu
UI.RenderMenuStateUI(StartGame);