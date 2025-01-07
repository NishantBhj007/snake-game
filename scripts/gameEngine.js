import { GAME_OVER_SOUND, FOOD_CONSUME_SOUND, BACKGROUND_MUSIC } from './consts.js';
import { gameState } from './gameState.js';
import { updateHighscoreDisplay } from './highScore.js';

export function gameEngine() {
    if (isCollide()) {
        handleGameOver();
    } else if (isFoodConsumed()) {
        handleFoodConsumption();
    }

    moveSnake();
    renderGame();
}

function isCollide() {
    for (let i = 1; i < gameState.snakeArr.length; i++) {
        if (gameState.snakeArr[i].x === gameState.snakeArr[0].x && gameState.snakeArr[i].y === gameState.snakeArr[0].y) return true;
    }
    const { x, y } = gameState.snakeArr[0];
    if (x >= 18 || x <= 0 || y >= 18 || y <= 0) return true;
    return false;
}

function handleGameOver() {
    BACKGROUND_MUSIC.pause();
    GAME_OVER_SOUND.play();
    gameState.inputDir = { x: 0, y: 0 };
    alert('Game Over');
    GAME_OVER_SOUND.pause();
    BACKGROUND_MUSIC.play();
    gameState.snakeArr = [{ x: 13, y: 10 }];
    gameState.score = 0;
    document.querySelector('#current-score').innerHTML = `Score: ${gameState.score}`;
}

function isFoodConsumed() {
    return gameState.snakeArr[0].x === gameState.food.x && gameState.snakeArr[0].y === gameState.food.y;
}

function handleFoodConsumption() {
    FOOD_CONSUME_SOUND.play();
    gameState.score++;
    updateScore();
    gameState.snakeArr.unshift({ x: gameState.snakeArr[0].x + gameState.inputDir.x, y: gameState.snakeArr[0].y + gameState.inputDir.y });
    spawnNewFood();
}

function updateScore() {
    if (gameState.score > gameState.hiscore) {
        gameState.hiscore = gameState.score;
        updateHighscoreDisplay();
    }
    gameState.speed = gameState.score > 20 ? 19 : gameState.score > 10 ? 15 : gameState.speed;
    document.querySelector('#current-score').innerHTML = `Score: ${gameState.score}`;
}

function spawnNewFood() {
    const a = 2, b = 16;
    gameState.food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random()),
    };
}

function moveSnake() {
    for (let i = gameState.snakeArr.length - 2; i >= 0; i--) {
        gameState.snakeArr[i + 1] = { ...gameState.snakeArr[i] };
    }
    gameState.snakeArr[0].x += gameState.inputDir.x;
    gameState.snakeArr[0].y += gameState.inputDir.y;
}

function renderGame() {
    const board = document.querySelector('#game-board');
    board.innerHTML = '';

    // Render Snake
    gameState.snakeArr.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    // Render Food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = gameState.food.y;
    foodElement.style.gridColumnStart = gameState.food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
