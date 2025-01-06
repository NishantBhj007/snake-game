import { GAME_OVER_SOUND, FOOD_CONSUME_SOUND, BACKGROUND_MUSIC } from './consts.js';

let snakeArr = [{ x: 12, y: 17 }];
let food = { x: 6, y: 7 };
let score = 0;

export function gameEngine(gameState) {
    const { inputDir, speed, hiscore } = gameState;

    if (isCollide(snakeArr)) {
        GAME_OVER_SOUND.play();
        BACKGROUND_MUSIC.pause();
        inputDir.x = 0;
        inputDir.y = 0;
        alert('Game Over');
        snakeArr = [{ x: 13, y: 10 }];
        BACKGROUND_MUSIC.play();
        score = 0;
    }

    // Food consumption logic
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        FOOD_CONSUME_SOUND.play();
        score++;
        if (score > gameState.hiscore) {
            gameState.hiscore = score;
            localStorage.setItem('highscore', JSON.stringify(gameState.hiscore));
        }
        if (score > 10) gameState.speed = 15;
        if (score > 20) gameState.speed = 19;

        document.querySelector('#scorebox').innerHTML = `Score: ${score}`;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        let a = 2, b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };
    }

    // Snake movement logic
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Render snake and food
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) return true;
    return false;
}
