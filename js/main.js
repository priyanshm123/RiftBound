const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = false;

canvas.width = 320;
canvas.height = 180;

const input = new Input();
const player = new Player(50, 50);

const platforms = [
    new Platform(0, 150, 320, 30),
    new Platform(100, 110, 80, 10),
    new Platform(220, 80, 70, 10)
];

const game = {
    lastTime: 0, 

    update(deltaTime) {
        player.update(deltaTime, input, platforms);

    }, 

    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (const platform of platforms) {
            platform.draw(context);
        }

        player.draw(context);
    }

};

function gameLoop(currentTime) {
    const deltaTime = (currentTime - game.lastTime) / 1000;

    game.lastTime = currentTime;

    game.update(deltaTime);
    input.endFrame();
    game.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
