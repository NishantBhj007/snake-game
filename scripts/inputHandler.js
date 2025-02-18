import { MOVE_ACTION_SOUND, BACKGROUND_MUSIC } from "./consts.js";
import { gameState } from "./gameState.js";

export function setupInputHandler() {
  window.addEventListener("keydown", (e) => {
    gameState.inputDir.x = 0; // Reset inputDir
    gameState.inputDir.y = 0;
    MOVE_ACTION_SOUND.play();
    BACKGROUND_MUSIC.play();

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

  const arrowUpButton = document.querySelector(".arrow-up");
  const arrowDownButton = document.querySelector(".arrow-down");
  const arrowLeftButton = document.querySelector(".arrow-left");
  const arrowRightButton = document.querySelector(".arrow-right");

  arrowUpButton.addEventListener("click", () => {
    gameState.inputDir.x = 0;
    gameState.inputDir.y = -1;
    MOVE_ACTION_SOUND.play();
    BACKGROUND_MUSIC.play();
  });

  arrowDownButton.addEventListener("click", () => {
    gameState.inputDir.x = 0;
    gameState.inputDir.y = 1;
    MOVE_ACTION_SOUND.play();
    BACKGROUND_MUSIC.play();
  });

  arrowLeftButton.addEventListener("click", () => {
    gameState.inputDir.x = -1;
    gameState.inputDir.y = 0;
    MOVE_ACTION_SOUND.play();
    BACKGROUND_MUSIC.play();
  });

  arrowRightButton.addEventListener("click", () => {
    gameState.inputDir.x = 1;
    gameState.inputDir.y = 0;
    MOVE_ACTION_SOUND.play();
    BACKGROUND_MUSIC.play();
  });
}
