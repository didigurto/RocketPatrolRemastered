class Ship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, moveSpeed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = game.settings.shipSpeed;
    }

    update(){
        this.y += this.moveSpeed;
        if(this.y > game.config.height){
            this.y = game.config.height - 830;    
        }
    }

    reset(){
        this.y = game.config.height - 835 ;
        this.alpha = 1;
    }
} 