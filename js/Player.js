class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        //Collision box
        this.width = 20;
        this.height = 28;

        //Player dimensions
        this.spriteWidth = 32;
        this.spriteHeight = 32;

        this.speed = 100;
        this.jumpStrength = 300;

        this.velocityX = 0;
        this.velocityY = 0;

        this.gravity = 800;

        this.isGrounded = false;

        this.isRolling = false;
        this.rollSpeed = 180; 

        this.facingDir = 1;

        this.image = new Image();
        this.image.src = "assests/sprites/knight.png"

        this.animations = createPlayerAnimations(this.image);
        this.currentAnimation = "idle";
    }

    update(deltaTime, input, platforms) {
        const previousY = this.y;

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
        }

        if (
            input.isJustPressed("Space") && 
            this.isGrounded
        ) {
            this.velocityY = -this.jumpStrength;
            this.isGrounded = false;
        }

        if (
            input.isJustPressed("ShiftLeft") &&
            this.isGrounded &&
            !this.isRolling
        ) {
            this.isRolling = true;
            this.velocityX = this.facingDir * this.rollSpeed;
            this.setAnimation("roll");
        }

        if (!this.isGrounded) {
            this.velocityY += this.gravity * deltaTime;

        }
        
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        this.x = Math.max(
            0,
            Math.min(this.x, 320 - this.width)
        );

        this.isGrounded = false;

        for (const platform of platforms) {
            if (this.checkPlatformCollison(platform, previousY)) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.isGrounded = true;
            }
        }

        if (this.isRolling) {
            this.setAnimation("roll");
        }else if (!this.isGrounded) {
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

        if (
            this.isRolling &&
            this.animations.roll.isFinished()
        ) {
            this.isRolling = false;
        }

    }

    checkPlatformCollison(platform, previousY) {
        const previousBottom = previousY + this.height;
        const currentBottom = this.y + this.height;

        const horizontalOverlap = 
            this.x < platform.x + platform.width &&
            this.x + this.width > platform.x;

        const crossedPlatform = 
            previousBottom <= platform.y &&
            currentBottom >= platform.y;

        return (
            this.velocityY >= 0 &&
            horizontalOverlap && 
            crossedPlatform
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
                this.spriteHeight
            );
       } else {
            animation.draw(
                context,
                Math.round(this.x - 6),
                Math.round(this.y),
                this.spriteWidth,
                this.spriteHeight
            );
       }

       context.restore();
    }
}