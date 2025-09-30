// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;

let topPipeImg;
let bottomPipeImg;

// physics
let velocityX = -2; // pipe speed
let velocityY = 0;  // bird jump speed
let gravity = 0.4;

// score
let score = 0;
let gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // bird
    birdImg = new Image();
    birdImg.src = "./FLAPPYBIRDPNGS/flappybird.png";

    // pipes
    topPipeImg = new Image();
    topPipeImg.src = "./FLAPPYBIRDPNGS/topPipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./FLAPPYBIRDPNGS/bottomPipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // every 1.5 sec
    document.addEventListener("keydown", moveBird);
};

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        context.fillStyle = "red";
        context.font = "30px Arial";
        context.fillText("Game Over!", 100, 320);
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // bird physics
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); // no going above canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    // pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && pipe.x + pipe.width < bird.x) {
            score += 0.5; // +0.5 for each pipe (top+bottom = 1)
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    // remove off-screen pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    // score
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillText(score, 10, 50);
}

function placePipes() {
    if (gameOver) return;

    let randomPipeY = -pipeHeight/4 - Math.random() * (pipeHeight/2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        velocityY = -6;

        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
            velocityY = 0;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
