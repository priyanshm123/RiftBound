class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = "assests/sprites/platforms.png";
    }

    draw(context) {
        const tileWidth = 32;
        const tileHeight = 16;

        for (let x = 0; x < this.width; x += tileWidth) {
            const drawWidth = Math.min(tileWidth, this.width - x);

            context.drawImage(
                this.image,

                0, 0,
                drawWidth, tileHeight, 

                this.x + x,
                this.y,
                drawWidth,
                tileHeight
            );
        }
    }
}