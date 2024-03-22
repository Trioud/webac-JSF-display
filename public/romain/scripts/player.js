export class Player {
    constructor(scene, data = null) {
        this.scene = scene;
        
        if(data) {
            this.hp = data.hp;
            this.skill = { ...data.skill };
            this.name = data.name;
            this.ascendance = data.ascendance;
            this.level = data.level;
            this.currentExp = data.currentExp;
            this.nextLevelExp = data.nextLevelExp;
        } else {
            this.hp = 100;

            this.skill = {
                php: 1,
                html: 1,
                javascript: 1
            };

            this.name = "Romain";
            
            this.ascendance = "Undefiened";

            this.level = 1;
            this.currentExp = 0;
            this.nextLevelExp = 100;
        }
        this.sprite = null;
    }

    getName(){
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getAscendance() {
        return this.ascendance;
    }

    setAscendance(ascendance) {
        this.ascendance = ascendance;
    }

    getHp() {
        return this.hp;
    }
    
    setHp(hp) {
        this.hp = hp;
    }    
    
    getSoftSkill() {
        return this.softskill;
    }
    
    addSoftSkill(skill) {
        this.softskill.push(skill);
    }    

    getSkill(skill) {
        return this.skill[skill];
    }
    
    setSkill(skillName, level) {
        if (this.skill[skillName] !== undefined) {
            this.skill[skillName] = level;
            console.log(`La compétence ${skillName} a été mise à jour à ${level}.`);
        } else {
            console.log(`La compétence ${skillName} n'existe pas.`);
        }
    }         

    getLevel() {
        return this.level;
    }
    
    setLevel(level) {
        this.level = level;
    }
    
    getCurrentExp() {
        return this.currentExp;
    }
    
    getNextLevelExp() {
        return this.nextLevelExp;
    }    

    gainExp(amount) {
        this.currentExp += amount;
        if (this.currentExp >= this.nextLevelExp) {
            this.levelUp();
        }
        this.updateExpBar();
    }
    
    levelUp() {
        this.level++;
        this.currentExp -= this.nextLevelExp;
        this.nextLevelExp = Math.floor(this.nextLevelExp * 1.5);
        console.log(`Félicitations ! Niveau ${this.level} atteint.`);
    }

    preload() {
        this.scene.load.spritesheet('player', 'romain/scripts/assets/mc_player.png', { frameWidth: 32, frameHeight: 32});
        this.scene.load.audio('jump', 'romain/scripts/skills/jumps.wav');
        this.scene.load.audio('dash', 'romain/scripts/skills/dash.mp3');
    }

    create(x, y) {
        this.sprite = this.scene.physics.add.sprite(x, y, 'player');
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setGravityY(600);
        this.sprite.setScale(1.2);  

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    exportData() {
        return {
            hp: this.hp,
            skill: { ...this.skill },
            name: this.name,
            ascendance: this.ascendance,
            level: this.level,
            currentExp: this.currentExp,
            nextLevelExp: this.nextLevelExp
        };
    }   

    destroy() {
        if (this.sprite) {
            this.sprite.destroy();
            this.sprite = null;
        }
        
        console.log(`${this.name} has been removed from the game.`);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.anims.play('right', true);
        } else {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-500);
            this.scene.sound.play('jump');
        }
    }
}