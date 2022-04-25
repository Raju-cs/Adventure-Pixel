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
    scoreText;
    coin;
    checkpoint;
    coin_pick;
    
    
     constructor(){
         super("level1");
     }

     init(){
        this.isGameStart = false; 
     }

  create(){
      console.log("Level 1");
   this.map = new Map(this, "map1"); // map1 create
    this.backGround =   this.add.tileSprite(0, 0, 1000, 508, 'Bg_brown').setOrigin(0, 0);
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
    this.hadleCollision();
    this.fruitItem();
    this.Spikes(840,432);
    this.scoreText = this.add.text(730, 20, "Score:0", {
    
      fontSize: "22px",
      fill: "#000",
    });
    
     
 
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

    // create fruit animation
    this.apple  = this.add.group();
      this.apple.createMultiple({ key: 'fruit_apple', frame: 0, repeat: 2});
      Phaser.Actions.GridAlign(this.apple.getChildren(), { width:2, height: 3, cellWidth: 38, x: 200, y:150 });
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

     // COLLECT FRUIT
    //  this.anims.create({
    //   key: "collect",
    //   frames: this.anims.generateFrameNumbers('collect', { frames: [0, 1, 2, 3, 4, 5] }),
    //   frameRate: 8,
    //   repeat: -1,
    // });
    

    // checkpoint create
    this.checkpoint = this.add.group();
     this.checkpoint.createMultiple({ key: 'checkpoint', frame: 0, repeat: 0 });
     Phaser.Actions.GridAlign(this.checkpoint.getChildren(), { width:0, height:1, cellWidth: 38,  x: 830, y:265 });
     this.anims.staggerPlay('checkpoint', this.checkpoint.getChildren(), 90);
     this.physics.world.enable(this.checkpoint);
    this.isGameStart = true;
   
    this.coin = this.add.image(860,400,'coin').setScale(1.8);
    this.coin.visible = false;
    this.physics.world.enable(this.coin);
    
    this.physics.add.overlap(this.player,   this.apple , this.collect,null,this);
    this.physics.add.overlap(this.player,   this.apple_2 , this.collect_two,null,this);
    this.physics.add.overlap(this.player,   this.apple_3 , this.collect_three,null,this);
    this.physics.add.overlap(this.player,   this.apple_4 , this.collect_four,null,this);
 
    // handle level 
    this.physics.add.overlap(this.player,   this.checkpoint , this.levelComplete,null,this);
 }

 Spikes(width,height){
   let spikes = this.add.image(width, height, 'Spikes').setDepth(2);
   this.physics.world.enable(spikes);
   this.physics.add.overlap(this.player,  spikes ,()=>{
    this.gameOver();
   } );

 }
 gameOver(){
  this.player.reset();
}

    collect(player,fruit_apple){
      //  Hide the sprite
      this.apple .killAndHide(fruit_apple);
      
      //  And disable the body
      fruit_apple.body.enable = false;
      this.updateScore(10);
       }
       collect_two(player,fruit_apple){
           //  Hide the sprite
     this.apple_2.killAndHide(fruit_apple);
      
      //  And disable the body
      fruit_apple.body.enable = false;
      this.updateScore(10);
       }
       collect_three(player,fruit_apple){
        //  Hide the sprite
     this.apple_3.killAndHide(fruit_apple);
   
   //  And disable the body
   fruit_apple.body.enable = false;
   this.updateScore(10);
    }
    collect_four(player,fruit_apple){
      //  Hide the sprite
   this.apple_4.killAndHide(fruit_apple);
 
   //  And disable the body
    fruit_apple.body.enable = false;
    this.updateScore(10);
  }
   
  levelComplete() {
   
    console.log(this.score);
    if(this.coin_pick == 1){
      this.scene.start("level2");
    }
    localStorage.setItem("Score", this.score);
 
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
  updateScore(_value) {
    this.score += _value; // increase game score set value _value =10
    this.scoreText.setText("Score:"+ this.score); // set the text for score show
    if(this.score ==60 ){
      // handle coin collection
      this.physics.add.overlap(this.player,   this.coin , ()=>{
        this.coin_pick = 0;
        this.coin_pick += 1;
        this.coin.destroy();
        console.log('coin=>',this.coin_pick);
       },null,this);

      this.tweens.add({
        // add tween Text.
        targets: this.add
          .text(500,200,'Get the coin unlock next level', {
            fontSize: "33px",
            color: "#ff6700",
            stroke: "#effa52",
            strokeThickness: 5,
          })
          .setOrigin(0.5),
        props: {
          scale: 1.3,
          alpha: 0,
        },
        duration: 2000,
      });
      this.coin.visible = true;
     
    }
  }

}