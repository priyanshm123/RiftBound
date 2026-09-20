class Animation {
    constructor(image, frameWidth, frameHeight, frameCount, frameDuration, row) {
        this.image = image;

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        this.frameCount = frameCount;
        this.frameDuration = frameDuration;

        this.row = row;

        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.frameDuration) {
            this.elapsedTime -= this.frameDuration;

            this.currentFrame++;

            if (this.currentFrame >= this.frameCount) {
                this.currentFrame = 0;
            }
        }
    }

    reset() {
        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    draw(context, x, y, width, height) {
        const sourceX = this.currentFrame * this.frameWidth;
        const sourceY = this.row * this.frameHeight;

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