class Animation {
    constructor(image, frameWidth, frameHeight, frames, frameDuration, loop = true) {
        this.image = image;

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        this.frames = frames;
        this.frameDuration = frameDuration;
        this.loop = loop;

        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.frameDuration) {
            this.elapsedTime -= this.frameDuration;

            this.currentFrame++;

            if (this.currentFrame >= this.frames.length) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = this.frames.length - 1;
                }
            }
        }
    }

    isFinished() {
        return (
            !this.loop && 
            this.currentFrame === this.frames.length - 1
        );
    }

    reset() {
        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    draw(context, x, y, width, height) {
        const [col, row] = this.frames[this.currentFrame];

        const sourceX = col * this.frameWidth;
        const sourceY = row * this.frameHeight;

        context.drawImage(
            this.image, 

            sourceX,
            sourceY,
            this.frameWidth,
            this.frameHeight, 

            x,
            y,
            width,
            height
        );
    }
}