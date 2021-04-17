let config = {
    type: Phaser.CANVAS,
    width: 520,
    height: 840,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);


let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR; 
