class Title extends Phaser.Scene {
  constructor() {
    super({ key: "Title" });
  }

  preload() {
    this.load.image("start", "wendy/image/Default.png");
    this.load.image("hover", "wendy/image/Hover.png");
    this.load.image("logo", "wendy/image/logo.png");
    this.load.image("bg", "wendy/image/bg.png");
    this.load.audio("bgmusic", "wendy/image/bgmusic.mp3");
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
  }

  create() {
    this.backgroundMusic = this.sound.add("bgmusic", { loop: true });
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    this.backgroundMusic.play();
    const bg = this.add.image(0, 0, "bg");
    this.logo = this.add.image(100, 280, "logo");
    this.logo.setDisplaySize(120, 25);
    this.add.text(185, 278, "Wendy Asmatico - 2024", {
      fontFamily: "Kode Mono",
      fontSize: 10,
      color: "white",
      border: "2px solid",
    });
    this.button = this.add.image(500, 150, "start");
    this.button.setInteractive();
    bg.setScale(1.5);
    this.add.text(350, 50, "ALTERNANCE QUEST", {
      fontFamily: "Kode Mono",
      fontSize: 30,
      color: "white",
      border: "2px solid",
    });

    this.button.on("pointerover", () => {
      this.button.setTexture("hover");
      this.select.play();
    });

    this.button.on("pointerout", () => {
      this.button.setTexture("start");
    });

    this.button.on("pointerdown", () => {
      this.press.play();
      this.changeScene();
    });
  }

  changeScene() {
    let scene = "CharacterSelection";
    this.scene.start(scene);
  }
}

class CharacterSelection extends Phaser.Scene {
  constructor() {
    super({ key: "CharacterSelection" });
  }

