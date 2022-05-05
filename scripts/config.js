import Loader from "./load.js";
import Level_1 from "./Level1.js";
import Level_2 from "./Level2.js";
import Level_3 from "./Level3.js";
import Level_4 from "./Level4.js";
const config = {
    width: 915,
    height: 505,
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
        debug: false
      },
    },
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      // mode: Phaser.Scale.FIT,
      parent: "root", 
    },
    scene: [Loader,Level_1,Level_2,Level_3,Level_4],
  };
  
  const game = new Phaser.Game(config);