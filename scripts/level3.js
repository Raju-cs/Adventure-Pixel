import Map from "./map.js";
import Player from "./player.js";

export default class Level_3 extends Phaser.Scene{
    backGround;
    map;
    isGameStart = false;
    player;
    cursors;
    constructor(){
        super('level3');
    }
    init(){
        this.isGameStart = false;  
    }
    create(){
        console.log('level3');
        this.backGround = this.add.tileSprite(0, 0, 920, 508, 'Bg_Pink').setOrigin(0, 0);
        this.map = new Map(this, "map3") // map1 create
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
          
    }

    hadleCollision(){
        this.physics.add.collider(this.player,  this.map.getGroundLayer());
        
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