class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
        console.log("is this working");
    }

    preload() {
        this.load.image('starfield', 'assets/sky04.png');
        this.load.image('rocket', 'assets/ikarugarocket.png');
        this.load.image('spaceship', 'assets/ikarugaship.png');
        this.load.image('laser', 'assets/laser.png');
        this.load.spritesheet('explosionSpriteSheet', './assets/explosionSpriteSheet01.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 16});
        
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
    );
    
    this.lasers = [];

    //this.laser = new Laser(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'laser');
  
    

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosionSpriteSheet', { start: 0, end: 16, first: 0}),
        frameRate: 30
        });
        console.log(this.height);
    

    //green UI background
    //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00,).setOrigin(0,0);
    //white borders
    //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	//this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);
	this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.p1Score = 0;
      // display score
  let scoreConfig = {
    fontFamily: 'Orbitron',
    fontSize: '28px',
    //backgroundColor: '#F3B141',
    color: '#FFFFFF',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
  this.scoreLeft = this.add.text(-60, 10, '1P', scoreConfig).setOrigin(0 ,0);
  this.scoreLeft = this.add.text(-50, 50, this.p1Score, scoreConfig).setOrigin(0 ,0);

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
    
    if(Phaser.Input.Keyboard.JustDown(keySPACE)){
        this.laser = new Laser(this, this.p1Rocket.x , this.p1Rocket.y, 'laser');
        this.lasers.push(this.laser); 
        this.laser.update();
        this.sound.play('sfx_laser');
    }
   
    for (let i = 0; i < this.lasers.length; i++){
        this.lasers[i].update();
        if(this.checkCollision(this.lasers[i], this.ship1)){
            this.shipExplode(this.ship1);
        }
        if(this.checkCollision(this.lasers[i], this.ship2)){
            this.shipExplode(this.ship2);
        }
        if(this.checkCollision(this.lasers[i], this.ship3)){
            this.shipExplode(this.ship3);
        }
    } 

    //moves starfield background
    this.starfield.tilePositionY -= 4;
    this.p1Rocket.update();
    //this.laser.update();

    
    if(!this.gameOver) {
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();
    }
    
    // if(this.checkCollision(this.p1Rocket, this.ship2)){
    //     this.p1Rocket.reset();
    //     this.shipExplode(this.ship2);
    // }
    // if(this.checkCollision(this.p1Rocket, this.ship3)){
    //     this.p1Rocket.reset();
    //     this.shipExplode(this.ship3);
    // }
    
}
checkCollision(laser, ship) {
    if( laser.x + laser.width > ship.x && 
        laser.x < ship.x + ship.width && 
        laser.y + laser.height > ship.y && 
        laser.y < ship.y + ship.height){
            return true;
        } else  {
            return false;
        }
}

shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x - 50, ship.y - 10, 'explosion').setOrigin(0, 0);
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

