import Background from '../background.js';
import Obstacles from '../obstacles.js';
import { Player } from '../player.js';
import gamePhysics from '../physics.js';
import { levels } from '../mapConfig.js';
import Portal from '../portal.js';
import userInterface from '../interface.js';
import { Said, Nathan, Dylan, Tanguy } from '../npc.js';
import DialogueHandler from '../dialogue.js';

export class Shop extends Phaser.Scene {
    constructor() {
        super({key: 'Shop'})
        this.isUIDisplayed = false;
        this.currentNpc = null;
    }

    init(data) {
        this.playerData = data.playerData;
    }

    preload() {
        this.background = new Background(this, 'shop_bg');
        this.background.preload();

        this.load.image('ground', 'romain/scripts/assets/platform.png');
        this.load.image('portal', 'romain/scripts/assets/portal.png');
        this.load.spritesheet('nathan', 'romain/scripts/assets/nathan.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('dylan', 'romain/scripts/assets/dylan.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('tanguy', 'romain/scripts/assets/tanguy.png', { frameWidth: 32, frameHeight: 32});

        this.said = new Said(this, this.x, this.y);
        this.said.preload();

        this.player = new Player(this, this.x, this.y);
        this.player.preload();
    }

    userUi() {
        this.userInterface.toggleUIVisibility();
    
        if (this.isUIDisplayed) {
            this.userInterface.refresh();
        }
    
        this.isUIDisplayed = !this.isUIDisplayed;
    }

    create() {

        if (this.sound.get('levelMusic') && this.sound.get('levelMusic').isPlaying) {
            this.sound.stopAll();
        }

        let tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        tabKey.on('down', (event) => {
            this.userUi();
        });

        this.currentLevel = 'level2';
        this.loadLevel(this.currentLevel);

        this.userInterface = new userInterface(this, this.player);
        this.dialogueManager = new DialogueHandler(this);
        
        let spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on('down', () => {
            this.startDialogue();
            
        });

        this.physics.add.overlap(this.player.sprite, this.portal.portalSprite, () => this.nextLevel(), null, this);
    }

    startDialogue() {
        let closestNpc = null;
        let smallestDistance = Number.MAX_VALUE;
    
        const npcArray = [this.nathan, this.dylan, this.tanguy, this.said]; 
        const interactionDistance = 100; 

        npcArray.forEach(npc => {
            const distance = Phaser.Math.Distance.Between(
                this.player.sprite.x, this.player.sprite.y,
                npc.sprite.x, npc.sprite.y,
            );
    
            if (distance < smallestDistance && distance < interactionDistance) {
                smallestDistance = distance;
                closestNpc = npc;
            }
        });
    
        if (closestNpc) {
            this.currentNpc = closestNpc;
            this.dialogueManager.setDialogues(closestNpc.dialogue, closestNpc.name);
            this.dialogueManager.showDialogue();
        }

        this.userInterface.refresh();
    }

    handleChoiceSelection(choiceValue) {
        console.log("choice:", choiceValue);

        if (this.currentNpc == this.nathan) {
            if (choiceValue === "yes") {
                this.player.setAscendance("Front-End")
                this.player.setSkill('html', 3);
                this.player.setSkill('javascript', 2);
                this.player.setSkill('php', 1)
            }
        } else if (this.currentNpc == this.dylan) {
            if (choiceValue === "yes") {
                this.player.setAscendance("Back-End")
                this.player.setSkill('php', 5);
                this.player.setSkill('javascript', 1);
                this.player.setSkill('html', 1)
            }
        } else {
            if (choiceValue === "yes") {
                this.player.setAscendance("Full-Stack")
                this.player.setSkill('html', 2)
                this.player.setSkill('php', 4)
                this.player.setSkill('javascript', 3)
            }
        }

        this.currentNpc = null;
    }
    

    loadLevel(levelKey) {
        const levelConfig = levels[levelKey];
        this.background.create();

        if (levelConfig.music) {
            this.load.once('complete', () => {
                this.backgroundMusic = this.sound.add('levelMusic', { loop: true });
                this.backgroundMusic.play();
            });
    
            this.load.audio('levelMusic', levelConfig.music);
            this.load.start();
        }

        this.obstacles = new Obstacles(this);

        levelConfig.obstacles.forEach(obstacleConfig => {
            this.obstacles.addObstacle(obstacleConfig.x, obstacleConfig.y, obstacleConfig.texture, obstacleConfig.scale, obstacleConfig.width, obstacleConfig.moving, obstacleConfig.speed, obstacleConfig.distance);
        });

        if (levelConfig.npc) {
            const saidConfig = levelConfig.npc;
            this.saidConfig = new Said(
                this,
                saidConfig.x,
                saidConfig.y,
                saidConfig.texture,
            );
            this.said = new Said(this, saidConfig.x, saidConfig.y);
            this.said.preload();
            this.said.create();
        }

        if (levelConfig.portal) {
            const portalConfig = levelConfig.portal;
            this.portal = new Portal(
                this, 
                portalConfig.x, 
                portalConfig.y, 
                portalConfig.texture,
                () => this.nextLevel(portalConfig.nextLevel)
            );
            this.portal.create();
        }

        this.nathan = new Nathan(this, 340, 400)
        this.nathan.create();
        this.nathan.setPlayer(this.player);

        this.dylan = new Dylan(this, 875, 370)
        this.dylan.create();

        this.tanguy = new Tanguy(this, 1065, 370)
        this.tanguy.create();

        this.player = new Player(this, this.playerData);
        this.player.create(levelConfig.playerStart.x, levelConfig.playerStart.y);

        this.gamePhysics = new gamePhysics(this);

        this.gamePhysics.initPlayerPhysics(this.player);

        this.gamePhysics.addCollision(this.player.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.nathan.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.dylan.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.tanguy.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.said.sprite, this.obstacles.group);

        //this.physics.add.overlap(this.player.sprite, this.portal.portalSprite, () => this.nextLevel(), null, this);
    }

    nextLevel() {
        this.events.on('shutdown', () => {
            if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });

        this.scene.stop('Shop');
        this.scene.start('Battle1', { playerData: this.player.exportData() });
    }

    update() {
        this.player.update();
        this.userInterface.refresh();
    }
}