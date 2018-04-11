
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //load images for the sprite/human and the bullet to shoot and zombies to move around
    game.load.image('human', 'assets/sprites/human.png');
    game.load.spritesheet('bullet', 'assets/sprites/bullet.png');
    game.load.image('zombies', 'assets/sprites/zombies.png');
    game.load.image('background', 'assets/sprites/background.png');
    game.load.audio('zombieDeath',['assets/audio/zombieDeath.mp3','assets/audio/zombieDeath.mp3']);//loads in the audio for the death sound
    game.load.audio('playerDeath',['assets/audio/playerDie.mp3','assets/audio/playerDie.mp3']);

}
//human character and bullet variables
var sprite;
var bullets;
var zombies;
var score=0;
var stateText;
var deathSound;//sound that will be tied to zombie being shot
var playerDeath;
var cursors;//variable to move the player

var fireRate = 50;
var nextFire = 0;

function create() {
    //load in the sound for use in the update function/collision handler
    deathSound = game.add.audio('zombieDeath');
    playerDied = game.add.audio("playerDeath");
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

    cursors = game.input.keyboard.createCursorKeys();


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

    //  Move the zombie to the top of the screen again
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
    if(cursors.left.isDown){
        sprite.body.velocity.x = -100;
    
    }
    if(cursors.right.isDown){
        sprite.body.velocity.x = 100;
    }
    if(cursors.down.isDown){
        sprite.body.velocity.y = 100;
    
    }
    if(cursors.up.isDown){
        sprite.body.velocity.y = -100;
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
    deathSound.play();


}
function death(){
    game.stage.backgroundColor = '#ff0000'; // change the background to red when death
    sprite.kill();

    zombies.callAll('kill');
    playerDied.play();
}
function render() {

    game.debug.text('Score ' + score,40,40);
    game.debug.text('When the Player Disappears ie. GameOver!',60,60);

}