  preload() {
    this.load.image("LeonP", "wendy/image/LeonP.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("AlainP", "wendy/image/AlainP.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("ChloeP", "wendy/image/ChloeP.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
  }

  create() {
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    const bg = this.add.image(0, 0, "bg");
    bg.setScale(1.5);
    const character1 = this.add.image(400, 100, "LeonP").setInteractive();
    character1.setDisplaySize(200, 150);
    const character2 = this.add.image(600, 100, "AlainP").setInteractive();
    character2.setDisplaySize(200, 150);
    const character3 = this.add.image(800, 100, "ChloeP").setInteractive();
    character3.setDisplaySize(200, 150);
    this.add.text(30, 100, "Choisissez\nvotre personnage", {
      fontFamily: "Kode Mono",
      fontSize: 30,
      color: "white",
    });

    character1.on("pointerover", () => {
      this.select.play();
      character1.setTint(0xffffff);
      this.showCharacterName("Leon", 400, 200);
    });
    character1.on("pointerout", () => {
      character1.clearTint();
      this.hideCharacterName();
    });
    character1.on("pointerdown", () => {
      this.press.play();
      this.selectCharacter("Leon");
    });

    character2.on("pointerover", () => {
      this.select.play();
      character2.setTint(0xffffff);
      this.showCharacterName("Alain", 600, 200);
    });
    character2.on("pointerout", () => {
      character2.clearTint();
      this.hideCharacterName();
    });
    character2.on("pointerdown", () => {
      this.press.play();
      this.selectCharacter("Alain");
    });

    character3.on("pointerover", () => {
      this.select.play();
      character3.setTint(0xffffff);
      this.showCharacterName("Chloe", 800, 200);
    });
    character3.on("pointerout", () => {
      character3.clearTint();
      this.hideCharacterName();
    });

    character3.on("pointerdown", () => {
      this.press.play();
      this.selectCharacter("Chloe");
    });
  }
  selectCharacter(select) {
    let spriteKey;
    if (select === "Leon") {
      spriteKey = "Leon";
    } else if (select === "Alain") {
      spriteKey = "Alain";
    } else if (select === "Chloe") {
      spriteKey = "Chloe";
    }
    console.log(spriteKey);
    this.scene.start("Map", { selectedCharacter: spriteKey });
  }

  showCharacterName(name, x, y) {
    this.characterNameText = this.add.text(x, y, name, {
      fontFamily: "Kode Mono",
      fontSize: 20,
      color: "#ffffff",
    });
    this.characterNameText.setOrigin(0.5);
  }

  hideCharacterName() {
    if (this.characterNameText) {
      this.characterNameText.destroy();
    }
  }
}
class Map extends Phaser.Scene {
  constructor() {
    super({ key: "Map" });
    this.combatFait1 = false;
    this.combatFait2 = false;
    this.combatFait3 = false;
    this.combatFait4 = false;
  }

  preload() {
    this.load.spritesheet("Alain", "wendy/image/Alain.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Chloe", "wendy/image/Chloe.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Leon", "wendy/image/Leon.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("panneau", "wendy/image/panneau.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("deco", "wendy/image/ville.png");
    this.load.audio("press", "wendy/image/press.mp3");
    this.load.audio("step", "wendy/image/step.mp3");
  }

  create(data) {
    let combatFait1 = false;
    let combatFait2 = false;
    let combatFait3 = false;
    let combatFait4 = false;

    this.press = this.sound.add("press");
    this.step = this.sound.add("step");

    const selectedCharacter = data.selectedCharacter;
    const skyBG = this.add.image(0, 0, "deco").setOrigin(0).setScrollFactor(0);
    skyBG.displayWidth = 1500;
    skyBG.displayHeight = 300;
    this.player = this.physics.add.sprite(100, 290, selectedCharacter);

    this.player.setOrigin(0.75, 0.5);
    this.player.setSize(32, 32);
    this.player.body.collideWorldBounds = true;

    this.anims.create({
      key: "stand",
      frames: this.anims.generateFrameNumbers(selectedCharacter, {
        start: 1,
        end: 2,
      }),
      frameRate: 5,
      repeat: 1,
    });

    this.anims.create({
      key: "walkG",
      frames: this.anims.generateFrameNumbers(selectedCharacter, {
        start: 4,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });

    this.anims.create({
      key: "walkD",
      frames: this.anims.generateFrameNumbers(selectedCharacter, {
        start: 7,
        end: 8,
      }),
      frameRate: 5,
      repeat: 1,
    });

    this.anims.create({
      key: "walkU",
      frames: this.anims.generateFrameNumbers(selectedCharacter, {
        start: 11,
        end: 11,
      }),
      frameRate: 5,
      repeat: 1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.ice = this.add.image(150, 250, "panneau");
    this.barber = this.add.image(350, 250, "panneau");
    this.theatre = this.add.image(650, 250, "panneau");
    this.fish = this.add.image(910, 250, "panneau");
    this.questionText = this.add.text(
      275,
      25,
      "Appuyez sur entrée devant une porte pour faire votre entretien",
      {
        fontFamily: "Kode Mono",
        fontSize: 20,
        color: "black",
      }
    );
  }

  update() {
    if (this.cursors.left.isDown) {
      this.step.play();
      this.player.anims.play("walkG", true);
      this.player.setVelocityX(-75);
    } else if (this.cursors.right.isDown) {
      this.step.play();
      this.player.anims.play("walkD", true);
      this.player.setVelocityX(75);
    } else if (this.cursors.up.isDown) {
      this.step.play();
      this.player.anims.play("walkU");
    } else if (this.cursors.down.isDown) {
      this.step.play();
      this.player.anims.play("stand");
    } else {
      this.player.setVelocity(0);
    }

    if (
      this.player.x >= 200 &&
      this.player.x <= 250 &&
      this.player.y >= 280 &&
      this.player.y <= 300 &&
      this.enterKey.isDown
    ) {
      if (this.combatFait1 == false) {
        this.press.play();
        this.scene.start("Entretiens");
        this.combatFait1 = true;
      } else {
      }
    }
    if (
      this.player.x >= 400 &&
      this.player.x <= 450 &&
      this.player.y >= 280 &&
      this.player.y <= 300 &&
      this.enterKey.isDown
    ) {
      if (this.combatFait2 == false) {
        this.press.play();
        this.scene.start("Entretiens2");
        this.combatFait2 = true;
      } else {
      }
    }
    if (
      this.player.x >= 680 &&
      this.player.x <= 730 &&
      this.player.y >= 280 &&
      this.player.y <= 300 &&
      this.enterKey.isDown
    ) {
      if (this.combatFait3 == false) {
        this.press.play();
        this.scene.start("Entretiens3");
        this.combatFait3 = true;
      } else {
      }
    }

    if (
      this.player.x >= 950 &&
      this.player.x <= 990 &&
      this.player.y >= 280 &&
      this.player.y <= 300 &&
      this.enterKey.isDown
    ) {
      if (this.combatFait4 == false) {
        this.press.play();
        this.scene.start("Entretiens4");
        this.combatFait4 = true;
      } else {
      }
    }
  }
}
class HealthBar {
  constructor(scene, x, y, width, height) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;
    this.width = width; // Nouvelle largeur de la barre
    this.height = height; // Nouvelle hauteur de la barre
    this.value = 100;
    this.p = this.width / 100;

    this.draw();

    scene.add.existing(this.bar);
  }

  decrease(amount) {
    this.value -= amount;

    if (this.value < 0) {
      this.value = 0;
    }

    this.draw();

    return this.value === 0;
  }

  draw() {
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.width, this.height);

    //  Health

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, this.width - 2, this.height - 2);

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    var d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.x + 2, this.y + 2, d, this.height - 2);
  }
}

class Entretiens extends Phaser.Scene {
  constructor() {
    super({ key: "Entretiens" });
  }
  preload() {
    this.load.image("shopIce", "wendy/image/shop.png");
    this.load.image("sellerIce", "wendy/image/seller.png");
    this.load.image("dialogueBox", "wendy/image/metalPanel.png");
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
    this.load.audio("hurt", "wendy/image/hurt.mp3");
  }

  create() {
    const Ice = this.add.image(0, 0, "shopIce").setOrigin(0).setScrollFactor(0);
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    this.hurt = this.sound.add("hurt");
    Ice.displayWidth = 1000;
    Ice.displayHeight = 300;
    this.dialogueBox = this.add.image(310, 100, "dialogueBox");
    this.dialogueBox.setDisplaySize(550, 150);
    this.sellerIce = this.add.image(750, 150, "sellerIce");
    this.sellerIce.setDisplaySize(300, 250);
    this.healthBarE = new HealthBar(this, 125, 50, 200, 15);
    this.add.text(360, 50, "Recruteur", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });

    this.dialogueBoxP = this.add.image(760, 220, "dialogueBox");
    this.dialogueBoxP.setDisplaySize(310, 90);
    this.healthBarP = new HealthBar(this, 650, 190, 200, 15);
    this.add.text(670, 220, "Candidat", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });
    this.enemyHP = 100;
    this.playerHP = 100;

    this.dialogueBoxR = this.add.image(310, 250, "dialogueBox");
    this.dialogueBoxR.setDisplaySize(450, 90);

    this.questions = [
      {
        question: "Comment abordez-vous les conflits ?",
        options: [
          "En évitant le conflit",
          "En confrontant",
          "En demandant une aide\ndu supérieur",
          " Laisser les autres\nmembres le faire",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Comment décririez-vous votre capacité\nà travailler sous pression ?",
        options: [
          "Je suis effondré",
          "Je cherche une aide",
          "Je reste calme",
          " Je deviens stressé\nmais je continue",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Comment gérez-vous les stocks pour\néviter les pénuries ou les excédents ?",
        options: [
          "quand les\nstocks sont épuisés.",
          "surveiller puis passer\ndes commandes anticipées",
          "Commander le même\nmontant",
          "En ne se préoccupant pas",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Quels sont les ingrédients pour fabriquer\nune crème glacée traditionnelle ?",
        options: [
          "Lait,crème,sucre,\njaunes œufs",
          "Eau,sucre,fruits frais",
          "Farine,sucre,\nœufs,beurre",
          "Lait,sucre,\ncolorants artificiels",
        ],
        correctAnswer: 0,
      },
      {
        question: "Quel est votre niveau \nde sociabilité ?",
        options: [
          "Très introverti",
          "Plutôt réservé",
          "Assez extraverti",
          "Très extraverti",
        ],
        correctAnswer: 2,
      },
      {
        question: "Situation : Vous faites tomber\nvotre glace",
        options: [
          "Je râle et cris",
          "Je nettoies vite",
          "Je laisse le\nstagiaire nettoyer",
          "Je refais une glace\npuis nettoies",
        ],
        correctAnswer: 1,
      },
      {
        question: "Hello, which ice cream would you\nrecommend?",
        options: [
          "Chocolate",
          "It costs five euros.",
          "Je ne comprends pas...",
          "The flavor of the day\nis caramel and apple",
        ],
        correctAnswer: 3,
      },
    ];
    this.currentQuestionIndex = 0;
    this.displayQuestion();
  }

  displayQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionText = this.add.text(110, 90, currentQuestion.question, {
      fontFamily: "Kode Mono",
      fontSize: 20,
      color: "black",
    });

    const optionsTexts = [];
    currentQuestion.options.forEach((option, index) => {
      let x, y;
      if (index < 2) {
        x = 130 + index * 200;
        y = 225;
      } else {
        x = 130 + (index - 2) * 200;
        y = 260;
      }
      const optionText = this.add
        .text(x, y, option, {
          fontFamily: "Kode Mono",
          fontSize: 14,
          color: "black",
        })
        .setInteractive();
      optionText.on("pointerover", () => {
        this.select.play();
        optionText.setColor("red");
      });
      optionText.on("pointerout", () => {
        optionText.setColor("black");
      });

      optionText.on("pointerdown", () => {
        this.press.play();
        this.checkAnswer(index);
        optionsTexts.forEach((text) => text.destroy());
      });
      optionsTexts.push(optionText);
    });
  }
  checkAnswer(selectedIndex) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
      this.hurt.play();
      this.enemyHP -= 25;
      this.healthBarE.decrease(25);
      if (this.enemyHP <= 0) {
        this.scene.start("Victory");
      }
    } else {
      this.select.play();
      this.playerHP -= 25;
      this.healthBarP.decrease(25);

      if (this.playerHP <= 0) {
        this.scene.start("Defeat");
      }
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.questionText.destroy();
      this.displayQuestion();
    } else {
    }
  }
}

class Entretiens2 extends Phaser.Scene {
  constructor() {
    super({ key: "Entretiens2" });
  }
  preload() {
    this.load.image("barbershop", "wendy/image/barberShop.png");
    this.load.image("barber", "wendy/image/barber.png");
    this.load.image("dialogueBox", "wendy/image/metalPanel.png");
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
    this.load.audio("hurt", "wendy/image/hurt.mp3");
  }

