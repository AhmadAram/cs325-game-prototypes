
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //load images for the sprite/human and the bullet to shoot and zombies to move around
    game.load.image('human', 'assets/sprites/human.png');
    game.load.spritesheet('bullet', 'assets/sprites/bullet.png');
    game.load.image('zombies', 'assets/sprites/zombies.png');
    game.load.image('background', 'assets/sprites/background.png');
    
}
//human character and bullet variables
var sprite;
var bullets;
var zombies;
var score=0;
var stateText;

var fireRate = 50;
var nextFire = 0;

function create() {
    //load the background into the backdrop
    game.add.tileSprite(0,0,800,600,'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //will change background to a field
    game.stage.backgroundColor = '#313131';

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //craetes the bullets and kills them if they leave the world
    bullets.createMultiple(20, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    //adds in the human sprite

    sprite = game.add.sprite(80, 80, 'human');

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = true;
    
    zombies = game.add.group();
    zombies.enableBody = true;
    zombies.physicsBodyType = Phaser.Physics.ARCADE;
    //sprite.body.velocity.y = 400;
    sprite.alignIn(game.world.bounds,Phaser.CENTER);



    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var zombie = zombies.create(200 + x * 48, y * 50, 'zombie');
            zombies.name = 'zombie' + x.toString() + y.toString();
            zombie.checkWorldBounds = true;
            zombie.events.onOutOfBounds.add(killZombie, this);
            zombie.body.velocity.y = 10 + Math.random() * 100;
            zombie.body.velocity.x = 50 +Math.random() *100;//move the zombies to the sides too
        }
    }

}

function killZombie(zombie) {

    //  Move the alien to the top of the screen again
    zombie.reset(zombie.x, 0);

    //  And give it a new random velocity
    zombie.body.velocity.y = 50 + Math.random() * 200;
    zombie.body.velocity.x = 50 - Math.random() *200;

}


function update() {

    sprite.rotation = game.physics.arcade.angleToPointer(sprite);
    game.physics.arcade.overlap(bullets,zombies,collisionHandler,null,this);
    game.physics.arcade.overlap(zombies,sprite,death,null,this);
    if (game.input.activePointer.isDown)
    {
        fire();
    }
    //on collision kill zombie and update score
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}
function collisionHandler(bullet,zombies){
    //killZombie();
    zombies.kill()//destroy the zombie
    score = score +1 ;//increment score by one.



}
function death(){
    game.stage.backgroundColor = '#ff0000'; // change the background to red when death
    sprite.kill();

    zombies.callAll('kill');
}
function render() {

    game.debug.text('Score ' + score,40,40);
    game.debug.text('When the game freezes ie. GameOver!',60,60);

}