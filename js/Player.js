class Player extends Entity {
  constructor(x, y) {
    super(x, y, 20, 28);

    this.spriteWidth = 32;
    this.spriteHeight = 32;

    this.speed = 100;
    this.jumpStrength = 300;

    this.isRolling = false;
    this.rollSpeed = 180;

    this.isAttacking = false;
    this.attackDuration = 0.15;
    this.attackTimer = 0;

    this.attackDamage = 10;
    this.attackRange = 24;
    this.hasHitEnemy = new Set();

    this.maxHealth = 100;
    this.health = this.maxHealth;

    this.isInvulnerable = false;
    this.invDuration = 0.75;
    this.invTimer = 0;

    this.isHurt = false;
    this.hurtTimer = 0;
    this.hurtDuration = 0.2;

    this.hurtKB = 100;

    this.isDead = false;

    this.deathTimer = 0;
    this.deathDuration = 0.4;
    
    this.facingDir = 1;

    this.image = new Image();
    this.image.src = "assests/sprites/knight.png";

    this.animations = createPlayerAnimations(this.image);
    this.currentAnimation = "idle";
  }

  update(deltaTime, input, platforms) {

    if (this.isDead) {
      this.velocityX = 0;
      this.velocityY = 0;

      this.setAnimation("death");
      this.animations.death.update(deltaTime);

      this.deathTimer += deltaTime;
      return;
    }

    if (this.isHurt) {
      this.hurtTimer -= deltaTime;

      this.velocityX *= 0.9;

      this.updatePhysics(deltaTime, platforms);
            
      this.setAnimation("hit");


      this.animations[this.currentAnimation].update(deltaTime);

      if (this.hurtTimer <= 0) {
        this.hurtTimer = 0;
        this.isHurt = false;
        this.velocityX = 0;
      }

      return;
    }

    if (!this.isRolling) {
      this.velocityX = 0;

      if (input.isPressed("ArrowLeft")) {
        this.velocityX = -this.speed;
        this.facingDir = -1;
      }

      if (input.isPressed("ArrowRight")) {
        this.velocityX = this.speed;
        this.facingDir = 1;
      }

      if (input.isJustPressed("Space") && this.isGrounded) {
        this.velocityY = -this.jumpStrength;
        this.isGrounded = false;
      }

      if (input.isJustPressed("KeyX") && !this.isAttacking) {
        this.isAttacking = true;
        this.attackTimer = this.attackDuration;
        this.hasHitEnemy.clear();
      }

    }

    this.updatePhysics(deltaTime, platforms);

    this.x = Math.max(
        0,
        Math.min(
            this.x,
            320 - this.width
        )
    );

    if (
      input.isJustPressed("ShiftLeft") &&
      this.isGrounded &&
      !this.isRolling
    ) {
      this.isRolling = true;
      this.velocityX = this.facingDir * this.rollSpeed;
      this.setAnimation("roll");
    }

    if (this.isAttacking) {
        this.attackTimer -= deltaTime;

        if (this.attackTimer <= 0) {
            this.attackTimer = 0;
            this.isAttacking = false;
        }
    }

    if (this.isRolling) {
      this.setAnimation("roll");
    } else if (!this.isGrounded) {
      if (this.velocityY < 0) {
        this.setAnimation("jump");
      } else {
        this.setAnimation("fall");
      }
    } else if (this.velocityX === 0) {
      this.setAnimation("idle");
    } else {
      this.setAnimation("run");
    }

    this.animations[this.currentAnimation].update(deltaTime);

    if (this.isRolling && this.animations.roll.isFinished()) {
      this.isRolling = false;
    }

    if (this.isInvulnerable) {
      this.invTimer -= deltaTime;

      if (this.invTimer <= 0) {
        this.invTimer = 0;
        this.isInvulnerable = false;
      }
    }
  }

  takeDamage(amount, damageDirection) {
    if (this.isInvulnerable || this.isDead) {
      return;
    }

    this.health -= amount;

    if (this.health < 0) {
      this.health = 0;
      this.isDead = true;
      this.isHurt = false;
      this.isRolling = false;
      return;
    }

    this.isInvulnerable = true;
    this.invTimer = this.invDuration;

    this.isHurt = true;
    this.hurtTimer = this.hurtDuration;

    this.velocityX = damageDirection * this.hurtKB;
    this.velocityY = -80;

  }

  getAttackHitbox() {
    const attackWidth = this.attackRange;

    if (this.facingDir === 1) {
        return {
            x: this.x + this.width,
            y: this.y + 4,
            width: attackWidth,
            height: this.height - 8
        };
    }

    return {
        x: this.x - attackWidth,
        y: this.y + 4,
        width: attackWidth,
        height: this.height - 8
    };
  }

  isAttackingEnemy(enemy) {
    if (!this.isAttacking) {
        return false;
    }

    const attackBox = this.getAttackHitbox();

    return (
        attackBox.x < enemy.x + enemy.width &&
        attackBox.x + attackBox.width > enemy.x &&
        attackBox.y < enemy.y + enemy.height &&
        attackBox.y + attackBox.height > enemy.y
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

    if (this.facingDir === -1) {
      context.scale(-1, 1);

      animation.draw(
        context,
        -Math.round(this.x + this.spriteWidth - 6),
        Math.round(this.y),
        this.spriteWidth,
        this.spriteHeight,
      );
    } else {
      animation.draw(
        context,
        Math.round(this.x - 6),
        Math.round(this.y),
        this.spriteWidth,
        this.spriteHeight,
      );
    }

    context.restore();
  }
}
