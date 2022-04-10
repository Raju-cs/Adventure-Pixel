export default class Player extends Phaser.Physics.Arcade.Sprite {
    // create variable...
    sceneObj;
    spawnX;
    spawnY;
    // create constructor ....
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
      this.sceneObj = scene;
      this.spawnX = x;
      this.spawnY = y;
      this.sceneObj.physics.world.enable(this); // enable player physics
  
      this.setImmovable(false); // Sets if this Body can be separated during collisions with other bodies. Here Immovable set false
      this.setScale(1.3); // fix player shape
      this.setDepth(5); //visible in scene
      this.setBounce(0.2); // when player lands after jumping it will bounce ever so slightly.
      this.setCollideWorldBounds(true); //stop the player from being able to run off the edges of the screen or jump through the top.
      this.body.setGravityY(320); // the player falls down without stopping when it jump
      this.body.setSize(20,29);
      this.sceneObj.add.existing(this); //it has a preUpdate method, it will be added to the Update List.
    }
  
    reset() {
      this.setPosition(this.spawnX, this.spawnY); // reset the player position
    }
  }