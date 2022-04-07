import Loader from "./load.js";
import Level_1 from "./Level1.js";
const config = {
    width: 987,
    height: 476,
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: "#b8e2fc",
    parent: "game",
    physics: {
      default: "arcade",
      arcade: {
        fps: 60,
        gravity: { y: 0 },
        debug: true
      },
    },
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      // mode: Phaser.Scale.FIT,
      parent: "root",
    },
    scene: [Loader,Level_1],
  };
  
  const game = new Phaser.Game(config);