  create() {
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    this.hurt = this.sound.add("hurt");
    const barber = this.add
      .image(0, 0, "barbershop")
      .setOrigin(0)
      .setScrollFactor(0);
    barber.displayWidth = 1000;
    barber.displayHeight = 300;
    this.dialogueBox = this.add.image(310, 100, "dialogueBox");
    this.dialogueBox.setDisplaySize(550, 150);
    this.barber = this.add.image(750, 100, "barber");
    this.barber.setDisplaySize(250, 200);
    this.healthBarE = new HealthBar(this, 125, 50, 200, 15);
    this.add.text(360, 50, "Recruteur", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });

    this.dialogueBoxP = this.add.image(760, 220, "dialogueBox");
    this.dialogueBoxP.setDisplaySize(310, 90);
    this.healthBarP = new HealthBar(this, 650, 190, 200, 15);
    this.add.text(670, 220, "Candidat", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });
    this.enemyHP = 100;
    this.playerHP = 100;

    this.dialogueBoxR = this.add.image(310, 250, "dialogueBox");
    this.dialogueBoxR.setDisplaySize(450, 90);

    this.questions = [
      {
        question: "Comment interagissez-vous \navec les clients ?",
        options: [
          "Je lâche tout et je les \nsalue chaleureusement",
          "Je lance un regard froid\nparce que je suis occupé",
          "Je les accueille mais\nje reste sur mon travail",
          " Je les ignore",
        ],
        correctAnswer: 2,
      },
      {
        question: "Quelle est votre attitude face\nà l'apprentissage continu ?",
        options: [
          " je suis déjà un expert",
          "J'aime apprendre de\nnouvelles techniques",
          "Je préfère rester dans\nma zone de confort",
          "Je suis trop occupé\npour me former",
        ],
        correctAnswer: 1,
      },
      {
        question: "Quelle est votre approche pour\ntravailler en équipe ?",
        options: [
          "Je cherche à contribuer\naux tâches d'équipe",
          "Je préfère travailler\nseul",
          "Je critique souvent\nmes collègues",
          "Je laisse mes collègues\nfaire le travail",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Comment abordez-vous les situations \noù un client n'est pas satisfait?",
        options: [
          "Je me sens mal à l'aise.",
          "Je demande au client \nde partir",
          "Je refuse de faire\ndes modifications",
          "Je propose d'améliorer \nla coupe",
        ],
        correctAnswer: 3,
      },
      {
        question: "Comment réagissez-vous face à un client \nqui est stressé ?",
        options: [
          "Je lui dis de se calmer",
          "Je l'ignore et \nje continue mon travail ",
          "Je fais de mon mieux\npourle mettre à l'aise.",
          " Je lui demande de\nquitter le salon",
        ],
        correctAnswer: 2,
      },
      {
        question: "Quelle est votre attitude \nface aux critiques ?",
        options: [
          "Je prends les critiques\npersonnellement",
          "Je les rejette",
          "Je les considère comme\ndes opportunités",
          "Je réponds pour \nme défendre.",
        ],
        correctAnswer: 3,
      },
      {
        question: "Citez-moi une qualité ?",
        options: [
          "Je suis organisé\net méticuleux",
          "Je fais juste de mon \nmieux dans ce que je fais",
          "Je sais travailler\nen équipe",
          "Je suis extrêmement \ncréatif",
        ],
        correctAnswer: 0,
      },
    ];
    this.currentQuestionIndex = 0;
    this.displayQuestion();
  }

  displayQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionText = this.add.text(110, 90, currentQuestion.question, {
      fontFamily: "Kode Mono",
      fontSize: 20,
      color: "black",
    });

    const optionsTexts = [];

    currentQuestion.options.forEach((option, index) => {
      let x, y;
      if (index < 2) {
        x = 130 + index * 200;
        y = 225;
      } else {
        x = 130 + (index - 2) * 200;
        y = 260;
      }
      const optionText = this.add
        .text(x, y, option, {
          fontFamily: "Kode Mono",
          fontSize: 14,
          color: "black",
        })
        .setInteractive();
      optionText.on("pointerover", () => {
        this.select.play();
        optionText.setColor("red");
      });
      optionText.on("pointerout", () => {
        optionText.setColor("black");
      });

      optionText.on("pointerdown", () => {
        this.press.play();
        this.checkAnswer(index);
        optionsTexts.forEach((text) => text.destroy());
      });
      optionsTexts.push(optionText);
    });
  }
  checkAnswer(selectedIndex) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
      this.hurt.play();
      this.enemyHP -= 25;
      this.healthBarE.decrease(25);
      if (this.enemyHP <= 0) {
        this.scene.start("Victory");
      }
    } else {
      this.hurt.play();
      this.playerHP -= 25;
      this.healthBarP.decrease(25);

      if (this.playerHP <= 0) {
        this.scene.start("Defeat");
      }
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.questionText.destroy();
      this.displayQuestion();
    } else {
    }
  }
}

