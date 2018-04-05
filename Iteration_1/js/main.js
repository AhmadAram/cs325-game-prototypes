
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //load images for the sprite/human and the bullet to shoot and zombies to move around
    game.load.spritesheet('human', 'assets/sprites/human.png');
    game.load.spritesheet('bullet', 'assets/sprites/bullet.png');
    game.load.spritesheet('zombies', 'assets/sprites/zombies.png');
    
}
//human character and bullet variables
var sprite;
var bullets;
var zombies;
var score;

var fireRate = 100;
var nextFire = 0;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //will change background to a field
    game.stage.backgroundColor = '#313131';

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //craetes the bullets and kills them if they leave the world
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    //adds in the human sprite

    sprite = game.add.sprite(80, 80, 'human');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;

    zombies = game.add.group();
    zombies.enableBody = true;
    zombies.physicsBodyType = Phaser.Physics.ARCADE;


    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var zombie = zombies.create(200 + x * 48, y * 50, 'zombie');
            zombies.name = 'zombie' + x.toString() + y.toString();
            zombie.checkWorldBounds = true;
            zombie.events.onOutOfBounds.add(killZombie, this);
            zombie.body.velocity.y = 50 + Math.random() * 200;
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
    killZombie();
    //bullets.kill();
    score = score++;//increment score by one.



}
function death(){
    sprite.kill();
}
function render() {

    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    game.debug.text('Score' + score,32,35);

}
