const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = false;

canvas.width = 320;
canvas.height = 180;

const restartButton = {
  x: 120,
  y: 105,
  width: 80,
  height: 24,
};

async function startGame() {
  try {
    const response = await fetch("assests/data/tiles.json");

    if (!response.ok) {
      throw new Error(`Failed to load tiles.json: ${response.status}`);
    }

    const tiles = await response.json();

    const input = new Input();

    let currentRoomIndex = 0;

    let room = new Room(ROOM_TEMPLATES[currentRoomIndex], tiles);

    let player = new Player(room.playerSpawn.x, room.playerSpawn.y);

    let gameState = "playing";

    function loadRoom(index) {
      currentRoomIndex = index;

      room = new Room(ROOM_TEMPLATES[currentRoomIndex], tiles);

      player = new Player(room.playerSpawn.x, room.playerSpawn.y);
    }

    const game = {
      lastTime: 0,

      update(deltaTime) {
        if (gameState === "gameOver") {
          if (input.isJustPressed("KeyR")) {
            location.reload();
          }
          return;
        }

        player.update(deltaTime, input, room.platforms);

        for (const enemy of room.enemies) {
          if (!enemy.isDead) {
            enemy.update(deltaTime, room.platforms, player);
          }

          if (
            !enemy.isDead &&
            player.isAttackingEnemy(enemy) &&
            !player.hasHitEnemy.has(enemy)
          ) {
            enemy.takeDamage(player.attackDamage, player.facingDir);
            player.hasHitEnemy.add(enemy);
          }

          if (
            !enemy.isDead &&
            enemy.damageCooldown <= 0 &&
            enemy.isTouchingPlayer(player)
          ) {
            const damageDirection = player.x < enemy.x ? -1 : 1;
            player.takeDamage(enemy.damage, damageDirection);

            enemy.damageCooldown = enemy.dcDuration;
          }
        }

        if (room.isCleared()) {
          const exit = room.exit;

          const touchingExit =
            player.x < exit.x + exit.width &&
            player.x + player.width > exit.x &&
            player.y < exit.y + exit.height &&
            player.y + player.height > exit.y;

          if (touchingExit) {
            if (currentRoomIndex < ROOM_TEMPLATES.length - 1) {
              loadRoom(currentRoomIndex + 1);
            } else {
              gameState = "won";
            }
          }
        }

        if (player.isDead && player.animations.death.isFinished()) {
          gameState = "gameOver";
        }
      },

      draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        room.draw(context);
        player.draw(context);

        for (const enemy of room.enemies) {
          if (!enemy.isDead) {
            enemy.draw(context);
          }
        }

        if (room.isCleared()) {
          context.fillStyle = "white";
          context.textAlign = "center";
          context.font = "12px PixelOperator";

          context.fillText("ROOM CLEARED", canvas.width / 2, 25);
        }

        if (gameState === "gameOver") {
          context.fillStyle = "rgba(0, 0, 0, 0.6)";
          context.fillRect(0, 0, canvas.width, canvas.height);

          context.fillStyle = "RED";
          context.textAlign = "center";
          context.font = "20px PixelOperator";

          context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

          context.fillStyle = "#333";
          context.fillRect(
            restartButton.x,
            restartButton.y,
            restartButton.width,
            restartButton.height,
          );

          context.strokeStyle = "white";
          context.strokeRect(
            restartButton.x,
            restartButton.y,
            restartButton.width,
            restartButton.height,
          );

          context.fillStyle = "white";
          context.font = "10px PixelOperator";

          context.fillText("RESTART", canvas.width / 2, restartButton.y + 16);
        }

        if (gameState === "won") {
          context.fillStyle = "rgba(0, 0, 0, 0.6)";
          context.fillRect(0, 0, canvas.width, canvas.height);

          context.fillStyle = "white";
          context.textAlign = "center";
          context.font = "20px PixelOperator";

          context.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
        }
      },
    };

    canvas.addEventListener("click", (event) => {
      if (gameState !== "gameOver") {
        return;
      }

      const rect = canvas.getBoundingClientRect();

      const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);

      const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

      const clicked =
        mouseX >= restartButton.x &&
        mouseX <= restartButton.x + restartButton.width &&
        mouseY >= restartButton.y &&
        mouseY <= restartButton.y + restartButton.height;

      if (clicked) {
        location.reload();
      }
    });

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
