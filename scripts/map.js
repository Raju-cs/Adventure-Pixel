export default class Map {
    scene;
    map;
    groundLayer;
    
  
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
      this.groundLayer = this.map
        .createLayer("ground", [groundTiles], 0, -0.2) //
        .setDepth(2);
    
  
      // enable collision on tilemap layer
      this.groundLayer.setCollisionByProperty({ collide:true });
    
  
      // set the size of layer
      
      this.groundLayer.setScale(1.1);

  
      //physics bound
      this.scene.physics.world.bounds.width = this.map.widthInPixels * 1.2;
      this.scene.physics.world.bounds.height = this.map.heightInPixels * 1.06;
  
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
      this.groundLayer.debug = true;
    }
  
    getGroundLayer() {
      return this.groundLayer;
    }
  
   
  }
  