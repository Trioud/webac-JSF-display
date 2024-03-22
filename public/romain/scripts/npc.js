export class Said {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = null; 
    }

    preload() {
        this.scene.load.spritesheet('said', 'romain/scripts/assets/Said.png', { frameWidth: 32, frameHeight: 32});
    }

    create() {
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'said');
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setPushable(false);
        this.sprite.setGravityY(600);
        
        this.scene.anims.create({
            key: 'said_left',
            frames: this.scene.anims.generateFrameNumbers('said', { start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'said_turn',
            frames: [{ key: 'said', frame: 1 }],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'said_right',
            frames: this.scene.anims.generateFrameNumbers('said', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.anims.play('said_left', true);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.anims.play('said_right', true);
        } else {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('said_turn');
        }
        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-500);
        }
    }
};

export class Nathan {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.player = null;
        this.sprite = null; 
        this.name = "Nathan:"
        
        this.dialogue = [
            {
                text: "Salut Romain ! Tu cherches aussi une alternance ?",
            },
            {
                text: "Je peux t'apprendre à être un développeur FRONT-END si tu veux :)",
                choices: [
                    { text: "Oui", value: "yes" },
                    { text: "Non", value: "no" }
                ]
            },
        ];
    }

    setPlayer(player) {
        this.player = player;
    }

    preload() {
        this.scene.load.spritesheet('nathan', 'romain/scripts/assets/nathan.png', { frameWidth: 32, frameHeight: 32});
    }

    create() {
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'nathan');
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setPushable(false);
        this.sprite.setGravityY(600);
        
        this.scene.anims.create({
            key: 'nathan_left',
            frames: this.scene.anims.generateFrameNumbers('nathan', { start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'nathan_turn',
            frames: [{ key: 'nathan', frame: 2 }],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'nathan_right',
            frames: this.scene.anims.generateFrameNumbers('nathan', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.anims.play('nathan_left', true);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.anims.play('nathan_right', true);
        } else {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('nathan_turn');
        }
        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-500);
        }
    }
}

export class Dylan {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = null;
        this.name = "Dylan:";

        this.dialogue = [
            {
                text: "Ta va twa ?", 
            },
            {
                text: "Tu veux faire du Laravel en full BACK-END ?",
                choices: [
                    { text: "Oui", value: "yes" },
                    { text: "Non", value: "no" }
                ]
            }
        ];
    }

    preload() {
        this.scene.load.spritesheet('dylan', 'romain/scripts/assets/dylan.png', { frameWidth: 32, frameHeight: 32});
    }

    create() {
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'dylan');
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setPushable(false);
        this.sprite.setGravityY(600);
        
        this.scene.anims.create({
            key: 'dylan_left',
            frames: this.scene.anims.generateFrameNumbers('dylan', { start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'dylan_turn',
            frames: [{ key: 'dylan', frame: 2 }],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'dylan_right',
            frames: this.scene.anims.generateFrameNumbers('dylan', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.anims.play('dylan_left', true);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.anims.play('dylan_right', true);
        } else {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('dylan_turn');
        }
        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-500);
        }
    }
}

export class Tanguy {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = null; 
        this.name = "Tanguy:"

        this.dialogue = [
            {
                text: "Quoi ?",
            },
            {
                text: "Je peux t'enseigner l'art du full-stack :p",
                choices: [
                    { text: "Oui", value: "yes" },
                    { text: "Non", value: "no" }
                ]
            },
        ];
    }

    preload() {
        this.scene.load.spritesheet('tanguy', 'romain/scripts/assets/tanguy.png', { frameWidth: 32, frameHeight: 32});
    }

    create() {
        this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'tanguy');
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setPushable(false);
        this.sprite.setGravityY(600);
        
        this.scene.anims.create({
            key: 'tanguy_left',
            frames: this.scene.anims.generateFrameNumbers('tanguy', { start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'tanguy_turn',
            frames: [{ key: 'tanguy', frame: 2 }],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'tanguy_right',
            frames: this.scene.anims.generateFrameNumbers('tanguy', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.anims.play('tanguy_left', true);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.anims.play('tanguy_right', true);
        } else {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('tanguy_turn');
        }
        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-500);
        }
    }
}