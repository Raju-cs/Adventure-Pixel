import Map from "./map.js";
import Player from "./player.js";

export default class Level_3 extends Phaser.Scene{
    backGround;
    map;
    isGameStart = false;
    player;
    cursors;
    chain;
    container;
    coin;
    score = 0;
    scoreText;
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

          this.player = new Player(this, 50, 50, "run"); //add player in game world
          this.isGameStart = true;
          this.hadleCollision();
          this.fruitItem();
          this.checKpoint();
          this.coinHandle();
          this.sawAnims(747,200,142,820,820,142);
          this.sawAnims2();
          this.createAnimSpikedBall(0,7,17,37,320,113);
          this.createAnimSpikedBall(0,7,17,37,300,310);
          this.createAnimSpikedBall(0,7,17,37,252,438);
          this.createAnimSpikedBall(0,7,17,37,528,438);
          this.createAnimSpikedBall2(0,7,17,27,37,47,67,710,408);
          // this.createAnimSpikedBall2(0,7,17,27,37,47,67,810,50);
          this.scoreText = this.add.text(730, 20, "Score:0", {
    
            fontSize: "22px",
            fill: "#000",
          });
          let savedScore = JSON.parse(localStorage.getItem("Score"));
          this.updateScore(savedScore);
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
          Phaser.Actions.GridAlign(this.apple.getChildren(), { width:3, height: 0, cellWidth: 20, x: 360, y:350 });
          this.anims.staggerPlay('play_fruit', this.apple.getChildren(), 90);
          this.physics.world.enable(  this.apple );
    
       this.apple_2 = this.add.group();
         this.apple_2.createMultiple({ key: 'fruit_apple', frame: 0, repeat: 5 });
         Phaser.Actions.GridAlign(this.apple_2.getChildren(), { width:3, height: 3, cellWidth: 20, x: 350, y:450 });
         this.anims.staggerPlay('play_fruit', this.apple_2.getChildren(), 90);
         this.physics.world.enable(this.apple_2);
        
         this.apple_3 = this.add.group();
         this.apple_3.createMultiple({ key: 'fruit_apple', frame: 0, repeat: 5 });
         Phaser.Actions.GridAlign(this.apple_3.getChildren(), { width:3, height: 3, cellWidth: 20, x: 350, y:120 });
         this.anims.staggerPlay('play_fruit', this.apple_3.getChildren(), 90);
         this.physics.world.enable(this.apple_3);
        this.isGameStart = true;
    
        this.apple_4 = this.add.group();
         this.apple_4.createMultiple({ key: 'fruit_apple', frame: 0, repeat:5 });
         Phaser.Actions.GridAlign(this.apple_4.getChildren(), { width:2, height: 2, cellWidth: 20, x: 600, y:220 });
         this.anims.staggerPlay('play_fruit', this.apple_4.getChildren(), 90);
         this.physics.world.enable(this.apple_4);
    
         // COLLECT FRUIT
        //  this.anims.create({
        //   key: "collect",
        //   frames: this.anims.generateFrameNumbers('collect', { frames: [0, 1, 2, 3, 4, 5] }),
        //   frameRate: 8,
        //   repeat: -1,
        // });
        
    
      
        this.isGameStart = true;