class Entretiens3 extends Phaser.Scene {
  constructor() {
    super({ key: "Entretiens3" });
  }
  preload() {
    this.load.image("theater", "wendy/image/theatre.png");
    this.load.image("director", "wendy/image/director.png");
    this.load.image("dialogueBox", "wendy/image/metalPanel.png");
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
    this.load.audio("hurt", "wendy/image/hurt.mp3");
  }

  create() {
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    this.hurt = this.sound.add("hurt");
    const theater = this.add
      .image(0, 0, "theater")
      .setOrigin(0)
      .setScrollFactor(0);
    theater.displayWidth = 1000;
    theater.displayHeight = 300;
    this.dialogueBox = this.add.image(310, 100, "dialogueBox");
    this.dialogueBox.setDisplaySize(550, 150);
    this.director = this.add.image(750, 100, "director");
    this.director.setDisplaySize(250, 200);
    this.healthBarE = new HealthBar(this, 125, 50, 200, 15);
    this.add.text(360, 50, "Recruteur", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });

    this.dialogueBoxP = this.add.image(760, 220, "dialogueBox");
    this.dialogueBoxP.setDisplaySize(310, 90);
    this.healthBarP = new HealthBar(this, 650, 190, 200, 15);
    this.add.text(670, 220, "Candidat", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });
    this.enemyHP = 100;
    this.playerHP = 100;

    this.dialogueBoxR = this.add.image(310, 250, "dialogueBox");
    this.dialogueBoxR.setDisplaySize(450, 90);

    this.questions = [
      {
        question:
          "Quelle est votre principale motivation\npour postuler à cette alternance ?",
        options: [
          " Gagner de l'expérience \nprofessionnelle.",
          "Obtenir un salaire.",
          "Acquérir des compétences\n dans le domaine.",
          "Faire plaisir à\nmes parents.",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Comment gérez-vous les situations\nde service clientèle délicates",
        options: [
          "En ignorant les clients\nmécontents",
          "En écoutant et en\ncherchant des solutions ",
          "En donnant toujours\nraison au client",
          " Je les ignore",
        ],
        correctAnswer: 1,
      },
      {
        question: "Quel est l'importance \nde la ponctualité ?",
        options: [
          "Pas très importante,\nsi le travail est fait",
          "Très importante!Aucune\nexpections est tolérable",
          "Elle est importante QUE\npour les temps plein",
          "C'est important pour\nle bon fonctionnement",
        ],
        correctAnswer: 3,
      },
      {
        question:
          "Quelles sont les tâches pour votre\nalternance en gestions d'entreprise?",
        options: [
          " Vente de billets et\nalimentaire,nettoyage des salles",
          "Projection des films",
          "Planification des horaires\ngestion des stocks",
          " Gestion des réseaux \nsociaux et événement",
        ],
        correctAnswer: 2,
      },
      {
        question: "Comment gérez-vous les périodes\nde forte affluence ?",
        options: [
          "En prenant des pauses\npour éviter le stress",
          "En demandant de l'aide et\nfaire les tâches urgente",
          "Réduire la charge de\ntravail",
          "En se cachant dans \nles coulisses",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Quelle est votre approche pour atteindre\nvos objectifs professionnels ?",
        options: [
          "En attendant que les\nopportunités arrivent",
          "En comptant sur la\nchance pour réussir.",
          "En établissant des\nobjectifs clairs",
          "En travaillant de\nmanière proactive",
        ],
        correctAnswer: 3,
      },
      {
        question: "Quel est votre principal \ndéfaut selon vous ?",
        options: [
          "Je suis facilement\ndistrait",
          "Je suis perfectionniste",
          "Je suis trop compétitif",
          "Je suis très impatient",
        ],
        correctAnswer: 2,
      },
    ];
    this.currentQuestionIndex = 0;
    this.displayQuestion();
  }

  displayQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionText = this.add.text(110, 90, currentQuestion.question, {
      fontFamily: "Kode Mono",
      fontSize: 20,
      color: "black",
    });

    const optionsTexts = [];

    currentQuestion.options.forEach((option, index) => {
      let x, y;
      if (index < 2) {
        x = 130 + index * 200;
        y = 225;
      } else {
        x = 130 + (index - 2) * 200;
        y = 260;
      }
      const optionText = this.add
        .text(x, y, option, {
          fontFamily: "Kode Mono",
          fontSize: 14,
          color: "black",
        })
        .setInteractive();
      optionText.on("pointerover", () => {
        this.select.play();
        optionText.setColor("red");
      });
      optionText.on("pointerout", () => {
        optionText.setColor("black");
      });

      optionText.on("pointerdown", () => {
        this.press.play();
        this.checkAnswer(index);
        optionsTexts.forEach((text) => text.destroy());
      });
      optionsTexts.push(optionText);
    });
  }
  checkAnswer(selectedIndex) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
      this.hurt.play();
      this.enemyHP -= 25;
      this.healthBarE.decrease(25);
      if (this.enemyHP <= 0) {
        this.scene.start("Victory");
      }
    } else {
      this.hurt.play();
      this.playerHP -= 25;
      this.healthBarP.decrease(25);

      if (this.playerHP <= 0) {
        this.scene.start("Defeat");
      }
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.questionText.destroy();
      this.displayQuestion();
    } else {
    }
  }
}

