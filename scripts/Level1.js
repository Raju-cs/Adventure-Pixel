import Player from "./player.js";
import Map from "./map.js";
export default class Level_1 extends Phaser.Scene{
    backGround;
    isGameStart = false;
    player;
    cursors;
    map;
     constructor(){
         super("level1");
     }

     init(){
        this.isGameStart = false; 
     }

  create(){
      console.log("Level 1");
   this.map = new Map(this, "map1"); // map1 create
    this.backGround =   this.add.tileSprite(0, 0, 1000, 500, 'Bg_brown').setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys(); // enable keyboard player movement
    // let platforms =  this.physics.add.staticGroup();
    // platforms.create(50,490,"Platforms").setScale(8).refreshBody();
    // platforms.create(400, 400,"Platforms");

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers('Idle', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers('run', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers('jump', { frames: 0 }),
      frameRate: 8,
      repeat: -1,
    });
   
    this.player = new Player(this, 80, 250, "run"); //add player in game world
    this.physics.add.collider(this.player, this.map.getGroundLayer());
    // this.physics.add.collider(this.player, this.map.getGroundLayer());
    
    this.isGameStart = true;
   
  }



  update(){
    if(this.isGameStart){
      if (this.cursors.left.isDown) {// press keboard right arrow button player move left
        this.player.flipX = true;
        this.player.setVelocityX(-160);
        this.player.anims.play("run", true);
      } else  if (this.cursors.right.isDown) {// press keboard left arrow button player move left
        this.player.flipX = false;
        this.player.setVelocityX(160);
        this.player.anims.play("run", true);
      }else  {
        // no press any button player con't move
        this.player.setVelocityX(0); // set player velocity 0 ,player can't move
        this.player.anims.play("idle", true);
        this.player.anims.stop(); // stop the animations
      }

      if (this.cursors.up.isDown && this.player.body.blocked.down ) {
        this.player.anims.play("jump", true);
        this.player.setVelocityY(-250); // set player jump
      }
    }
  
    this.backGround.tilePositionX -= 0.5;
  }

}