class GreenSlime extends Enemy {
    constructor(x, y) {
        super(x, y, 20, 20, 30, 10);

        this.speed = 30;
        this.direction = 1;

        this.state = "patrol";
        this.detectionRange = 80;

        this.image = new Image();
        this.image.src = "assests/sprites/slime_green.png"

        this.animations = {
            idle: new Animation(
                this.image,
                24,
                24,
                [
                    [0, 0],
                    [1, 0],
                    [2, 0],
                    [3, 0]
                ],
                0.15
            ),

            move: new Animation(
                this.image,
                24,
                24,
                [
                    [0, 1],
                    [1, 1],
                    [2, 1],
                    [3, 1]
                ],
                0.12
            ),

            hit: new Animation(
                this.image,
                24,
                24,
                [
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [3, 2]
                ]
            )
        };

        this.currentAnimation = "idle";
    }

    update(deltaTime, platforms, player) {

        if (this.canDetectPlayer(player)) {
            this.state = "chase";
        } else {
            this.state = "patrol";
        }

        if (this.state = "chase") {
            if (player.x < this.x) {
                this.direction = -1;
            } else {
                this.direction = 1;
            }
        } else {
            if (this.isEdgeAhead(platforms)) {
                this.direction *= -1;
            }
        }

        this.velocityX = this.direction * this.speed;

        this.updatePhysics(deltaTime, platforms);

        this.setAnimation("move");

        this.animations[this.currentAnimation].update(deltaTime);
    }

    isEdgeAhead(platforms) {
        const lookAhead = this.direction * 2;

        const footX = 
            this.direction === 1
            ? this.x + this.width + lookAhead
            : this.x + lookAhead;

        const footY = this.y + this.width + 2;

        for (const platform of platforms) {

            const sameHeight =
                Math.abs(platform.y - footY) < 2;

            const insideHorizontal = 
            footX >= platform.x && 
            footX <= platform.x + platform.width;

            if (sameHeight && insideHorizontal) {
                return false;
            }
        }

        return true;
    }

    canDetectPlayer(player) {
        const distanceX = player.x - this.x;

        return Math.abs(distanceX) <= this.detectionRange;
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
                24
            );
        } else {

            animation.draw(
                context,
                Math.round(this.x - 2),
                Math.round(this.y - 2),
                24,
                24
            );
        }

        context.restore();
    }
}