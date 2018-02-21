"use strict";
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var word = "dance";
var correct = [];
var bitmap_data;
function preload(){
    game.load.image('background','assets/stage.png');
}
function create() {
    var back = game.add.sprite(800,0,'background');
    //  Here we'll create a simple array where each letter of the word to enter represents one element:
    for (var i = 0; i < word.length; i++)
    {
        correct[word[i]] = false;
    }

    //  This is our BitmapData onto which we'll draw the word being entered
    bitmap_data = game.make.bitmapData(800, 200);
    bitmap_data.context.font = '128px Arial';
    bitmap_data.context.fillStyle = '#ffffff';
    bitmap_data.context.fillText(word, 64, 64);
    bitmap_data.addToWorld();

    //  Capture all key presses
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

}
function update(){
    if
}
function keyPress(char) {

    //  Clear the BMD
    bitmap_data.cls();

    //  Set the x value we'll start drawing the text from
    var x = 64;

    //  Loop through each letter of the word being entered and check them against the key that was pressed
    for (var i = 0; i < word.length; i++)
    {
        var letter = word.charAt(i);

        //  If they pressed one of the letters in the word, flag it as correct
        if (char === letter)
        {
            correct[letter] = true;
        }

        //  Now draw the word, letter by letter, changing colour as required
        if (correct[letter])
        {
            bitmap_data.context.fillStyle = '#00ff00';
        }
        else
        {
            bitmap_data.context.fillStyle = '#ffffff';
        }

        bitmap_data.context.fillText(letter, x, 64);

        x += bitmap_data.context.measureText(letter).width;
    }

}
