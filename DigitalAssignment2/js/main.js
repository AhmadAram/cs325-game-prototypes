window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'chicken', 'assets/chickenman.png' );
        game.load.image('egg','assets/egg.png');
        game.load.image('human','assets/human.png');
        // load a tilemap and call it 'map'.
        // from .json file

        // alternatively, from .csv file
        //game.load.tilemap('map', 'assets/tilemap_example.csv', null, Phaser.Tilemap.CSV);
        
        //load tiles for map
        //game.load.image('tiles', 'assets/tiles.png');
    }
    var chicken
    var egg
    var human
    var sprite
    //var map;
    //var layer1;
    //var bouncy;
    
    function create() {
        egg = game.add.weapon(1,'bullet')//create a bullet using the egg picture

        //when the egg leaves the world it will be killed
        egg.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        weapon.bulletAngleOffset = 0;

        weapon.bulletSpeed = 400;
        sprite = this.add.sprite(320,500,'chicken');

        game.physics.arcade.enable(sprite);

       weapon.trackSprite(sprite,14,0);

       cursors = this.input.keyboard.createCursorKeys();

       fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


        
        // Create the map. 
        //map = game.add.tilemap('map');
        // for csv files specify the tile size.
        //map = game.add.tilemap('map', 32, 32);

        //add tiles
        //map.addTilesetImage('tiles');
        
        // Create a layer from the map
        //using the layer name given in the .json file
        //layer1 = map.createLayer('Tile Layer 1');
        //for csv files
        //layer1 = map.createLayer(0);
        
        //  Resize the world
        //layer1.resizeWorld();
        
        // Turn on the arcade physics engine for this sprite.
        // Create a sprite at the center of the screen using the 'logo' image.
        //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //bouncy.anchor.setTo( 0.5, 0.5 );
        
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( 400, 15, "Build something amazing.", style );
        //text.fixedToCamera = true;
        //text.anchor.setTo( 0.5, 0.0 );
        
        //game.camera.follow(bouncy);
        
    }
    
    function update() {
       sprite.body.velocity.x = 0;
       if(cursors.up.isDown){
           sprite.body.velocity.y = 200;//move the character up if the up arrow is pressed

       }
       if(cursors.right.isDown){
           sprites.body.velocity.y = -200;//move the character down if the down key is pressed
       }
       if(fireButton.isDown){//when the spacebar is pressed fire the bullet
           weapon.fire();
       }

       
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
    function render() {

        weapon.debug();
    
    }
};
