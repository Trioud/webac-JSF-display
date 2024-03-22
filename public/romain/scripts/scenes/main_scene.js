import Background from '../background.js';
import Obstacles from '../obstacles.js';
import { Player } from '../player.js';
import gamePhysics from '../physics.js';
import { levels } from '../mapConfig.js';
import Portal from '../portal.js';
import userInterface from '../interface.js';
import { Said } from '../npc.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.isUIDisplayed = false;
    }

    preload() {
        this.background = new Background(this, 'bg');
        this.background.preload();
        this.load.image('ground', 'romain/scripts/assets/platform.png');
        this.load.image('portal', 'romain/scripts/assets/portal.png');
        this.said = new Said(this, this.x, this.y);
        this.said.preload();

        this.player = new Player(this, this.x, this.y);
        this.player.preload();
    }
    
    create() {
        let tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        tabKey.on('down', (event) => {
            this.userUi();
        });

        this.currentLevel = 'level1';
        this.loadLevel(this.currentLevel);

        this.userInterface = new userInterface(this, this.player);
        this.physics.add.overlap(this.player.sprite, this.portal.portalSprite, () => this.nextLevel(), null, this);
    }

    userUi() {
        this.userInterface.toggleUIVisibility();
    
        if (this.isUIDisplayed) {
            this.userInterface.refresh();
        }
    
        this.isUIDisplayed = !this.isUIDisplayed;
    }

    loadLevel(levelKey) {
        const levelConfig = levels[levelKey];
        this.background.create();

        if (levelConfig.music) {
            this.load.once('complete', () => {
                this.backgroundMusic = this.sound.add('level1Music', { loop: true });
                this.backgroundMusic.play();
            });
    
            this.load.audio('level1Music', levelConfig.music);
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

        this.player = new Player(this);
        this.player.create(levelConfig.playerStart.x, levelConfig.playerStart.y);

        this.gamePhysics = new gamePhysics(this);

        this.gamePhysics.initPlayerPhysics(this.player);

        this.gamePhysics.addCollision(this.player.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.said.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.player.sprite, this.said.sprite);
    }

    nextLevel() {
        this.events.on('shutdown', () => {
            if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });

        this.scene.stop('Mainscene');
        this.scene.start('Shop', { playerData: this.player.exportData() });
    }

    update() {
        this.player.update();
        this.userInterface.refresh();
    }
}