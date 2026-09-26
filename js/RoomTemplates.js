const ROOM_WIDTH = 20;
const ROOM_HEIGHT = 12;
const TILE_SIZE = 16;

const ROOM_TEMPLATES = [
  {
    name: "forest_path",

    ground: {
      row: 9,
      top: "grass",
      fill: ["dirt", "dirt_alt", "dirt_dark"],
    },

    platforms: [
      { x: 6, y: 7, width: 4 },
      { x: 14, y: 5, width: 4 },
    ],

    playerSpawn: {
      x: 2,
      y: 7,
    },

    enemies: [
      {
        type: "greenSlime",
        x: 180,
        y: 124,
      },
      {
        type: "greenSlime",
        x: 250,
        y: 124,
      },
      {
        type: "greenSlime",
        x: 120,
        y: 92,
      },
    ],

    exit: {
      x: 18,
      y: 7,
      width: 2,
      height: 2,
    },
  },

  {
    name: "broken_path",

    ground: {
      row: 9,
      top: "grass",
      fill: ["dirt", "dirt_dark"],
    },

    platforms: [
      { x: 3, y: 7, width: 3 },
      { x: 9, y: 6, width: 4 },
      { x: 15, y: 7, width: 3 },
    ],

    playerSpawn: {
      x: 2,
      y: 7,
    },

    enemies: [
      {
        type: "greenSlime",
        x: 60,
        y: 92,
      },
      {
        type: "greenSlime",
        x: 150,
        y: 76,
      },
      {
        type: "greenSlime",
        x: 240,
        y: 92,
      },
    ],

    exit: {
      x: 18,
      y: 7,
      width: 2,
      height: 2,
    },
  },

  {
    name: "high_ground",

    ground: {
      row: 9,
      top: "grass",
      fill: ["dirt_alt", "dirt", "dirt_dark"],
    },

    platforms: [
      { x: 4, y: 7, width: 3 },
      { x: 9, y: 5, width: 3 },
      { x: 15, y: 6, width: 4 },
    ],

    playerSpawn: {
      x: 2,
      y: 7,
    },

    enemies: [
      {
        type: "greenSlime",
        x: 75,
        y: 92,
      },
      {
        type: "greenSlime",
        x: 150,
        y: 60,
      },
      {
        type: "greenSlime",
        x: 240,
        y: 76,
      },
    ],

    exit: {
      x: 18,
      y: 7,
      width: 2,
      height: 2,
    },
  },
];
