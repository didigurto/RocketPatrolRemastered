class Laser extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame,laserSpeed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.laserSpeed = 2;
        this.isShooting = false;
    }

    update(){
        this.y -= this.laserSpeed;
        // if(this.y < borderUISize*3) {
        //     this.reset();
        // }
    

    // if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isShooting) {
    //     this.laser = new Laser(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'laser');
    //     this.isShooting = true;
    // }

}

    reset(){
        this.isShooting = false;
        // this.alpha = 1;
    }
}