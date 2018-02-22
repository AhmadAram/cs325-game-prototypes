var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    //preload all dancers images here

    game.load.image('dancer1','assets/dancer1.png');
    game.load.image('dancer2','assets/dancer2.png');
    game.load.image('dancer3','assets/dancer3.png');
    game.load.image('dancer4','assets/dancer4.png');
    game.load.image('dancer5','assets/dancer5.png');
    game.load.audio('music',['assets/sound1.mp3','assets/sound1.mp3']);

}
//inputs needed for dancers DANCE respectivly
var key1;
var key2;
var key3;
var key4;
var key5;
var sound1;

function create() {
    game.stage.backgroundColor = '#0000ff';
    sound1 = game.add.audio('music');
    sound1.play();
    game.add.text(0, 0, 'Press d,a,n,c, or e !', {} );
    game.add.text(20,20,'and Lets Dance!!',{});


    //add hotkeys for DANCE and add each dancer as the key is pressed
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);
    key1.onDown.add(addDancer1, this);

    key2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
    key2.onDown.add(addDancer2, this);

    key3 = game.input.keyboard.addKey(Phaser.Keyboard.N);
    key3.onDown.add(addDancer3, this);

    key4 = game.input.keyboard.addKey(Phaser.Keyboard.C);
    key4.onDown.add(addDancer4,this);

    key5 = game.input.keyboard.addKey(Phaser.Keyboard.S);
    key4.onDown.add(addDancer5,this);


    //  Option 2 - Alternatively, Remove captures so they flood up to the browser too
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.N);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.C);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);



}

function update() {

    if (game.input.activePointer.withinGame)
    {
        game.input.enabled = true;
        game.stage.backgroundColor = '#736357';
    }
    else
    {
        game.input.enabled = false;
        game.stage.backgroundColor = '#731111';
    }

}
//functions called according to which hotkey is pressed
function addDancer1 () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'dancer1');

}

function addDancer2 () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'dancer2');
}

function addDancer3 () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'dancer3');
}
function addDancer4 () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'dancer4');
}

function addDancer5 () {
    game.add.sprite(game.world.randomX,game.world.randomY, 'dancer5');
}