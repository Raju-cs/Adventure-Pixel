export default class Map {
    scene;
    map;
    ground;
    
  
    constructor(sceneObj, mapKey) {
      this.scene = sceneObj;
      this.createMap(mapKey);
    }
  
    createMap(mapKey) {
      this.map = this.scene.make.tilemap({ key: mapKey });
  
     
  
   
  
      let groundTiles = this.map.addTilesetImage(
        "Terrain",
        "map-tiles",
        16,
        16
      );
  
     
  
      // create layer...
      // this.groundLayer = this.map
      //   .createLayer("ground", [groundTiles], 0, -0.2) //
      //   .setDepth(0.5);
      this.ground = this.map.createLayer("ground", [groundTiles], 0, -0.2).setDepth(2);
    
  
      // enable collision on tilemap layer
      // this.groundLayer.setCollisionByProperty({ collide:true });
      this.ground.setCollisionByProperty({collide: true});
    
  
      // set the size of layer
      
      this.ground.setScale(1.02);

  
      //physics bound
      this.scene.physics.world.bounds.width = this.map.widthInPixels *1.30;
      this.scene.physics.world.bounds.height = this.map.heightInPixels * 1.30;
  
      // camera bound
      this.scene.cameras.main.setBounds(
        0,
        0,
        this.map.widthInPixels * 1.2,
        this.map.heightInPixels * 1.2
      );
  
      this.debug();
    }
  
    debug() {
      this.ground.debug = true;
    }
  
    getGroundLayer() {
      return this.ground;
    }
  
   
  }
  