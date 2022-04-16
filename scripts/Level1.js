import Player from "./player.js";
import Map from "./map.js";
export default class Level_1 extends Phaser.Scene{
    backGround;
    isGameStart = false;
    player;
    cursors;
    map;
    apple;
    apple_2
    apple_3;
    apple_4;
    apple_5;
    score = 0;
    
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
    this.hadleCollision();
    this.fruitItem();
     
 
  }

   
  


  hadleCollision(){
    this.physics.add.collider(this.player,  this.map.getGroundLayer());
    
   
   
  }


 
  fruitItem(){
    this.anims.create({
      key: "play_fruit",
      frames: this.anims.generateFrameNumbers('fruit_apple', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }),
      frameRate: 24,
      repeat: -1,
    });
    this.apple  = this.add.group();
      this.apple.createMultiple({ key: 'fruit_apple', frame: 0, repeat: 2});
      Phaser.Actions.GridAlign(this.apple.getChildren(), { width:2, height: 3, cellWidth: 38, x: 200, y:120 });
      this.anims.staggerPlay('play_fruit', this.apple.getChildren(), 90);
      this.physics.world.enable(  this.apple );

   this.apple_2 = this.add.group();
     this.apple_2.createMultiple({ key: 'fruit_apple', frame: 0, repeat: 2 });
     Phaser.Actions.GridAlign(this.apple_2.getChildren(), { width:1, height: 2, cellWidth: 38, x: 700, y:180 });
     this.anims.staggerPlay('play_fruit', this.apple_2.getChildren(), 90);
     this.physics.world.enable(this.apple_2);
    
     this.apple_3 = this.add.group();
     this.apple_3.createMultiple({ key: 'fruit_apple', frame: 0, repeat: 1 });
     Phaser.Actions.GridAlign(this.apple_3.getChildren(), { width:0, height: 2, cellWidth: 38, x: 200, y:390 });
     this.anims.staggerPlay('play_fruit', this.apple_3.getChildren(), 90);
     this.physics.world.enable(this.apple_3);
    this.isGameStart = true;
    this.apple_4 = this.add.group();
     this.apple_4.createMultiple({ key: 'fruit_apple', frame: 0, repeat: 1 });
     Phaser.Actions.GridAlign(this.apple_4.getChildren(), { width:0, height: 2, cellWidth: 38, x: 370, y:350 });
     this.anims.staggerPlay('play_fruit', this.apple_4.getChildren(), 90);
     this.physics.world.enable(this.apple_4);
    this.isGameStart = true;
  
  
    
    this.physics.add.overlap(this.player,   this.apple , this.collect,null,this);
    this.physics.add.overlap(this.player,   this.apple_2 , this.collect_two,null,this);
    this.physics.add.overlap(this.player,   this.apple_3 , this.collect_three,null,this);
    this.physics.add.overlap(this.player,   this.apple_4 , this.collect_four,null,this);
    
    }
    collect(player,fruit_apple){
      //  Hide the sprite
      this.apple .killAndHide(fruit_apple);
      
      //  And disable the body
      fruit_apple.body.enable = false;
      this.score += 10;
           console.log("overlap");
           console.log("score=>",this.score);
       }
       collect_two(player,fruit_apple){
           //  Hide the sprite
     this.apple_2.killAndHide(fruit_apple);
      
      //  And disable the body
      fruit_apple.body.enable = false;
      this.score += 10;
           console.log("overlap");
           console.log("score=>",this.score);
       }
       collect_three(player,fruit_apple){
        //  Hide the sprite
     this.apple_3.killAndHide(fruit_apple);
   
   //  And disable the body
   fruit_apple.body.enable = false;
   this.score += 10;
        console.log("overlap");
        console.log("score=>",this.score);
    }
    collect_four(player,fruit_apple){
      //  Hide the sprite
   this.apple_4.killAndHide(fruit_apple);
 
 //  And disable the body
 fruit_apple.body.enable = false;
 this.score += 10;
      console.log("overlap");
      console.log("score=>",this.score);
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
  
    this.backGround.tilePositionX -= 0.5;
    
  }

}