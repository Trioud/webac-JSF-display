// ./character.js
import { mainCharacters } from "./characters/mainCharacters.js";
import { randomCharacters } from "./characters/randomCharacters.js";
import { recruiterCharacters } from "./characters/recruiterCharacters.js";

export class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, character, initialFace) {
        const assetKey = Character.getAssetKey(character);

        super(scene, x, y, assetKey);
        scene.physics.add.existing(this);

        this.assetKey = assetKey;
        this.setSpriteFace(initialFace);

        this.controlsEnabled = true;
        this.verticalControlsEnabled = true;
        this.horizontalControlsEnabled = true;
        this.body.setCollideWorldBounds(true);

        this.initialPosition = { x: null, y: null };
        this.distanceTraveled = 0;

        const foundCharacter = mainCharacters.find(char => char.key === this.assetKey);
        const foundRandomChar = randomCharacters.find(char => char.key === this.assetKey);
        const foundRecruiterChar = recruiterCharacters.find(char => char.key === this.assetKey);

        if (foundCharacter) {
            this.name = foundCharacter.name;
            this.image = foundCharacter.image;
            this.health = foundCharacter.health;
            this.vulnerability = foundCharacter.vulnerability;
            this.skills = foundCharacter.skills;
        } else if (foundRandomChar || foundRecruiterChar) {
            this.name = foundRandomChar ? foundRandomChar.name : foundRecruiterChar.name;
            this.company = foundRecruiterChar ? foundRecruiterChar.company : null;
            this.health = foundRandomChar ? foundRandomChar.health : foundRecruiterChar.health;
        }

        this.addKeyboardInput();

        this.setDepth(2);
        scene.add.existing(this);

        this.createAnimations();
    }

    static preload(scene) {
        mainCharacters.forEach(character => {
            scene.load.spritesheet(character.key, character.sprite, { frameWidth: 32, frameHeight: 32 });
        });

        randomCharacters.forEach(character => {
            scene.load.spritesheet(character.key, character.sprite, { frameWidth: 32, frameHeight: 32 });
        });

        recruiterCharacters.forEach(character => {
            scene.load.spritesheet(character.key, character.sprite, { frameWidth: 32, frameHeight: 32 });
        });
    }

    setSpriteFace(direction) {
        let frame;

        switch (direction) {
            case 'up':
                frame = 9;
                break;
            case 'down':
                frame = 0;
                break;
            case 'left':
                frame = 3;
                break;
            case 'right':
                frame = 6;
                break;
            default:
                frame = 0;
        }

        this.setFrame(frame);
    }

    static getAssetKey(character) {
        const characterKeyMap = {};

        mainCharacters.concat(randomCharacters, recruiterCharacters).forEach(char => {
            characterKeyMap[char.name.toLowerCase()] = char.key;
        });

        return characterKeyMap[character.toLowerCase()] || 'character_default';
    }

    addKeyboardInput() {
        if (this.scene.input) {
            this.cursors = this.scene.input.keyboard.createCursorKeys();
        } else {
            console.error("Scene input is not available.");
        }
    }

    createAnimations() {
        if (this.controlsEnabled) {
            if (this.horizontalControlsEnabled) {
                if (!this.anims.exists('left')) {
                    this.anims.create({
                        key: 'left',
                        frames: this.anims.generateFrameNumbers(this.assetKey, { start: 3, end: 5 }),
                        frameRate: 10,
                        repeat: -1
                    });
                }

                // if (!this.anims.exists('turn')) {
                //     this.anims.create({
                //         key: 'turn',
                //         frames: [{ key: this.assetKey, frame: 0 }],
                //         frameRate: 20
                //     });
                // }

                if (!this.anims.exists('right')) {
                    this.anims.create({
                        key: 'right',
                        frames: this.anims.generateFrameNumbers(this.assetKey, { start: 6, end: 8 }),
                        frameRate: 10,
                        repeat: -1
                    });
                }
            }

            if (this.verticalControlsEnabled) {
                if (!this.anims.exists('up')) {
                    this.anims.create({
                        key: 'up',
                        frames: this.anims.generateFrameNumbers(this.assetKey, { start: 9, end: 11 }),
                        frameRate: 10,
                        repeat: -1
                    });
                }

                if (!this.anims.exists('down')) {
                    this.anims.create({
                        key: 'down',
                        frames: this.anims.generateFrameNumbers(this.assetKey, { start: 0, end: 2 }),
                        frameRate: 10,
                        repeat: -1
                    });
                }
            }
        }
    }

    update() {
        this.moveCharacter();
    }

    moveCharacter() {
        if (this.controlsEnabled) {
            let isMoving = false;
            if (this.horizontalControlsEnabled) {
                // console.log("Horizontal controls enabled");
                if (this.cursors.left.isDown) {
                    this.moveLeft();
                    isMoving = true;
                    // console.log("Left key down");
                } else if (this.cursors.right.isDown) {
                    this.moveRight();
                    isMoving = true;
                }
            }

            if (this.verticalControlsEnabled) {
                // console.log("Vertical controls enabled");
                if (this.cursors.up.isDown) {
                    this.moveUp();
                    isMoving = true;
                } else if (this.cursors.down.isDown) {
                    this.moveDown();
                    isMoving = true;
                }
            }

            if (!isMoving) {
                this.stopMoving();
            }
        }
    }


    moveLeft() {
        this.setVelocityX(-100);
        // this.setSpriteFace('left');
        this.play('left', true);
    }

    moveRight() {
        this.setVelocityX(100);
        // this.setSpriteFace('right');
        this.play('right', true);
    }

    moveUp() {
        this.setVelocityY(-100);
        // this.setSpriteFace('up');
        this.play('up', true);
    }

    moveDown() {
        this.setVelocityY(100);
        // this.setSpriteFace('down');
        this.play('down', true);
    }

    stopMoving() {
        this.setVelocity(0);
        this.anims.stop();
        // this.play('turn', true);
    }

    isMoving() {
        return this.body.velocity.x !== 0 || this.body.velocity.y !== 0;
    }

    distanceCalculator(distance) {
        console.log('this.x:', this.x);
        console.log('this.initialPosition.x:', this.initialPosition.x);
        const distanceTraveled = Math.abs(this.x - this.initialPosition.x);
        console.log('Distance parcourue :', distanceTraveled);
        return distanceTraveled >= distance;
    }
    jump(velocity) {
        this.body.setVelocityY(velocity);
    }

    attack(target) {
        const damage = this.skills.attack - target.skills.defense;
        target.receiveDamage(damage);
    }

    receiveDamage(damage) {
        if (this.vulnerability === 'fire') {
            damage *= 1.5;
        }

        this.health -= damage;

        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.destroy();
    }
}