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

        this.image = new Image();
        this.image.src = "assests/sprites/knight.png"

        this.idleAnimation = new Animation(
            this.image,
            32,
            32,
            4,
            0.15,
            0
        )

    }

    update(deltaTime, input, platforms) {
        const previousY = this.y;

        this.idleAnimation.update(deltaTime);

        this.velocityX = 0;

        if (input.isPressed("ArrowLeft")) {
            this.velocityX = -this.speed;
        }

        if (input.isPressed("ArrowRight")) {
            this.velocityX = this.speed;
        }

        if (
            input.isJustPressed("Space") && 
            this.isGrounded
        ) {
            this.velocityY = -this.jumpStrength;
            this.isGrounded = false;
        }

        this.velocityY += this.gravity * deltaTime;
        
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        this.isGrounded = false;

        for (const platform of platforms) {
            if (this.checkPlatformCollison(platform, previousY)) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.isGrounded = true;
            }
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

    draw(context) {
       this.idleAnimation.draw(
            context,
            Math.round(this.x - 6),
            Math.round(this.y),
            this.spriteWidth,
            this.spriteHeight
       );
    }
}