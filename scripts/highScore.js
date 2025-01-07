import { gameState } from "./gameState.js";

export function initializeHighscore() {
    const highscore = localStorage.getItem('highscore');
    gameState.hiscore = highscore === null ? 0 : JSON.parse(highscore);
    if (highscore === null) {
        localStorage.setItem('highscore', JSON.stringify(gameState.hiscore));
    } else {
        updateHighscoreDisplay();
    }
}

export function updateHighscoreDisplay() {
    document.querySelector('#high-score').innerHTML = `HighScore: ${gameState.hiscore}`;
    localStorage.setItem('highscore', JSON.stringify(gameState.hiscore));
}
