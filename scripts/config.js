
const config = {
    width: 995,
    height: 500,
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
    scene: [],
  };
  
  const game = new Phaser.Game(config);