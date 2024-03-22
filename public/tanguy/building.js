// building.js

export class Building extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, scale) {
        super(scene, x, y, key);
        this.scene = scene;
        this.setScale(scale);
        this.setOrigin(0, 0);
        this.setDepth(0);
        this.scene.physics.world.enable(this);
        this.setInteractive();
        this.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.scene.add.existing(this);
    }
}