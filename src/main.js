let config = {
    type: Phaser.CANVAS,
    width: 520,
    height: 840,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);


let borderUISize = game.config.height / 15;
let borderPadding = borderUISize/3 ;

let keyLEFT, keyRIGHT, keyF, keyR, keySPACE; 


/*Diego Agurto, Rocket Patrol Remastered, 4/21, 
So far, I have worked on the project for about 8 hours
Point Breakdown so far:
  - Create new scrolling tile sprite for the background (5)
  - Create new artwork for all in-game assets(rocket, spaceships,explosions) (20)
  - Create and implement a new weapon (20)

  - Eventual additions:
     - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (60)
     */