const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = false;

canvas.width = 320;
canvas.height = 180;

async function startGame() {
  try {
    const response = await fetch("assests/data/tiles.json");

    if (!response.ok) {
      throw new Error(`Failed to load tiles.json: ${response.status}`);
    }

    const tiles = await response.json();

    const input = new Input();

    const room = new Room(ROOM_TEMPLATES[0], tiles);

    const player = new Player(room.playerSpawn.x, room.playerSpawn.y);

    const slime = new GreenSlime(180, 123);

    const game = {
      lastTime: 0,

      update(deltaTime) {
        player.update(deltaTime, input, room.platforms);

        slime.update(deltaTime, room.platforms, player);

        if (player.isAttackingEnemy(slime) && !player.hasHitEnemy) {
          slime.takeDamage(player.attackDamage);
          player.hasHitEnemy = true;
        }
      },

      draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        room.draw(context);
        player.draw(context);
        slime.draw(context);
      },
    };

    function gameLoop(currentTime) {
      const deltaTime =
        game.lastTime === 0
          ? 0
          : Math.min((currentTime - game.lastTime) / 1000, 0.05);

      game.lastTime = currentTime;

      game.update(deltaTime);

      input.endFrame();
      game.draw();

      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error("Failed to start RiftBound:", error);
  }
}

startGame();
