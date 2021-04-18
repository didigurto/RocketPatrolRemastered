class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
        console.log("is this working");
    }

    preload() {
        this.load.image('starfield', 'assets/sky04.png');
        this.load.image('rocket', 'assets/ikarugarocket.png');
        this.load.image('spaceship', 'assets/ikarugaship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

        
create(){
    //adding starfield and specifying how much of the image to use as a tile sprite
    this.starfield = this.add.tileSprite(
        0,0,520,840, 'starfield').setOrigin(0,0);
    
    this.p1Rocket = new Rocket(
        this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket');

    this.ship1 = new Ship(
        this, 100, 50, 'spaceship'
    );

    this.ship2 = new Ship(
        this, 350, 150, 'spaceship'
    );

    this.ship3 = new Ship(
        this, 425, 100, 'spaceship'

        // animation config

    );

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });

        console.log(this.height);


    // green UI background
   this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00,).setOrigin(0,0);
    //white borders
    //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	//this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
	this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.p1Score = 0;
      // display score
  let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

//GAME OVER flag 
this.gameOver = false;

// 60-second play clock
scoreConfig.fixedWidth = 0;
this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <-- for Menu', scoreConfig).setOrigin(0.5);
    this.gameOver = true;
}, null, this);
}
//making starfield scroll by moving and phaser provides a function for it to repeat
update() {
    if (this.gameOver || Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.restart();
    }

    if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
        this.scene.start("menuScene");
    }
    //moves starfield background
    this.starfield.tilePositionY -= 4;
    this.p1Rocket.update();
    
    if(!this.gameOver) {
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();
    }
    if(this.checkCollision(this.p1Rocket, this.ship1)){
        this.p1Rocket.reset();
        this.shipExplode(this.ship1);
    }
    if(this.checkCollision(this.p1Rocket, this.ship2)){
        this.p1Rocket.reset();
        this.shipExplode(this.ship2);
    }
    if(this.checkCollision(this.p1Rocket, this.ship3)){
        this.p1Rocket.reset();
        this.shipExplode(this.ship3);
    }
    
}

checkCollision(rocket, ship) {
    if( rocket.x + rocket.width > ship.x && 
        rocket.x < ship.x + ship.width && 
        rocket.y + rocket.height > ship.y && 
        rocket.y < ship.y + ship.height){
            return true;
        } else  {
            return false;
        }
}
shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
      this.sound.play('sfx_explosion');
    
    }); 
               // score add and repaint
               this.p1Score += 1;
               this.scoreLeft.text = this.p1Score;  
  }
  
}
