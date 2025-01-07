import { gameEngine } from './scripts/gameEngine.js';
import { gameState } from './scripts/gameState.js';
import { initializeHighscore } from './scripts/highScore.js';
import { setupInputHandler } from './scripts/inputHandler.js';
import { setupRestartButton } from './scripts/uiUtils.js';

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - gameState.lastPaintTime) / 1000 < 1 / gameState.speed) {
        return;
    }
    gameState.lastPaintTime = ctime;
    gameEngine();
}

// Main Logic
initializeHighscore();
setupInputHandler();
setupRestartButton();
window.requestAnimationFrame(main);
