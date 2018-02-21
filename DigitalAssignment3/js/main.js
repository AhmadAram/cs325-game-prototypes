"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image( 'background','assets/stars.png');
        game.load.sprite('dance',assets/sprites/dancer.png);

    }
    //defining both phrases that will need to be typed
    var firstWord = "dance the night away";
    var secondWord = "tonight is the talent show";
    var bitmap_data;
    //defining array that is empty
    var correct_letters = [];
    
    function create() {
        //storing the phrase inside of the correct array and setting them to false
        //or not typed.
        for(var i = 0;i<firstWord.length;i++){
            correct_letters[firstWord[i]] = false;
        }
        bitmap_data = game.make.bitmapData(800,200);
        bitmap_data.context.font = '64ox Arial';
        bitmap_data.context.fillStyle = '#ffffff';
        bitmap_data.context.fillText(firstWord,64,64);
        bitmap_data.addToWorld();

        game.input.keyboard.addCallbacks(this,null,null,keyPress);

    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
    function keyPress(char){
        bitmap_data.cls();
        var x = 64;

        for(var i =0;i<firstWord.length;i++){
            var letter = word.charAt(i);

                if(char == letter){}
                correct_letters[letter] = true;
        }
        if(correct_letters[letter]){
            bitmap_data.context.fillStyle = '#00ff00';

        }
        else{
            bitmap_data.context.fillStyle = '#ffffff';
        }
        bitmap_data.context.fillText(letter,x,64);
    }
    
    return { "preload": preload, "create": create, "update": update };
}


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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );// adds a game state and next line starts it which is the function above
    game.state.start( "main" );
};
