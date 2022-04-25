export default class Level_3 extends Phaser.Scene{
    backGround;
    constructor(){
        super('level3');
    }
    
    create(){
        console.log('level3');
        this.backGround = this.add.tileSprite(0, 0, 920, 508, 'Bg_Pink').setOrigin(0, 0);
    }

    update(){
        this.backGround.tilePositionY -= 0.5;
    }
} 