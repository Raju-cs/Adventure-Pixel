import Map from "./map.js";
import Player from "./player.js";
export default class Level_4 extends Phaser.Scene{
    backGround;
    map;
    isGameStart = false;
    cursors;
    player;

    constructor(){
        super('level4');
    }

    init(){
        this.isGameStart = false;  
    }

    create(){
        this.backGround = this.add.tileSprite(0, 0, 920, 508, 'Bg_Purple').setOrigin(0, 0);
        this.map = new Map(this, "map4") // map1 create
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
          this.anims.create({
            key: "blink",
            frames: this.anims.generateFrameNumbers('blink', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1,
          });
          this.anims.create({
            key: "left_hit",
            frames: this.anims.generateFrameNumbers('left_hit', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1,
          });
          this.anims.create({
            key: "right_hit",
            frames: this.anims.generateFrameNumbers('left_hit', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1,
          });

          this.player = new Player(this, 50, 50, "run"); //add player in game world
          this.isGameStart = true;
          this.hadleCollision();
          this.creatRockHead_one();
          this.sawAnims2(510,95,1500,800);
          this.sawAnims2(135,306,1500,250);
          this.createAnimSpikedBall2(0,7,17,27,37,47,67,190,345);
          
    }
   
    hadleCollision(){
     this.physics.add.collider(this.player,  this.map.getGroundLayer());
    }
     creatRockHead_one(){
        let rockHead = this.add.sprite(600,296,"rockHead");
        this.physics.world.enable(rockHead);
            rockHead.anims.play("blink", true);
            this.tweens.add({
              targets: rockHead,
              x: 340,
              duration: 2000,
              ease: "power1",
              yoyo: true,
              repeat: -1,
            });
            let zone_one = this.add.zone(300, 300).setSize(40, 40);
            this.physics.world.enable(zone_one);
            this.physics.add.overlap(rockHead,  zone_one,()=>{
            rockHead.anims.play("left_hit", true);
           
          });
          let zone_two = this.add.zone(383, 300).setSize(40, 40);
          this.physics.world.enable(zone_two);
          this.physics.add.overlap(rockHead,  zone_two,()=>{
            rockHead.anims.play("blink", true);
           
          });
          let zone_three = this.add.zone(630, 295).setSize(40, 40);
          this.physics.world.enable(zone_three);
          this.physics.add.overlap(rockHead,  zone_three,()=>{
            rockHead.anims.play("right_hit", true);
           
          });
          let zone_four = this.add.zone(530, 295).setSize(40, 40);
          this.physics.world.enable(zone_four);
          this.physics.add.overlap(rockHead,  zone_four,()=>{
            rockHead.anims.play("blink", true);
           
          });
      }
      sawAnims2(sawWidth, sawHeight,duration,X){
        this.anims.create({
            key: "sawOn_play",
            frames: this.anims.generateFrameNumbers('sawOn', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 8,
            repeat: -1,
          });
    
       this.sawOn = this.add.sprite(sawWidth,sawHeight,"sawOff");
       this.sawOn.anims.play("sawOn_play", true);
       this.physics.world.enable(this.sawOn);
        this.tweens.add({
            targets: this.sawOn,
            x: X,
            duration: duration,
            ease: "Linear",
            yoyo: true,
            repeat: -1,
          });
          this.physics.add.overlap(this.player,   this.sawOn ,()=>{
            // this.gameOver();
            console.log("dead");
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
           from: -60,
           to: 60,
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