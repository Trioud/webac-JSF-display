let platforms;
let stage1;
let stage2;
let stage3;
let stage4;
let cursors;
let scoreText;
let gameOver = false;
let spaceIsPressed = false;
let dialogBox;
let player1;
let player2;
let player3;
let player4;
let player5;
let pnj1;
let pnj2;
let pnj3;
let pnj4;
let pnj5;

import { Player, PNJ } from "./character.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super({ key: "Main" });
    this.pnj1 = null;
    this.pnj2 = null;
    this.pnj3 = null;
    this.pnj4 = null;
    this.pnj5 = null;
    this.spaceIsPressed = false;
  }
  preload() {
    this.load.image("sky1", "nathan/assets/ville.jpg");
    this.load.image("ground1", "nathan/assets/platform.png");
    this.load.image("ground2", "nathan/assets/platform2.png");
    this.load.image("stage1", "nathan/assets/bat1.png");
    this.load.image("stage2", "nathan/assets/bat2.png");
    this.load.image("stage3", "nathan/assets/bat3.png");
    this.load.image("stage4", "nathan/assets/bat4.png");

    this.load.spritesheet("nathan", "nathan/assets/nathan.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("roro", "nathan/assets/roro.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("tanguyche", "nathan/assets/tanguyche.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("dydou", "nathan/assets/dydou.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("abou", "nathan/assets/abou.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("said", "nathan/assets/said.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Coline", "nathan/assets/rh1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("Jean-Philipe", "nathan/assets/rh2.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("vins", "nathan/assets/vins.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("enzo", "nathan/assets/enzo.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  init() {
    this.selectedIndex = localStorage.getItem("selectedCharacter");
    console.log("Selected Character Index:", this.selectedIndex);
  }
  create() {
    let bg = this.add.image(770, 350, "sky1");
    bg.setScale(
      Math.max(window.innerWidth / bg.width, window.innerHeight / bg.height)
    );
    this.showQuestBubble(
      "Quête du jeu: Trouver une l'alternance parfaite !\n\n1. Aller a epitech pour vous preparer au recherche d'alternance\n\n2. Aller a Sopra Steria pour passer un entretien\n\n3. Aller a Capgemini pour passer un entretien\n\n4. Aller voir le boss(votre APE)\n\n5. Aller voir le 2eme pnj au stage boss pour lui dire que vous avez trouver une alternance"
    );

    platforms = this.physics.add.staticGroup();
    stage1 = this.physics.add.staticGroup();
    stage2 = this.physics.add.staticGroup();
    stage3 = this.physics.add.staticGroup();
    stage4 = this.physics.add.staticGroup();

    this.addBubbleText(210, 480, "Epitech");
    this.addBubbleText(1150, 420, "Sopra Steria");
    this.addBubbleText(250, 180, "Capgemini");
    this.addBubbleText(1130, 125, "Boss");

    platforms.create(600, 715, "ground2").setScale(2).refreshBody();
    stage1.create(210, 565, "stage1").setScale(2).refreshBody();
    stage2.create(1000, 405, "stage2").setScale(2).refreshBody();
    stage3.create(250, 260, "stage3").setScale(2).refreshBody();
    stage4.create(1120, 205, "stage4").setScale(2).refreshBody();

    platforms.create(900, 500, "ground1");
    platforms.create(350, 350, "ground1");
    platforms.create(1030, 300, "ground1");

    const introductionPhrases1 = [
      "Salut, es-tu prêt à chercher une alternance ?",
      "Non ? Je m'en bats les couilles !",
      "Réponds à mes questions et tg !",
    ];

    const introductionPhrases2 = [
      "Bienvenue chez Sopra Steria.",
      "As-tu les compétences requises ?",
      "Montre-moi ton CV !",
    ];

    const introductionPhrases3 = [
      "Salut, je suis un Tech lead de Capgemini.",
      "Quel est ton objectif professionnel ?",
      "Montre-moi ce que tu sais faire !",
    ];

    const introductionPhrases4 = [
      "Bonjour, je suis le boss ici.",
      "Es-tu prêt à relever des défis petit con ?",
      "Montre-moi qui tu est?",
    ];

    const introductionPhrases5 = [
      "Salut, alors comment va tu?",
      "Ou en est tu dans ta recherche d'alternance ?",
    ];

    const questions1 = [
      {
        question: "As-tu fais ton CV ?",
        options: ["Oui", "Non"],
        correctAnswerIndex: 0,
      },
      {
        question: "As-tu fais ton profil Linkedin ?",
        options: ["Oui", "Non"],
        correctAnswerIndex: 0,
      },
      {
        question: "As-tu une tenu correct ?",
        options: ["Oui", "Non"],
        correctAnswerIndex: 0,
      },
      {
        question: "Es-tu prêt pour toutes les questions ?",
        options: ["Oui", "Non"],
        correctAnswerIndex: 0,
      },
    ];

    const questions2 = [
      {
        question:
          "Quelle est la fonction principale de JavaScript dans le développement web ?",
        options: [
          "Manipulation du DOM",
          "Styling",
          "Communication avec le serveur",
          "Animation",
        ],
        correctAnswerIndex: 0,
      },
      {
        question:
          "Quelle balise HTML est utilisée pour définir une section de code JavaScript dans un document HTML ?",
        options: ["<script>", "<javascript>", "<code>", "<js>"],
        correctAnswerIndex: 0,
      },
      {
        question:
          "Quel sélecteur CSS permet de cibler tous les éléments HTML d'une page ?",
        options: ["*", "all", "element", "html"],
        correctAnswerIndex: 0,
      },
      {
        question:
          "Quelle est la méthode JavaScript utilisée pour trier les éléments d'un tableau ?",
        options: ["sort()", "order()", "arrange()", "shuffle()"],
        correctAnswerIndex: 0,
      },
    ];

    const questions3 = [
      {
        question:
          "Quel est le résultat de l'opération suivante en JavaScript : 10 + '5' ?",
        options: ["105", "15", "Error", "105 (string)"],
        correctAnswerIndex: 3,
      },
      {
        question:
          "Quelle fonction PHP est utilisée pour inclure le contenu d'un fichier dans un autre fichier PHP ?",
        options: ["include()", "load()", "require()", "import()"],
        correctAnswerIndex: 0,
      },
      {
        question:
          "Quelle balise HTML est utilisée pour créer une liste numérotée ?",
        options: ["<ul>", "<list>", "<ol>", "<order>"],
        correctAnswerIndex: 2,
      },
      {
        question:
          "Quel type de balise HTML est utilisé pour créer un lien hypertexte ?",
        options: ["<href>", "<a>", "<link>", "<ref>"],
        correctAnswerIndex: 1,
      },
    ];

    const questions4 = [
      {
        question:
          "Quelle est la méthode en JavaScript utilisée pour renvoyer la longueur d'une chaîne de caractères ?",
        options: ["len()", "size()", "length()", "count()"],
        correctAnswerIndex: 2,
      },
      {
        question: "Quelle est la signification de l'acronyme CSS ?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswerIndex: 0,
      },
      {
        question:
          "Quelle fonction JavaScript est utilisée pour afficher une boîte de dialogue avec un message et un bouton 'OK' ?",
        options: ["alert()", "messageBox()", "popup()", "prompt()"],
        correctAnswerIndex: 0,
      },
      {
        question:
          "Quelle est la méthode JavaScript utilisée pour supprimer le dernier élément d'un tableau ?",
        options: ["remove()", "pop()", "delete()", "last()"],
        correctAnswerIndex: 1,
      },
    ];

    const questions5 = [
      {
        question: "Tu as trouvé ton alternance ?",
        options: ["Oui", "Non"],
        correctAnswerIndex: 0,
      },
      {
        question: "Et tu as même mis une fesser à Vins ?",
        options: ["Oui", "Non"],
        correctAnswerIndex: 0,
      },
    ];

    const endPhrases1 = [
      "Bien joué doudou !\nBonne chance dans ta recherche d'alternance !",
    ];

    const endPhrases2 = [
      "Mission Completed \nMerci d'avoir visité Sopra Steria !\nJe vous propose une alternance j`attends votre réponse",
    ];

    const endPhrases3 = [
      "Mission Completed \nMerci d'avoir visité Capgemini !\nJe vous propose une alternance j`attends votre réponse",
    ];

    const endPhrases4 = [
      "Bravo, tu as prouvé ta valeur !\nVa signer ton contrat auprès du directeur !",
    ];

    const endPhrases5 = [
      "Félicitations !\nTu as obtenu ton contrat d'alternance !",
    ];

    this.pnj1 = new PNJ(
      this,
      310,
      400,
      "said",
      null,
      questions1,
      introductionPhrases1,
      endPhrases1
    );

    this.pnj2 = new PNJ(
      this,
      950,
      300,
      "Coline",
      null,
      questions2,
      introductionPhrases2,
      endPhrases2
    );

    this.pnj3 = new PNJ(
      this,
      330,
      160,
      "Jean-Philipe",
      null,
      questions3,
      introductionPhrases3,
      endPhrases3
    );

    this.pnj4 = new PNJ(
      this,
      1000,
      150,
      "vins",
      null,
      questions4,
      introductionPhrases4,
      endPhrases4
    );

    this.pnj5 = new PNJ(
      this,
      1100,
      150,
      "enzo",
      null,
      questions5,
      introductionPhrases5,
      endPhrases5
    );

    this.physics.add.collider(this.pnj1, platforms);
    this.physics.add.collider(this.pnj2, platforms);
    this.physics.add.collider(this.pnj3, platforms);
    this.physics.add.collider(this.pnj4, platforms);
    this.physics.add.collider(this.pnj5, platforms);

    switch (this.selectedIndex) {
      case "0":
        this.player1 = new Player(this, 750, 550, "nathan", 100, 20, 30);
        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("nathan", {
            start: 3,
            end: 5,
          }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "turn",
          frames: [{ key: "nathan", frame: 4 }],
          frameRate: 20,
        });
        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("nathan", {
            start: 6,
            end: 8,
          }), // Frames pour le mouvement vers la droite de Nathan
          frameRate: 10,
          repeat: -1,
        });
        this.physics.add.collider(this.player1, platforms);
        break;
      case "1":
        this.player2 = new Player(this, 750, 550, "dydou", 90, 25, 35);
        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("dydou", {
            start: 3,
            end: 5,
          }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "turn",
          frames: [{ key: "dydou", frame: 4 }],
          frameRate: 20,
        });
        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("dydou", {
            start: 6,
            end: 8,
          }), // Frames pour le mouvement vers la droite de Nathan
          frameRate: 10,
          repeat: -1,
        });
        this.physics.add.collider(this.player2, platforms);
        break;
      case "2":
        this.player3 = new Player(this, 750, 550, "roro", 80, 28, 28);
        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("roro", { start: 3, end: 5 }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "turn",
          frames: [{ key: "roro", frame: 4 }],
          frameRate: 20,
        });
        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("roro", { start: 6, end: 8 }), // Frames pour le mouvement vers la droite de Nathan
          frameRate: 10,
          repeat: -1,
        });
        this.physics.add.collider(this.player3, platforms);
        break;
      case "3":
        this.player4 = new Player(this, 750, 550, "tanguyche", 70, 22, 33);
        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("tanguyche", {
            start: 3,
            end: 5,
          }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "turn",
          frames: [{ key: "tanguyche", frame: 4 }],
          frameRate: 20,
        });
        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("tanguyche", {
            start: 6,
            end: 8,
          }), // Frames pour le mouvement vers la droite de Nathan
          frameRate: 10,
          repeat: -1,
        });
        this.physics.add.collider(this.player4, platforms);
        break;
      case "4":
        this.player5 = new Player(this, 750, 550, "abou", 90, 30, 25);
        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("abou", { start: 3, end: 5 }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "turn",
          frames: [{ key: "abou", frame: 4 }],
          frameRate: 20,
        });
        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("abou", { start: 6, end: 8 }), // Frames pour le mouvement vers la droite de Nathan
          frameRate: 10,
          repeat: -1,
        });
        this.physics.add.collider(this.player5, platforms);
        break;
      default:
        this.player1 = this.physics.add.sprite(750, 550, "nathan");
        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("nathan", {
            start: 3,
            end: 5,
          }),
          frameRate: 10,
          repeat: -1,
        });
        this.anims.create({
          key: "turn",
          frames: [{ key: "nathan", frame: 4 }],
          frameRate: 20,
        });
        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("nathan", {
            start: 6,
            end: 8,
          }), // Frames pour le mouvement vers la droite de Nathan
          frameRate: 10,
          repeat: -1,
        });
        this.physics.add.collider(this.player1, platforms);
    }

    cursors = this.input.keyboard.createCursorKeys();
    cursors.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    cursors.enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  addBubbleText(x, y, text) {
    const bubble = this.add.graphics();
    bubble.fillStyle(0xffffff, 1);

    const bubbleWidth = text.length * 20;
    bubble.fillRoundedRect(x - bubbleWidth / 2, y - 50, bubbleWidth, 50, 15);

    const style = { fontSize: "16px", fill: "#000" };

    const bubbleText = this.add.text(x, y - 30, text, style).setOrigin(0.5);

    bubbleText.depth = 1;
  }

  checkForPNJInteraction(currentPlayer) {
    for (let i = 1; i <= 5; i++) {
      let currentPNJ = this[`pnj${i}`];

      if (
        currentPlayer.x < currentPNJ.x + currentPNJ.width / 2 &&
        currentPlayer.x > currentPNJ.x - currentPNJ.width / 2 &&
        currentPlayer.y < currentPNJ.y + currentPNJ.height / 2 &&
        currentPlayer.y > currentPNJ.y - currentPNJ.height / 2
      ) {
        // this.showQuestions(currentPNJ.questions);
        this.scene.start("BattleScene", {
          player: currentPlayer,
          collidedPNJ: currentPNJ,
        });

        break;
      }
    }
  }

  showQuestBubble() {
    const questText = this.add
      .text(1000, 600, "Quest", { fontSize: "24px", fill: "#ffffff" })
      .setInteractive({ cursor: "pointer" });

    questText.on("pointerover", () => {
      questText.setFill("#ffff00");
    });

    questText.on("pointerout", () => {
      questText.setFill("#ffffff");
    });

    const questBubble = this.add.graphics();
    questBubble.fillStyle(0x000000, 0.7);

    const x = 450;
    const y = 50;

    questBubble.fillRoundedRect(x, y, 500, 250, 15);
    questBubble.setVisible(false);

    const style = {
      fontSize: "16px",
      fill: "#ffffff",
      wordWrap: { width: 500 },
    };
    const questDescription =
      "Quête du jeu: Trouver une alternance parfaite !\n\n1. Aller à Epitech pour vous préparer à la recherche d'alternance\n\n2. Aller à Sopra Steria pour passer un entretien\n\n3. Aller à Capgemini pour passer un entretien\n\n4. Aller voir le boss (votre APE)\n\n5. Aller voir le 2ème PNJ au stage boss pour lui dire que vous avez trouvé une alternance";
    const questBubbleText = this.add.text(
      x + 10,
      y + 10,
      questDescription,
      style
    );
    questBubbleText.setVisible(false);

    questText.on("pointerover", () => {
      questBubble.setVisible(true);
      questBubbleText.setVisible(true);
    });

    questText.on("pointerout", () => {
      questBubble.setVisible(false);
      questBubbleText.setVisible(false);
    });
  }

  update() {
    if (gameOver) {
      return;
    }

    let currentPlayer;

    switch (this.selectedIndex) {
      case "0":
        currentPlayer = this.player1;
        break;
      case "1":
        currentPlayer = this.player2;
        break;
      case "2":
        currentPlayer = this.player3;
        break;
      case "3":
        currentPlayer = this.player4;
        break;
      case "4":
        currentPlayer = this.player5;
        break;
      default:
        currentPlayer = this.player1;
    }

    if (cursors.left.isDown) {
      currentPlayer.setVelocityX(-160);
      currentPlayer.anims.play("left", true);
    } else if (cursors.right.isDown) {
      currentPlayer.setVelocityX(160);
      currentPlayer.anims.play("right", true);
    } else {
      currentPlayer.setVelocityX(0);
      currentPlayer.anims.play("turn");
    }

    if (cursors.up.isDown && currentPlayer.body.touching.down) {
      currentPlayer.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.checkForPNJInteraction(currentPlayer);
    }
  }

  startGame(player) {
    // Désactivez les autres personnages
    if (this.player1) this.player1.disableBody(true, true);
    if (this.player2) this.player2.disableBody(true, true);
    if (this.player3) this.player3.disableBody(true, true);
    if (this.player4) this.player4.disableBody(true, true);
    if (this.player5) this.player5.disableBody(true, true);

    // Activez seulement le personnage sélectionné
    player.enableBody(true, player.x, player.y, true, true);

    console.log("Game started with player:", player);
  }
}
