class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

preload(){
    //loadin audio
    this.load.audio('sfx_select', './assets/laser_shot.wav');
    this.load.audio('sfx_explosion', './assets/explosionIkaruga.wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    this.load.audio('sfx_laser', './assets/laser_shot02.wav');
    this.load.audio('sfx_select01', './assets/acceptSelect.wav');
    
}

create(){
    let menuConfig = {
        fontFamily: 'Orbitron',
        fontSize: '28px',
        backgroundColor: '#000',
        color: '#FFFFFF',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
      }

    this.add.text(70, 100 - borderUISize -
        borderPadding, 'Ikaruga', menuConfig).setOrigin(0.5);
        this.add.text(50, 50, 'Use <--> arrows to move ', menuConfig).setOrigin(0.1);
        menuConfig.color = '#FFFFFF';
        this.add.text(280, 90, '& (SPACE) to fire', menuConfig).setOrigin(0.1);
        menuConfig.color = '#FFFFFF';

        this.add.text(game.config.width/3, 145, 'Press <-- for Novice or ', menuConfig).setOrigin(0.45);
        this.add.text(420, 190, '--> for Expert', menuConfig).setOrigin(0.57);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            shipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.sound.play('sfx_select01');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            shipSpeed: 5,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.sound.play('sfx_select01');
          this.scene.start('playScene');    
        }
      }
      
}