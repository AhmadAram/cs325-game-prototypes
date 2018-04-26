
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //load images for the sprite/human and the bullet to shoot and zombies to move around
    game.load.image('player1', 'assets/sprites/player1.png');
    game.load.spritesheet('bullet1', 'assets/sprites/bullet.png');
    game.load.spritesheet('bullet2','assets/sprites/bullet2.png');
    game.load.image('background', 'assets/sprites/background.png');
    game.load.audio('playerDeath',['assets/sounds/playerDie.mp3','assets/sounds/playerDie.mp3']);
    game.load.image('player2','assets/sprites/player2.png');

}
//human character and bullet variables
var player1;
var player2;
var score=10;//player ones health
var score2 =10;//player 2s health
var stateText;
var deathSound;//sound that will be tied to zombie being shot
var playerDeath;
var arrowKeys;//variable to move the player2
var weapon1;
var weapon2;
var player1Fire;
var player2Fire;
var wasd;//keys for player

function create() {
    //load in the sound for use in the update function/collision handler
    playerDied = game.add.audio("playerDeath");
    //load the background into the backdrop
    game.add.tileSprite(0,0,800,600,'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //will change background to a field
    game.stage.backgroundColor = '#313131';

    weapon1 = game.add.weapon(100,'bullet1');
    weapon2 = game.add.weapon(100,'bullet2');

    weapon1.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon2.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;

    weapon1.bulletSpeed = 400;
    weapon2.bulletSpeed = 400;

    weapon1.fireRate = 100;
    weapon2.fireRate = 100;

    weapon1.bulletWorldWrap = false;
    weapon2.bulletWorldWrap = false;


    //add the player1 into the game world and player2
    player1 = game.add.sprite(80, 80, 'player1');
    player2 = game.add.sprite(80,80,'player2');

    player1.anchor.set(0.5);
    player2.anchor.set(.10);

    game.physics.arcade.enable(player1);
    game.physics.arcade.enable(player2);

    player1.body.drag.set(70);
    player2.body.drag.set(70);

    player1.body.maxVelocity.set(200);
    player2.body.maxVelocity.set(200);

    weapon1.trackSprite(player1,0,0,true);
    weapon2.trackSprite(player2,0,0,true);

    arrowKeys = game.input.keyboard.createCursorKeys();
    wasd = {
        up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    player2Fire = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);//registers spacebar as player one shooting
    player1Fire = this.input.keyboard.addKey(Phaser.Keyboard.F);//make the F key fire for player one


}


function update() {
    //if a collision happens with the bullets ie. player is hit then call collision handler
    game.physics.arcade.overlap(weapon2,player1,collisionHandler1,null,this);
    game.physics.arcade.overlap(weapon1,player2,collisionHandler2,null,this);
        //player one controls based on WASD for left right down and up

    if(wasd.up.isDown){
        game.physics.arcade.accelerationFromRotation(player1.rotation,300,player1.body.acceleration);
    }
    else{
        player1.body.acceleration.set(0);
    }
    if (wasd.left.isDown)
    {
        player1.body.angularVelocity = -300;
    }
    else if (wasd.right.isDown)
    {
        player1.body.angularVelocity = 300;
    }
    else
    {
        player1.body.angularVelocity = 0;
    }

    if (player1Fire.isDown)
    {
        weapon1.fire();
    }

    game.world.wrap(player1, 16);
    //on collision kill zombie and update score

    if (arrowKeys.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(player2.rotation, 300, player2.body.acceleration);
    }
    else
    {
        player2.body.acceleration.set(0);
    }

    if (arrowKeys.left.isDown)
    {
        player2.body.angularVelocity = -300;
    }
    else if (arrowKeys.right.isDown)
    {
        player2.body.angularVelocity = 300;
    }
    else
    {
        player2.body.angularVelocity = 0;
    }

    if (player2Fire.isDown)
    {
        weapon2.fire();
    }

    game.world.wrap(player2, 16);
}

function collisionHandler1(weapon2,player1){
    //killZombie();
    score2 = score2 +1 ;//increment score by one.
    deathSound.play();
}
function collisionHandler2(weapon1,player2){
    score = score +1;
    deathSound.play();
}
function render() {

    game.debug.text('Health Player 1' + score,40,40);
    game.debug.text('Health Player 2'+score2,40,60);
    game.debug.text("Controls: Player 1: WASD to move, F to shoot",40,80);
    game.debug.text("Controls: Player2 Arrow Keys to Move, SpaceBar to Shoot",40,100);
}