class Entretiens4 extends Phaser.Scene {
  constructor() {
    super({ key: "Entretiens4" });
  }
  preload() {
    this.load.image("fishshop", "wendy/image/fishShop.png");
    this.load.image("fisher", "wendy/image/fisher.png");
    this.load.image("dialogueBox", "wendy/image/metalPanel.png");
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
    this.load.audio("hurt", "wendy/image/hurt.mp3");
  }

  create() {
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    this.hurt = this.sound.add("hurt");
    const fishshop = this.add
      .image(0, 0, "fishshop")
      .setOrigin(0)
      .setScrollFactor(0);
    fishshop.displayWidth = 1000;
    fishshop.displayHeight = 300;
    this.dialogueBox = this.add.image(310, 100, "dialogueBox");
    this.dialogueBox.setDisplaySize(550, 150);
    this.fisher = this.add.image(750, 100, "fisher");
    this.fisher.setDisplaySize(250, 200);
    this.healthBarE = new HealthBar(this, 125, 50, 200, 15);
    this.add.text(360, 50, "Recruteur", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });

    this.dialogueBoxP = this.add.image(760, 220, "dialogueBox");
    this.dialogueBoxP.setDisplaySize(310, 90);
    this.healthBarP = new HealthBar(this, 650, 190, 200, 15);
    this.add.text(670, 220, "Candidat", {
      fontFamily: "Kode Mono",
      fontSize: 25,
      color: "black",
    });
    this.enemyHP = 100;
    this.playerHP = 100;

