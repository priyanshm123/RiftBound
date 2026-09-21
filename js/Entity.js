class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.velocityX = 0;
        this.velocityY = 0;

        this.gravity = 800;
        this.isGrounded = false;
    }

    updatePhysics(deltaTime, platforms) {
        const previousY = this.y;

        if (!this.isGrounded) {
            this.velocityY += this.gravity * deltaTime;
        }

        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        this.isGrounded = false;

        for (const platform of platforms) {
            if (this.checkPlatformCollision(platform, previousY)) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.isGrounded = true;
            }
        }
    }

    checkPlatformCollision(platform, previousY) {
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

    update(deltaTime, platforms) {
        this.updatePhysics(deltaTime, platforms);
    }

    draw(context) {}
}