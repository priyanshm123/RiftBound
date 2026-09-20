const TILE = {
    EMPTY: -1,

    GRASS_TOP: 0,
    DIRT_1: 1,
    DIRT_2: 16,
    DIRT_3: 17
};

class Room {
    constructor() {
        this.tileSize = 16;

       this.tiles = [
            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY,
            TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY, TILE.EMPTY],

            [TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP,
            TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP,
            TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP,
            TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP, TILE.GRASS_TOP],

            [TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2,
            TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1,
            TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3,
            TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2],

            [TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3,
            TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2,
            TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1,
            TILE.DIRT_2, TILE.DIRT_3, TILE.DIRT_1, TILE.DIRT_2, TILE.DIRT_3]
        ];

        this.platformData = [
            {
                x: 0,
                y: 144,
                width: 320,
                height: 32
            },
            {
                x: 96,
                y: 112,
                width: 80,
                height: 16
            },
            {
                x: 224,
                y: 80,
                width: 80,
                height: 16
            }
        ];

        this.image = new Image();
        this.image.src = "assests/sprites/world_tileset.png";
    }

    createPlatforms() {
        return this.platformData.map(
            platform => 
                new Platform(
                    platform.x,
                    platform.y,
                    platform.width,
                    platform.height
                )
        );
    }

    draw(context) {
        for (let row = 0; row < this.tiles.length; row++) {
            for (let col = 0; col < this.tiles[row].length; col++) {
                const tile = this.tiles[row][col];

                if (tile === TILE.EMPTY) {
                    continue;
                }

                const sourceColumn = tile % 16;
                const sourceRow = Math.floor(tile / 16);

                context.drawImage(
                    this.image,

                    sourceColumn * this.tileSize,
                    sourceRow * this.tileSize,
                    this.tileSize,
                    this.tileSize,

                    col * this.tileSize,
                    row * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }
}