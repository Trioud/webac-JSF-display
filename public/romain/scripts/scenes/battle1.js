import Background from '../background.js';
import Obstacles from '../obstacles.js';
import { Player } from '../player.js';
import gamePhysics from '../physics.js';
import { levels } from '../mapConfig.js';
import Portal from '../portal.js';
import userInterface from '../interface.js';

export class Battle1 extends Phaser.Scene {
    constructor() {
        super({key: 'Battle1'})
        this.isUIDisplayed = false;
        this.showCards = false;
    }

    init(data) {
        this.playerData = data.playerData;
        this.victory = data.victory || false;
    }

    userUi() {
        this.userInterface.toggleUIVisibility();
    
        if (this.isUIDisplayed) {
            this.userInterface.refresh();
        }
    
        this.isUIDisplayed = !this.isUIDisplayed;
    }

    preload() {
        this.background = new Background(this, 'recruiter1');
        this.background.preload();
        this.load.image('ground', 'romain/scripts/assets/platform.png');
        this.load.image('portal', 'romain/scripts/assets/portal.png');
        this.load.spritesheet('1stRecruiter', 'romain/scripts/assets/1stRecruiter.png', { frameWidth: 32, frameHeight: 32});
    }

    create() {

        if (this.sound.get('levelMusic') && this.sound.get('levelMusic').isPlaying) {
            this.sound.stopAll();
        }

        let tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        tabKey.on('down', (event) => {
            this.userUi();
        });

        this.currentLevel = 'level3';
        this.loadLevel(this.currentLevel);

        this.userInterface = new userInterface(this, this.player);
        this.createCards();

        this.physics.add.overlap(this.player.sprite, this.recruiterSprite, this.displayCards, null, this);
    }

    createCards() {
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.choosePrompt = this.add.text(centerX, centerY - 100, 'Choisissez une alternance', { font: '20px Arial', fill: '#000' }).setOrigin(0.5).setVisible(false);

        this.frontEndCard = this.add.text(centerX - 100, centerY - 20, 'Front-end', { font: '16px Arial', fill: '#000' }).setInteractive().setVisible(false);
        this.backEndCard = this.add.text(centerX - 100, centerY, 'Back-end', { font: '16px Arial', fill: '#000' }).setInteractive().setVisible(false);
        this.fullStackCard = this.add.text(centerX - 100, centerY + 20, 'Full-stack', { font: '16px Arial', fill: '#000' }).setInteractive().setVisible(false);

        this.frontEndCard.on('pointerdown', () => {
            if (this.player.ascendance === 'Front-End') {
                this.bossBattle('FrontEndScene', { playerData: this.player.exportData() });
            } else {
                this.showErrorMessage('Vous ne possèdez pas la bonne classe.');
            }
        });
    
        this.backEndCard.on('pointerdown', () => {
            if (this.playerData.ascendance === 'Back-End') {
                this.bossBattle('BackEndScene', { playerData: this.player.exportData() });
            } else {
                this.showErrorMessage('Vous ne possèdez pas la bonne classe.');
            }
        });
    
        this.fullStackCard.on('pointerdown', () => {
            if (this.playerData.ascendance === 'Full-Stack') {
                this.scene.stop('Battle1');
                this.scene.start('FullStackScene', { playerData: this.player.exportData() });
            } else {
                this.showErrorMessage('Vous ne possèdez pas la bonne classe.');
            }
        });
    }

    showErrorMessage(message) {
        const errorPositionY = this.sys.game.config.height / 2 + 60; 
        const errorMessage = this.add.text(this.sys.game.config.width / 2 - 100, errorPositionY, message, { font: '16px Arial', fill: '#ff0000' });
        
        errorMessage.setOrigin(0.5, 0);
    
        setTimeout(() => errorMessage.destroy(), 3000);
    }       

    displayCards(player, recruiter) {
        if (!this.showCards) {
            this.choosePrompt.setVisible(true);
            this.frontEndCard.setVisible(true);
            this.backEndCard.setVisible(true);
            this.fullStackCard.setVisible(true);
            this.showCards = true;
        }
    }

    bossBattle(sceneKey) {
        this.scene.stop('Battle1');
        this.scene.start(sceneKey, { playerData: this.player.exportData() });
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

        if (this.victory == true) {
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
                this.physics.add.overlap(this.player.sprite, this.portal.portalSprite, () => this.nextLevel(), null, this);
            }
        }

        this.player = new Player(this, this.playerData);
        this.player.create(levelConfig.playerStart.x, levelConfig.playerStart.y);

        this.gamePhysics = new gamePhysics(this);

        this.gamePhysics.initPlayerPhysics(this.player);

        this.recruiterSprite = this.physics.add.sprite(1140, 240, '1stRecruiter');

        this.gamePhysics.addCollision(this.player.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.recruiterSprite, this.obstacles.group);
    }

    nextLevel() {
        this.events.on('shutdown', () => {
            if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });

        this.scene.stop('Battle1');
        this.scene.start('Battle2', { playerData: this.player.exportData() });
    }

    update() {
        this.player.update();
        this.userInterface.refresh();
    }
}

export class Battle1_Success extends Phaser.Scene {
    constructor() {
        super({key: 'Battle1_Success'})
        this.isUIDisplayed = false;
        this.showCards = false;
    }

    init(data) {
        this.playerData = data.playerData;
        this.victory = data.victory || false;
    }

    userUi() {
        this.userInterface.toggleUIVisibility();
    
        if (this.isUIDisplayed) {
            this.userInterface.refresh();
        }
    
        this.isUIDisplayed = !this.isUIDisplayed;
    }

    preload() {
        this.background = new Background(this, 'recruiter1');
        this.background.preload();
        this.load.image('ground', 'romain/scripts/assets/platform.png');
        this.load.image('portal', 'romain/scripts/assets/portal.png');
        this.load.spritesheet('1stRecruiter', 'romain/scripts/assets/1stRecruiter.png', { frameWidth: 32, frameHeight: 32});
    }

    create() {

        if (this.sound.get('levelMusic') && this.sound.get('levelMusic').isPlaying) {
            this.sound.stopAll();
        }

        let tabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        tabKey.on('down', (event) => {
            this.userUi();
        });

        this.currentLevel = 'level3';
        this.loadLevel(this.currentLevel);

        this.userInterface = new userInterface(this, this.player);

        this.physics.add.overlap(this.player.sprite, this.portal.portalSprite, () => this.nextLevel(), null, this);
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

        this.player = new Player(this, this.playerData);
        this.player.create(1080, 210);

        this.gamePhysics = new gamePhysics(this);

        this.gamePhysics.initPlayerPhysics(this.player);

        this.recruiterSprite = this.physics.add.sprite(1140, 240, '1stRecruiter');

        this.gamePhysics.addCollision(this.player.sprite, this.obstacles.group);
        this.gamePhysics.addCollision(this.recruiterSprite, this.obstacles.group);
    }

    nextLevel() {
        this.events.on('shutdown', () => {
            if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });

        this.scene.stop('Battle1');
        this.scene.start('Battle2', { playerData: this.player.exportData() });
    }

    update() {
        this.player.update();
        this.userInterface.refresh();
    }
}