class Laser extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        //this.alpha = 0;
    }

    show(){
        this.alpha = 1;
    }
    update(){
        this.y -= 2;
        }
    }


    // reset(){
    //     this.y = game.config.height - 835 ;
    //     this.alpha = 1;
    // }
 