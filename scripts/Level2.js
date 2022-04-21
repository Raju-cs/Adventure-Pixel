import Player from "./player.js";
import Map from "./map.js";
export default class Level_2 extends Phaser.Scene{
    backGround;
    map;
    cursors;
    isGameStart = false;
    sawOn;

      constructor(){
        super("level2");
      }

      init(){
        this.isGameStart = false; 
     }
      create(){
          console.log('level2');
          this.backGround =   this.add.tileSprite(0, 0, 900, 508, 'Bg_green').setOrigin(0, 0);
          this.map = new Map(this, "map2"); // map1 create
          this.cursors = this.input.keyboard.createCursorKeys(); // enable keyboard player movement
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
          this.anims.create({
            key: "checkpoint",
            frames: this.anims.generateFrameNumbers('checkpoint', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }),
            frameRate: 8,
            repeat: -1,
          });
          this.player = new Player(this, 80, 250, "run"); //add player in game world
          this.isGameStart = true;
          this.hadleCollision();
          this.sawAnims();



      }
      hadleCollision(){
        this.physics.add.collider(this.player,  this.map.getGroundLayer());
    
      }
      sawAnims(){
        this.anims.create({
          key: "sawOn_play",
          frames: this.anims.generateFrameNumbers('sawOn', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
          frameRate: 8,
          repeat: -1,
        });

     this.sawOn = this.add.sprite(215,407,"sawOff");
     this.sawOn.anims.play("sawOn_play", true);
     this.physics.world.enable(this.sawOn);
     this.tweens.timeline({
      targets: this.sawOn,
      ease: 'Power2',
      duration: 1000,
      
      tweens: [
      {
          x: 160
      },
      {
          y: 355
      },
      {
          x: 232
      },
      {
          y: 412
      }],
     
     loop:-1
  });
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
            }else if( this.cursors.up.isDown  && this.cursors.left.isDown){
              this.player.anims.play("jump", true);
            
            }else if(this.cursors.up.isDown  && this.cursors.right.isDown){
              this.player.anims.play("jump", true);
              
            }
          }
        this.backGround.tilePositionY -= 0.5;
        
    }
}