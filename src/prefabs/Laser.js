class Laser extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame,laserSpeed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.laserSpeed = 2;
        this.isShooting = false;
        //this.alpha = 0;
    }

    // show(){
    //     this.alpha = 1;
    // }
    update(){
            this.y -= this.laserSpeed;
            
    }

}
    // reset(){
    //     this.y = game.config.height - 835 ;
    //     this.alpha = 1;
    // }
 