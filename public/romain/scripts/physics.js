export default class gamePhysics {
    constructor(scene) {
        this.scene = scene;
    }

    initPlayerPhysics(player) {
        player.sprite.setBounce(0);
        player.sprite.setCollideWorldBounds(true);
        player.sprite.setGravityY(600);
    }

    initObstaclePhysics(obstacle, immovable = true) {
        obstacle.setImmovable(immovable);
    }

    addCollision(playerSprite, obstaclesGroup) {
        this.scene.physics.add.collider(playerSprite, obstaclesGroup);
    }
}
