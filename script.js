const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 遊戲元素
const pikachu1 = { x: 100, y: 300, width: 50, height: 50, dy: 0 };
const pikachu2 = { x: 650, y: 300, width: 50, height: 50, dy: 0 };
const ball = { x: 400, y: 200, radius: 10, dx: 3, dy: 3 };
const net = { x: 400, y: 350, width: 10, height: 50 };

// 重力和跳躍
const gravity = 0.5;
const jumpPower = -10;

// 分數
let score1 = 0, score2 = 0;

// 繪製角色
function drawPikachu(pikachu, color) {
    ctx.fillStyle = color;
    ctx.fillRect(pikachu.x, pikachu.y, pikachu.width, pikachu.height);
}

// 繪製球
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

// 繪製網子
function drawNet() {
    ctx.fillStyle = "black";
    ctx.fillRect(net.x, net.y, net.width, net.height);
}

// 更新遊戲邏輯
function update() {
    // 重力影響
    pikachu1.dy += gravity;
    pikachu2.dy += gravity;

    // 更新位置
    pikachu1.y += pikachu1.dy;
    pikachu2.y += pikachu2.dy;
    ball.x += ball.dx;
    ball.y += ball.dy;

    // 邊界檢測（地面）
    if (pikachu1.y + pikachu1.height >= canvas.height) {
        pikachu1.y = canvas.height - pikachu1.height;
        pikachu1.dy = 0;
    }
    if (pikachu2.y + pikachu2.height >= canvas.height) {
        pikachu2.y = canvas.height - pikachu2.height;
        pikachu2.dy = 0;
    }

    // 球碰撞檢測
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx *= -1; // 水平方向反彈
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1; // 垂直方向反彈
    }

    // 碰撞網子
    if (
        ball.x + ball.radius > net.x &&
        ball.x - ball.radius < net.x + net.width &&
        ball.y + ball.radius > net.y
    ) {
        ball.dx *= -1;
    }

    // 碰撞皮卡丘
    if (
        ball.x + ball.radius > pikachu1.x &&
        ball.x - ball.radius < pikachu1.x + pikachu1.width &&
        ball.y + ball.radius > pikachu1.y &&
        ball.y - ball.radius < pikachu1.y + pikachu1.height
    ) {
        ball.dx *= -1;
        ball.dy = -5; // 向上彈
    }

    if (
        ball.x + ball.radius > pikachu2.x &&
        ball.x - ball.radius < pikachu2.x + pikachu2.width &&
        ball.y + ball.radius > pikachu2.y &&
        ball.y - ball.radius < pikachu2.y + pikachu2.height
    ) {
        ball.dx *= -1;
        ball.dy = -5; // 向上彈
    }
}

// 繪製場景
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPikachu(pikachu1, "orange");
    drawPikachu(pikachu2, "blue");
    drawBall();
    drawNet();
}

// 持續更新遊戲
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// 初始化
gameLoop();

// 控制輸入
document.addEventListener("keydown", (e) => {
    if (e.key === "w" && pikachu1.y === canvas.height - pikachu1.height) {
        pikachu1.dy = jumpPower; // 玩家 1 跳躍
    }
    if (e.key === "ArrowUp" && pikachu2.y === canvas.height - pikachu2.height) {
        pikachu2.dy = jumpPower; // 玩家 2 跳躍
    }
});
