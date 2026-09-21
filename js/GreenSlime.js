class GreenSlime extends Enemy {
  constructor(x, y) {
    super(x, y, 20, 20, 30, 10);

    this.speed = 30;
    this.direction = 1;

    this.state = "patrol";
    this.isHit = false;
    
    this.detectionRange = 80;
    this.verticalTolerance = 4;

    this.hitTimer = 0;
    this.hitDuration = 0.2;

    this.image = new Image();
    this.image.src = "assests/sprites/slime_green.png";

    this.animations = {
      idle: new Animation(
        this.image,
        24,
        24,
        [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
        ],
        0.15,
      ),

      move: new Animation(
        this.image,
        24,
        24,
        [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
        ],
        0.12,
      ),

      hit: new Animation(
        this.image,
        24,
        24,
        [
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
        ],
        0.1,
        false,
      ),
    };

    this.currentAnimation = "idle";
  }

  update(deltaTime, platforms, player) {

    if (this.isHit) {
        this.velocityX = 0;

        this.hitTimer -= deltaTime;

        if (this.hitTimer <= 0) {
            this.hitTimer = 0;
            this.isHit = false;
        }

        this.updatePhysics(deltaTime, platforms);

        this.animations[this.currentAnimation].update(deltaTime);

        return;
    } 
    const detected = this.canDetectPlayer(player);

    const sameHeight = this.isAtPlayerHeight(player);

    if (detected && sameHeight) {
      this.state = "chase";
    } else {
      this.state = "patrol";
    }

    if (this.state === "chase") {
      const slimeCenterX = this.x + this.width / 2;

      const playerCenterX = player.x + player.width / 2;

      const horizontalDistance = playerCenterX - slimeCenterX;

      const stopDistance = 4;

      if (Math.abs(horizontalDistance) <= stopDistance) {
        this.velocityX = 0;
        this.setAnimation("idle");
      } else {
        if (horizontalDistance < 0) {
          this.direction = -1;
        } else {
          this.direction = 1;
        }

        this.velocityX = this.direction * this.speed;

        this.setAnimation("move");
      }
    } else {
      if (this.isEdgeAhead(platforms)) {
        this.direction *= -1;
      }

      this.velocityX = this.direction * this.speed;

      this.setAnimation("move");
    }

    this.updatePhysics(deltaTime, platforms);

    this.animations[this.currentAnimation].update(deltaTime);
  }

  takeDamage(amount) {
    super.takeDamage(amount);

    if (this.isDead) {
        return;
    }

    this.isHit = true;
    this.hitTimer = this.hitDuration;

    this.setAnimation("hit");
  }

  isEdgeAhead(platforms) {
    const lookAhead = this.direction * 2;

    const footX =
      this.direction === 1
        ? this.x + this.width + lookAhead
        : this.x + lookAhead;

    const footY = this.y + this.height;

    for (const platform of platforms) {
      const sameHeight = platform.y >= footY - 2 && platform.y <= footY + 4;

      const insideHorizontal =
        footX >= platform.x && footX <= platform.x + platform.width;

      if (sameHeight && insideHorizontal) {
        return false;
      }
    }

    return true;
  }

  isAtPlayerHeight(player) {

    const slimeCenterY =
        this.y + this.height / 2;

    const playerCenterY =
        player.y + player.height / 2;

    return (
        Math.abs(slimeCenterY - playerCenterY) <=
            this.verticalTolerance
    );
}

  canDetectPlayer(player) {
    const slimeCenterX = this.x + this.width / 2;

    const slimeCenterY = this.y + this.height / 2;

    const playerCenterX = player.x + player.width / 2;

    const playerCenterY = player.y + player.height / 2;

    const distanceX = playerCenterX - slimeCenterX;

    const distanceY = playerCenterY - slimeCenterY;

    return (
      Math.abs(distanceX) <= this.detectionRange &&
      Math.abs(distanceY) <= this.detectionRange
    );
  }

  setAnimation(name) {
    if (this.currentAnimation !== name) {
      this.currentAnimation = name;
      this.animations[name].reset();
    }
  }

  draw(context) {
    const animation = this.animations[this.currentAnimation];

    context.save();

    if (this.direction === -1) {
      context.scale(-1, 1);

      animation.draw(
        context,
        -Math.round(this.x + this.width + 2),
        Math.round(this.y - 2),
        24,
        24,
      );
    } else {
      animation.draw(
        context,
        Math.round(this.x - 2),
        Math.round(this.y - 2),
        24,
        24,
      );
    }

    context.restore();
  }
}
