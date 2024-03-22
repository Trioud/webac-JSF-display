export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, hp, attack, defense, skill, intelligence, defect) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.skill = skill;
        this.intelligence = intelligence;
        this.defect = defect;
    }
    attackPNJ(pnj) {
        console.log(`Le Player attaque ${pnj}!`);
    }

    takeDamage(damage) {
        this.hp -= damage;
        console.log(`Le joueur subit ${damage} dégâts! Points de vie restants: ${this.hp}`);
    }

    moveLeft() {
        this.setVelocityX(-160);
        this.anims.play('left', true);
    }

    moveRight() {
        this.setVelocityX(160);
        this.anims.play('right', true);
    }

    stop() {
        this.setVelocityX(0);
        this.anims.play('turn');
    }

    jump() {
        if (this.body.touching.down) {
            this.setVelocityY(-330);
        }
    }
}




export class PNJ extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, questions, introductionPhrases, endPhrase) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.hp = 100; 
        this.attack = 10; 
        this.defense = 5; 
        this.questions = questions; 
        this.introductionPhrases = introductionPhrases; 
        this.endPhrase = endPhrase; 

        this.setCollideWorldBounds(true);
        this.setGravityY(500);
    }



    askQuestion() {
         const randomIndex = Math.floor(Math.random() * this.questions.length);
         const randomQuestion = this.questions[randomIndex];
 
         console.log(randomQuestion);
         return randomQuestion;
    }

    attackPlayer(player) {
        console.log(`Le PNJ attaque ${player}!`);
    }

    takeDamage(damage) {
        this.hp -= damage;
        console.log(`Le PNJ subit ${damage} dégâts! Points de vie restants: ${this.hp}`);
    }
}