    this.dialogueBoxR = this.add.image(310, 250, "dialogueBox");
    this.dialogueBoxR.setDisplaySize(450, 90);

    this.questions = [
      {
        question: "Quelle est votre principale\nqualité professionnelle ?",
        options: [
          "Ma capacité à \ntravailler rapidement",
          "Ma fiabilité et mon \nengagement",
          "Ma capacité à éviter\nles conflits",
          "Ma capacité à \nconvaincre les autres",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Comment décririez-vous votre capacité\nà gérer plusieurs tâches simultanément?",
        options: [
          "Je suis facilement \ndépassé",
          "Je préfère me concentrer\nsur une seule tâche",
          " Je suis capable de \nprioriser efficacement",
          "Je demande toujours de \nl'aide à mes collègues",
        ],
        correctAnswer: 2,
      },
      {
        question: "Quelle est votre approche \npour travailler en équipe ?",
        options: [
          "Prendre le contrôle de\nchaque projet.",
          "En écoutant activement\nles idées des autres",
          "En évitant les  \nmembres de l'équipe.",
          "En critiquant les \ncontributions des autres",
        ],
        correctAnswer: 0,
      },
      {
        question: "Quelle est la meilleure pratique pour\néviter la surpêche ?",
        options: [
          "Augmenter le nombre de \nbateaux de pêche",
          "Limiter les périodes \nde pêche",
          "Utiliser des techniques \nde pêche destructrices",
          "Ignorer les quotas de \npêche",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Comment réagissez-vous face à \nl'incertitude dans votre travail ",
        options: [
          "Je deviens rapidement\nanxieux et démotivé",
          "Je reste calme et\nj'essaie des solutions",
          "Je fais semblant que \ntout va bien",
          "Je cherche un autre \npour résoudre le problème ",
        ],
        correctAnswer: 1,
      },
      {
        question: "Qu'est-ce que la pêche artisanale ?",
        options: [
          "Une pêche pratiquée par\ndes amateurs",
          "Une pêche industrielle",
          "Je les considère comme\ndes opportunités",
          "Une pêche traditionnel\n dans de petites embarcations",
        ],
        correctAnswer: 3,
      },
      {
        question: "Citez-moi une qualité ?",
        options: [
          "Je suis attentif aux  \ndétails et précis",
          "Je suis empathique",
          "Je suis persévérant",
          "Je suis extrêmement  \ncréatif",
        ],
        correctAnswer: 0,
      },
    ];
    this.currentQuestionIndex = 0;
    this.displayQuestion();
  }

  displayQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionText = this.add.text(110, 90, currentQuestion.question, {
      fontFamily: "Kode Mono",
      fontSize: 20,
      color: "black",
    });

    const optionsTexts = [];

    currentQuestion.options.forEach((option, index) => {
      let x, y;
      if (index < 2) {
        x = 130 + index * 200;
        y = 225;
      } else {
        x = 130 + (index - 2) * 200;
        y = 260;
      }
      const optionText = this.add
        .text(x, y, option, {
          fontFamily: "Kode Mono",
          fontSize: 14,
          color: "black",
        })
        .setInteractive();
      optionText.on("pointerover", () => {
        this.select.play();
        optionText.setColor("red");
      });
      optionText.on("pointerout", () => {
        optionText.setColor("black");
      });

      optionText.on("pointerdown", () => {
        this.press.play();
        this.checkAnswer(index);
        optionsTexts.forEach((text) => text.destroy());
      });
      optionsTexts.push(optionText);
    });
  }
  checkAnswer(selectedIndex) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
      this.hurt.play();
      this.enemyHP -= 25;
      this.healthBarE.decrease(25);
      if (this.enemyHP <= 0) {
        this.scene.start("Victory");
      }
    } else {
      this.hurt.play();
      this.playerHP -= 25;
      this.healthBarP.decrease(25);

      if (this.playerHP <= 0) {
        this.scene.start("Defeat");
      }
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.questionText.destroy();
      this.displayQuestion();
    } else {
    }
  }
}
class Victory extends Phaser.Scene {
  constructor() {
    super({ key: "Victory" });
  }

