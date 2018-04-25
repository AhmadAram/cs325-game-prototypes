
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //load images for the sprite/human and the bullet to shoot and zombies to move around
    game.load.image('player1', 'assets/sprites/player1.png');
    game.load.spritesheet('bullet', 'assets/sprites/bullet.png');
    game.load.image('zombies', 'assets/sprites/zombies.png');
    game.load.image('background', 'assets/sprites/background.png');
    game.load.audio('zombieDeath',['assets/sounds/zombieDeath.mp3','assets/sounds/zombieDeath.mp3']);//loads in the audio for the death sound
    game.load.audio('playerDeath',['assets/sounds/playerDie.mp3','assets/sounds/playerDie.mp3']);
    game.load.image('player2','assets/sprites/player2.png');

}
//human character and bullet variables
var player1;
var player2;
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

    //add the player1 into the game world and player2
    player1 = game.add.sprite(80, 80, 'player1');
    player2 = game.add.sprite(80,80,'player2');

    //apply physics to the two player models
    game.physics.enable(player1,Phaser.Physics.ARCADE);
    game.physics.enable(player2,Phaser.Physics.ARCADE);

    player1.body.allowRotation = true;
    player2.body.allowRotation = true;
    
    
    //sprite.body.velocity.y = 400;
    player1.alignIn(game.world.bounds,Phaser.CENTER);
    player2.alignIn(game.world.bounds,Phaser.CENTER);

    cursors = game.input.keyboard.createCursorKeys();
    letters = game.input.keyboard.createMultiple();


}

function killZombie(zombie) {

    //  Move the zombie to the top of the screen again
    zombie.reset(zombie.x, 0);

    //  And give it a new random velocity
    zombie.body.velocity.y = 50 + Math.random() * 200;
    zombie.body.velocity.x = 50 - Math.random() *200;

}


function update() {

    player1.rotation = game.physics.arcade.angleToPointer(player1);

    //game.physics.arcade.overlap(bullets,zombies,collisionHandler,null,this);

    //game.physics.arcade.overlap(zombies,player1,death,null,this);

    if (game.input.activePointer.isDown)
    {
        fire();
    }
    if(cursors.left.isDown){
        player1.body.velocity.x = -100;
    
    }
    if(cursors.right.isDown){
        player1.body.velocity.x = 100;
    }
    if(cursors.down.isDown){
        player1.body.velocity.y = 100;
    
    }
    if(cursors.up.isDown){
        player1.body.velocity.y = -100;
    }

    //on collision kill zombie and update score
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player1.x - 8, player1.y - 8);

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
    player1.kill();

    zombies.callAll('kill');
    playerDied.play();
}
function render() {

    game.debug.text('Score ' + score,40,40);
    game.debug.text('When the Player Disappears ie. GameOver!',60,60);
    game.debug.text("Controls: Arrow Keys to move, Aim with Mouse, Click to Shoot!",40,80);
}