       // create coin
        
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
          this.updateScore(10);
          console.log('score=>',this.score);
         
           }
           collect_two(player,fruit_apple){
            //  Hide the sprite
      this.apple_2.killAndHide(fruit_apple);
      
       //  And disable the body
       fruit_apple.body.enable = false;
       this.updateScore(10);
       console.log('score=>',this.score);
        }
        collect_three(player,fruit_apple){
         //  Hide the sprite
      this.apple_3.killAndHide(fruit_apple);
      
    //  And disable the body
    fruit_apple.body.enable = false;
    this.updateScore(10);
    console.log('score=>',this.score);
     }
     collect_four(player,fruit_apple){
       //  Hide the sprite
    this.apple_4.killAndHide(fruit_apple);
  
    //  And disable the body
     fruit_apple.body.enable = false;
     this.updateScore(10);
     console.log('score=>',this.score);
   }
   checKpoint(){
    // checkpoint create
    let checkpoint = this.add.group();
    checkpoint.createMultiple({ key: 'checkpoint', frame: 0, repeat: 0 });
    Phaser.Actions.GridAlign(checkpoint.getChildren(), { width:0, height:1, cellWidth: 38,  x: 850, y:412  });
    this.anims.staggerPlay('checkpoint', checkpoint.getChildren(), 90);
    this.physics.world.enable(checkpoint);
     // handle level 
     this.physics.add.overlap(this.player,  checkpoint , this.levelComplete,null,this);
       
     }
     coinHandle(){
      this.coin = this.add.image(880,100,'coin').setScale(1.8);
      this.coin.visible = false;
      this.physics.world.enable(this.coin);
     }
     levelComplete() {
      console.log(this.score);
      if(this.coin_pick == 1){
        this.scene.start("level3");
      }
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

    updateScore(_value) {
      this.score += _value; // increase game score set value _value =10
      this.scoreText.setText("Score:"+ this.score); // set the text for score show
      if(this.score ==350 ){
         // handle coin collection
         this.physics.add.overlap(this.player, this.coin , ()=>{
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
            .setOrigin(0.5)
            .setDepth(2),
          props: {
            scale: 1.3,
            alpha: 0,
          },
          duration: 2000,
        });
        this.coin.visible = true;
       
      }
    }

    sawAnims(width_first,height_first,height_second,width_second, sawWidth,sawHeight){
        this.anims.create({
          key: "sawOn_play",
          frames: this.anims.generateFrameNumbers('sawOn', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
          frameRate: 8,
          repeat: -1,
        });
  
     this.sawOn = this.add.sprite(sawWidth,sawHeight,"sawOff");
     this.sawOn.anims.play("sawOn_play", true);
     this.physics.world.enable(this.sawOn);
     this.tweens.timeline({
      targets: this.sawOn,
      ease: 'Power2',
      duration: 1000,
      
      tweens: [
      {
          x: width_first
      },
      {
          y: height_first
      },
      {
        y: height_second
    },
    {
      x: width_second
  },],
   loop:-1  
    
  });
  this.physics.add.overlap(this.player,   this.sawOn ,()=>{
    this.gameOver();
  });
  }
      gameOver(){
        this.player.reset();
      }

      sawAnims2(){
        this.anims.create({
            key: "sawOn_play",
            frames: this.anims.generateFrameNumbers('sawOn', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 8,
            repeat: -1,
          });
    
       this.sawOn = this.add.sprite(400,257,"sawOff");
       this.sawOn.anims.play("sawOn_play", true);
       this.physics.world.enable(this.sawOn);
        this.tweens.add({
            targets: this.sawOn,
            x: 630,
            duration: 2500,
            ease: "Power1",
            yoyo: true,
            repeat: -1,
          });
          this.physics.add.overlap(this.player,   this.sawOn ,()=>{
            this.gameOver();
          });
      }

      createAnimSpikedBall(chain_height1,chain_height2,chain_height3,spikeBall_width,container_width,container_height){
             
           let chain_one =  this.add.image(0,chain_height1,'chain').setScale(1.3);  
           let chain_two =  this.add.image(0,chain_height2,'chain').setScale(1.3);
           let chain_three =  this.add.image(0,chain_height3,'chain').setScale(1.3);
           let spikeBall = this.add.image(0,spikeBall_width,'Spikeball');
           let container = this.add.container(container_width, container_height).setDepth(2);
            container.add([spikeBall,chain_one,chain_two,chain_three]);
         
            var tween = this.tweens.addCounter({
              from: 0,
              to: 360,
              duration: 3500,
              repeat: -1,
              ease: "Linear",
              
              onUpdate: function (tween)
              {
                  //  tween.getValue = range between 0 and 360
      
                  container.setAngle(tween.getValue());
              }
          });
          this.physics.world.enable(spikeBall);
          this.physics.add.overlap(this.player,   spikeBall ,()=>{
            this.gameOver();
          });
      }

      createAnimSpikedBall2(chain_height1,chain_height2,chain_height3,chain_height4,chain_height5,chain_height6,spikeBall_width,container_width,container_height){
             
        let chain_one =  this.add.image(0,chain_height1,'chain').setScale(1.3);  
        let chain_two =  this.add.image(0,chain_height2,'chain').setScale(1.3);
        let chain_three =  this.add.image(0,chain_height3,'chain').setScale(1.3);
        let chain_four =  this.add.image(0,chain_height4,'chain').setScale(1.3);
        let chain_five =  this.add.image(0,chain_height5,'chain').setScale(1.3);
        let chain_six =  this.add.image(0,chain_height6,'chain').setScale(1.3);
        let spikeBall = this.add.image(0,spikeBall_width,'Spikeball');
        let container = this.add.container(container_width, container_height);
         container.add([spikeBall,chain_one,chain_two,chain_three,chain_four,chain_five,chain_six]);
      
         var tween = this.tweens.addCounter({
           from: -90,
           to: 90,
           duration: 2000,
           repeat: -1,
           ease: "Linear",
           yoyo:true,
           
           onUpdate: function (tween)
           {
               //  tween.getValue = range between 0 and 360
   
               container.setAngle(tween.getValue());
           }
       });
       this.physics.world.enable(spikeBall);
       this.physics.add.overlap(this.player,   spikeBall ,()=>{
         this.gameOver();
       });
   }
  
} 