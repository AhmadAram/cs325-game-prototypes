"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 800, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update } );
    //changed these parameters to increase the window size
    function preload() {//used to load everything like asssets into the game before hand
        // Load an image and call it 'logo'.
        game.load.spritesheet('character1','assets/char1.png',80,80);//character shooting the bullets
        game.load.image('bullet','assets/bullet1.png');//bullet being shot by character
        game.load.spritesheet('robots','assets/sprites/robots.png',50,50);
        game.load.audio('explosion',['assets/canonfire.mp3','assets/canonfire.mp3']);//audio sound to play when canons hit teapot
   

    }  
        var sprite;//variable for sprites
        var bullets;//variable for bullet
        var robots;//variable for player
        var cursors;//variable for controls
        var bulletTime = 0;
        var bullet;//more then one bullet assigned to the png   
        var explosionsound;  
        var score=0;
        var text;
  
    
    function create() {
        explosionsound = game.add.audio('explosion');
        game.stage.backgroundColor = '#1155CC'//change background color to blueish

        //display the score variable
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        text = game.add.text( game.world.centerX, 15, score, style );
        text.anchor.setTo( 0.5, 0.0 );
        
        
        robots = game.add.group();
        robots.enableBody = true;
        robots.physicsBodyType = Phaser.Physics.ARCADE;

        for(var i = 0;i<50;i++){
            var c = robots.create(game.world.randomX,Math.random() * 500,'robots',game.rnd.integerInRange(0,36));
            c.name = 'rob' +i;
            c.body.immovable = true;
        }
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++)
    {
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
        sprite = game.add.sprite(400,550,'character1');
        game.physics.enable(sprite,Phaser.Physics.ARCADE);

        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    }

    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        //score board to count collisions


        game.physics.arcade.overlap(bullets,robots,collisionHandler,null,this);

        sprite.body.velocity.x=0;
        sprite.body.velocity.y=0;//these two tell the sprite where to start inistially

        if(cursors.left.isDown){// if left on the keyboard is pressed
            sprite.body.velocity.x = -100;

        }
        if(cursors.right.isDown){
            sprite.body.velocity.x = 100;
        }
        if(cursors.up.isDown){
            sprite.body.velocity.y = -100;
        }
        if(cursors.down.isDown){
            sprite.body.velocity.y = 100;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            fireBullet();//calls the fire bullet function
        }
    }

    function fireBullet () {

        if (game.time.now > bulletTime)
        {
            bullet = bullets.getFirstExists(false);
    
            if (bullet)
            {
                bullet.reset(sprite.x + 6, sprite.y - 8);
                bullet.body.velocity.y = -300;
                bulletTime = game.time.now + 150;
            }
        }
    
    }
    function resetBullet(bullet){
        bullet.kill();//kills the bullet if it goes off screen
    }

    function collisionHandler(bullet,robots){
        bullet.kill();
        robots.kill();
        score = score + 1;//update scoreboard
        text.text = score;
        console.log(score);
        explosionsound.play();//play the explosion when the bullets collide
    }
}
