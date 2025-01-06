import { gameEngine } from './scripts/gameEngine.js';
import { MOVE_ACTION_SOUND } from './scripts/consts.js';

const gameState = {
    inputDir: { x: 0, y: 0 },
    hiscore: 0,
    speed: 10,
    lastPaintTime: 0,
};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - gameState.lastPaintTime) / 1000 < 1 / gameState.speed) {
        return;
    }
    gameState.lastPaintTime = ctime;
    gameEngine(gameState);
}

// Main Logic
let highscore = localStorage.getItem('highscore');
gameState.hiscore = highscore === null ? 0 : JSON.parse(highscore);
if (highscore === null) {
    localStorage.setItem('highscore', JSON.stringify(gameState.hiscore));
} else {
    document.querySelector('#Highscorebox').innerHTML = `HighScore: ${gameState.hiscore}`;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    gameState.inputDir.x = 0; // Reset inputDir
    gameState.inputDir.y = 0;
    MOVE_ACTION_SOUND.play();
    GAME_OVER_SOUND.pause();

    switch (e.key) {
        case "ArrowUp":
            gameState.inputDir.x = 0;
            gameState.inputDir.y = -1;
            break;
        case "ArrowDown":
            gameState.inputDir.x = 0;
            gameState.inputDir.y = 1;
            break;
        case "ArrowLeft":
            gameState.inputDir.x = -1;
            gameState.inputDir.y = 0;
            break;
        case "ArrowRight":
            gameState.inputDir.x = 1;
            gameState.inputDir.y = 0;
            break;
        default:
            break;
    }
});

// Restart button functionality
document.querySelector('#bt').addEventListener('click', () => {
    location.reload();
});
