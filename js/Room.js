class Room {
    constructor(template, tiles) {
        this.template = template;
        this.tiles = tiles;

        this.width = ROOM_WIDTH;
        this.height = ROOM_HEIGHT;
        this.tileSize = TILE_SIZE;

        this.image = new Image();
        this.image.src = "assests/sprites/world_tileset.png";

        this.tileMap = this.createTileMap();
        this.platforms = this.createPlatforms();

        this.playerSpawn = {
            x: template.playerSpawn.x * this.tileSize,
            y: template.playerSpawn.y * this.tileSize
        };
    }

    createTileMap() {
        const map = Array.from(
            { length: this.height },
            () => Array(this.width).fill(this.tiles.empty)
        );

        const ground = this.template.ground;

        for (let x = 0; x < this.width; x++) {
            map[ground.row][x] = this.tiles[ground.top];

            for (let y = ground.row + 1; y < this.height; y++) {
                const fillIndex =
                    (y - ground.row - 1) % ground.fill.length;

                map[y][x] = this.tiles[
                    ground.fill[fillIndex]
                ];
            }
        }

        return map;
    }

    createPlatforms() {
        const ground = this.template.ground;

        const platforms = [
            new Platform(
                0,
                ground.row * this.tileSize,
                this.width * this.tileSize,
                this.tileSize
            )
        ];

        for (const data of this.template.platforms) {
            platforms.push(
                new Platform(
                    data.x * this.tileSize,
                    data.y * this.tileSize,
                    data.width * this.tileSize,
                    this.tileSize
                )
            );
        }

        return platforms;
    }

    draw(ctx) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tile = this.tileMap[y][x];

                if (tile === this.tiles.empty) {
                    continue;
                }

                const sourceColumn = tile % 16;
                const sourceRow = Math.floor(tile / 16);

                ctx.drawImage(
                    this.image,
                    sourceColumn * 16,
                    sourceRow * 16,
                    16,
                    16,
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }

        for (const platform of this.platforms) {
            platform.draw(ctx);
        }
    }
}