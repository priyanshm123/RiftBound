const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 180;

const game = {
    lastTime: 0, 

    update(deltaTime) {

    }, 

    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "white";
        context.fillRect(10, 10, 20, 20);
    }

};

function gameLoop(currentTime) {
    const deltaTime = currentTime - game.lastTime;

    game.lastTime = currentTime;

    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
