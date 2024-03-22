export default class Obstacles {
    constructor(scene) {
        this.scene = scene;
        this.group = this.scene.physics.add.group();
    }

    addObstacle(x, y, texture, scale = 1, width = undefined, moving = false, speed = 2000, distance = 100) {
        const obstacle = this.group.create(x, y, texture).setScale(scale);

        if (width !== undefined) {
            obstacle.displayWidth = width;
            const scaleY = obstacle.displayHeight / obstacle.height;
            obstacle.displayHeight = obstacle.height * scaleY;
        }

        if (moving) {
            obstacle.setImmovable(true);
            obstacle.body.setAllowGravity(false);
            let tweenConfig = {
                targets: obstacle,
                ease: 'Linear',
                duration: speed,
                yoyo: true,
                repeat: -1
            };
        
            if (moving === 'y_axe') {
                tweenConfig.y = obstacle.y - distance;
            } else if (moving === 'x_axe') {
                tweenConfig.x = obstacle.x + distance;
            }
            this.scene.tweens.add(tweenConfig);
        } else {
            obstacle.setImmovable(true);
            obstacle.body.setAllowGravity(false);
        }        
    }
}