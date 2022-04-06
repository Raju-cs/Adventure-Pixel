
export default class Level_1 extends Phaser.Scene{
    backGround;
     constructor(){
         super("level1");
     }

     init(){
         
     }

  create(){
      console.log("Level 1");
  
    this.backGround =   this.add.tileSprite(0, 0, 1000, 500, 'Bg_brown').setOrigin(0, 0);


   
  }



  update(){
    this.backGround.tilePositionY -= 0.5;
  }

}