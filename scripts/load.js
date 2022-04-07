

export default class Loader extends Phaser.Scene{
    constructor(){
        super("loader");
    }

    init(){
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
    
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x55a630, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);
    
        const loadingText = this.make
          .text({
            x: width / 2,
            y: height / 2 + 100,
            text: "Loading...",
            style: {
              font: "24px Chewy",
              fill: "black",
            },
          })
          .setOrigin(0.5);
    
        const percentText = this.add.text(width / 2, height / 2 + 25, "0%", {
          font: "20px Chewy",
          fill: "#f8ffe5",
        });
        percentText.setOrigin(0.5);
    
        this.load.on(
          "progress",
          (value) => {
            percentText.setText(parseInt(value * 100) + "%");
            progressBar.clear();
            progressBar.fillStyle(0x2b9348, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
          },
          this
        );
    
        this.load.on(
          "complete",
          () => {
            this.scene.start("level1");
          },
          this
        );
    
        // this.load.on(
        //   "filecomplete-image-logo",
        //   (key, type, data) => {
        //     // Your handler code
        //     // console.log(key, type, data);
        //     this.add
        //       .image(width / 2, height / 2 - 120, "logo")
        //       .setDepth(10)
        //       .setScale(1);
        //   },
        //   this
        // );
    }

    preload(){
       this.load.image("Bg_brown","assets/Background/Brown.png");
       this.load.image("Platforms","assets/Background/Grey On (32x8).png");
       this.load.spritesheet('Idle', 'assets/Background/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
       this.load.spritesheet('run', 'assets/Background/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
       this.load.spritesheet('jump', 'assets/Background/Jump (32x32).png', { frameWidth: 32, frameHeight: 32 });
       

       // load map
       this.load.tilemapTiledJSON("map1", "assets/Tilemap/one.json");
       this.load.image("map-tiles", "assets/Tilemap/Terrain.png");
    }

} 