  preload() {
    this.load.image("bgvictoire", "wendy/image/bgVictoire.png");
    this.load.image("boutonR", "wendy/image/recommencer.png");
    this.load.image("boutonRhover", "wendy/image/recommencerHover.png");
    this.load.image("quit", "wendy/image/quit.png");
    this.load.image("quitOver", "wendy/image/quitOver.png");
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
  }

  create() {
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    const victoire = this.add
      .image(0, 0, "bgvictoire")
      .setOrigin(0)
      .setScrollFactor(0);
    victoire.displayWidth = 1000;
    victoire.displayHeight = 300;
    this.add.text(125, 50, "Contrat décroché !", {
      fontFamily: "Kode Mono",
      fontSize: 40,
      color: "black",
    });
    this.buttonR = this.add.image(200, 200, "boutonR").setInteractive();
    this.quit = this.add.image(650, 200, "quit").setInteractive();
    this.buttonR.on("pointerover", () => {
      this.select.play();
      this.buttonR.setTexture("boutonRhover");
    });

    this.buttonR.on("pointerout", () => {
      this.buttonR.setTexture("boutonR");
    });

    this.buttonR.on("pointerdown", () => {
      this.press.play();
      this.scene.start("Map");
    });

    this.quit.on("pointerover", () => {
      this.select.play();
      this.quit.setTexture("quitOver");
    });

    this.quit.on("pointerout", () => {
      this.quit.setTexture("quit");
    });

    this.quit.on("pointerdown", () => {
      this.press.play();
      window.location.reload();
    });
  }
}

class Defeat extends Phaser.Scene {
  constructor() {
    super({ key: "Defeat" });
  }

  preload() {
    this.load.image("bgdefeat", "wendy/image/bgdefaite.png");
    this.load.image("boutonRR", "wendy/image/boutonR.png");
    this.load.image("boutonRRhover", "wendy/image/BoutonRhover.png");
    this.load.image("quitR", "wendy/image/quitR.png");
    this.load.image("quitRover", "wendy/image/QuitRover.png");
    this.load.audio("select", "wendy/image/select.mp3");
    this.load.audio("press", "wendy/image/press.mp3");
  }

  create() {
    this.select = this.sound.add("select");
    this.press = this.sound.add("press");
    const victoire = this.add
      .image(0, 0, "bgdefeat")
      .setOrigin(0)
      .setScrollFactor(0);
    victoire.displayWidth = 1000;
    victoire.displayHeight = 300;
    this.add.text(500, 50, "Contrat non décroché !", {
      fontFamily: "Kode Mono",
      fontSize: 40,
      color: "black",
    });
    this.buttonR = this.add.image(400, 200, "boutonRR").setInteractive();
    this.quitR = this.add.image(750, 200, "quitR").setInteractive();

    this.buttonR.on("pointerover", () => {
      this.select.play();
      this.buttonR.setTexture("boutonRRhover");
    });

    this.buttonR.on("pointerout", () => {
      this.buttonR.setTexture("boutonRR");
    });

    this.buttonR.on("pointerdown", () => {
      this.press.play();
      this.scene.start("Map");
    });

    this.quitR.on("pointerover", () => {
      this.select.play();
      this.quitR.setTexture("quitRover");
    });

    this.quitR.on("pointerout", () => {
      this.quitR.setTexture("quitR");
    });

    this.quitR.on("pointerdown", () => {
      this.press.play();
      window.location.reload();
    });
  }
}

const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
  scene: [
    Title,
    CharacterSelection,
    Map,
    Entretiens,
    Entretiens2,
    Entretiens3,
    Entretiens4,
    Victory,
    Defeat,
  ],
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1000,
    height: 300,
  },
};
var game = new Phaser.Game(config);
