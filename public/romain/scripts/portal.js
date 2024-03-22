export default class Portal {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
    }

    preload() {
        this.scene.load.image('portal', 'romain/scripts/assets/portal.png');
    }

    create() {
        this.portalSprite = this.scene.physics.add.staticSprite(this.x, this.y, 'portal');
        this.portalSprite.setScale(0.3);
        this.portalSprite.body.setSize(this.portalSprite.width * 0.3, this.portalSprite.height * 0.3);
        
        this.portalSprite.body.setOffset(
            (this.portalSprite.width - this.portalSprite.width * 0.3) / 2,
            (this.portalSprite.height - this.portalSprite.height * 0.3) / 2
        );
    }

}
